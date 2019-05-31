import { LitElement, html, css } from "lit-element";
import styles from "./styles";
import { parseEntity, getAttributeOrState } from "./utils";
import filterEntity from "./filterEntity";

//
// type: custom:banner
// heading: 🛋 Living room
// background: #999
// entities:
//   - entity: light.fibaro_system_fgd212_dimmer_2_level

function renderError(heading, error) {
  return html`
    <ha-card class="not-found">
      <h2 class="heading">
        ${heading}
      </h2>
      <div class="overlay-strip">
        <div class="error">${error}</div>
      </div>
    </ha-card>
  `;
}

const ICON_REGEXP = /^(mdi|hass):/;
function isIcon(value) {
  return typeof value === "string" && value.match(ICON_REGEXP);
}

class BannerCard extends LitElement {
  static get properties() {
    return {
      config: Object,
      gridSizes: Array,
      entities: Array,
      entityValues: Array,
      error: String,
      rowSize: Number,
      _hass: Object
    };
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.config = {};
    this.entities = [];
    this.error = null;
    this._hass = {};
  }

  setConfig(config) {
    if (!config.heading) {
      throw new Error("You need to define a heading");
    }

    this.entities = (config.entities || []).map(parseEntity);
    this.config = config;

    if (typeof config.row_size !== "undefined") {
      if (config.row_size < 1) {
        throw new Error("row_size must be at least 1");
      }
      this.rowSize = config.row_size;
    }
    this.rowSize = this.rowSize || 3;

    // calculate grid
    this.gridSizes = Array(this.rowSize)
      .fill(this.rowSize)
      .map((size, index) => Math.round(((index + 1) / size) * 100));
  }

  set hass(hass) {
    this._hass = hass;
    this.error = null;

    // Parse new state values for _entities_
    this.entityValues = this.entities
      .filter(conf => filterEntity(conf, hass.states))
      .map(conf => this.parseEntity(conf));
  }

  parseEntity(config) {
    const hass = this._hass;
    if (!hass.states.hasOwnProperty(config.entity)) {
      this.error = `Can't find entity ${config.entity}`;
      return config;
    }
    const state = hass.states[config.entity];
    const attributes = state.attributes;

    const data = {
      name: attributes.friendly_name,
      state: state.state,
      value: getAttributeOrState(state, config.attribute),
      unit: attributes.unit_of_measurement,
      attributes,
      domain: config.entity.split(".")[0]
    };

    // Will set .value to be the key from entities.*.map_value.{key} that matches the current `state`
    const dynamicData = {};
    if (config.map_state && state.state in config.map_state) {
      dynamicData.value = config.map_state[state.state];
    }

    return {
      ...data,
      ...config,
      ...dynamicData
    };
  }

  grid(index = 1) {
    if (index === "full" || index > this.rowSize) {
      index = this.rowSize;
    }

    const width = this.gridSizes[index - 1];
    return `flex: 0 0 ${width}%; width: ${width}%;`;
  }

  // Factory function to make it a little bit easier to create
  // click handlers for basic service calls
  _service(domain, action, entity_id) {
    return () => this._hass.callService(domain, action, { entity_id });
  }

  render() {
    if (this.error) {
      return renderError(this.config.heading, this.error);
    }

    const onClick = () => this.config.link && this.navigate(this.config.link);
    return html`
      <ha-card style="background: ${this.config.background};">
        <h2 class="heading" @click=${onClick}>
          ${this.config.heading}
        </h2>
        ${this.renderEntities()}
      </ha-card>
    `;
  }

  renderEntities() {
    if (this.entityValues.length === 0) {
      return null;
    }

    return html`
      <div class="overlay-strip">
        <div class="entities">
          ${this.entityValues.map(config => {
            const onClick = () => this.openEntityPopover(config.entity);
            const options = { ...config, onClick };

            // If an attribute is requested we assume not to render
            // any domain specifics
            if (!config.attribute) {
              switch (config.domain) {
                case "light":
                  return this.renderDomainLight(options);
                case "switch":
                  return this.renderDomainSwitch(options);
                case "cover":
                  return this.renderDomainCover(options);
                case "media_player":
                  return this.renderDomainMediaPlayer(options);
              }
            }
            return this.renderDomainDefault(options);
          })}
        </div>
      </div>
    `;
  }

  renderDomainDefault({ value, unit, name, size, onClick }) {
    let htmlContent;
    if (isIcon(value)) {
      htmlContent = html`
        <ha-icon icon="${value}"></ha-icon>
      `;
    } else {
      htmlContent = html`
        ${value} ${unit}
      `;
    }
    return html`
      <div class="entity-state" style="${this.grid(size)}" @click=${onClick}>
        <span class="entity-name">${name}</span>
        <span class="entity-value">${htmlContent}</span>
      </div>
    `;
  }

  renderDomainMediaPlayer({
    onClick,
    attributes: a,
    size,
    name,
    state,
    entity,
    domain
  }) {
    const isPlaying = state === "playing";

    const action = isPlaying ? "media_pause" : "media_play";

    const mediaTitle = [a.media_artist, a.media_title].join(" – ");
    return html`
      <div class="entity-state" style="${this.grid(size || "full")}">
        <span class="entity-name" @click=${onClick}>${name}</span>
        <div class="entity-value interactive">
          <div class="entity-state-left media-title">
            ${mediaTitle}
          </div>
          <div class="entity-state-right media-controls">
            <paper-icon-button
              icon="mdi:skip-previous"
              role="button"
              @click=${this._service(domain, "media_previous_track", entity)}
            ></paper-icon-button>
            <paper-icon-button
              icon="${isPlaying ? "mdi:stop" : "mdi:play"}"
              role="button"
              @click=${this._service(domain, action, entity)}
            ></paper-icon-button>
            <paper-icon-button
              icon="mdi:skip-next"
              role="button"
              @click=${this._service(domain, "media_next_track", entity)}
            ></paper-icon-button>
          </div>
        </div>
      </div>
    `;
  }

  renderDomainLight({ onClick, size, name, state, entity }) {
    return html`
      <div class="entity-state" style="${this.grid(size)}">
        <span class="entity-name" @click=${onClick}>${name}</span>
        <span class="entity-value">
          <paper-toggle-button
            class="toggle"
            ?checked=${state === "on"}
            @click=${this._service("light", "toggle", entity)}
          />
        </span>
      </div>
    `;
  }

  renderDomainSwitch({ onClick, size, name, state, entity }) {
    return html`
      <div class="entity-state" style="${this.grid(size)}">
        <span class="entity-name" @click=${onClick}>${name}</span>
        <span class="entity-value">
          <paper-toggle-button
            class="toggle"
            ?checked=${state === "on"}
            @click=${this._service("switch", "toggle", entity)}
          >
          </paper-toggle-button>
        </span>
      </div>
    `;
  }

  renderDomainCover({ onClick, size, name, state, entity }) {
    const isclosed = state === "closed";
    return html`
      <div class="entity-state" style="${this.grid(size)}">
        <span class="entity-name" @click=${onClick}>${name}</span>
        <span class="entity-value">
          <paper-icon-button
            ?disabled=${!isclosed}
            icon="hass:arrow-up"
            role="button"
            @click=${this._service("cover", "open_cover", entity)}
          ></paper-icon-button>
          <paper-icon-button
            icon="hass:stop"
            role="button"
            @click=${this._service("cover", "stop_cover", entity)}
          ></paper-icon-button>
          <paper-icon-button
            ?disabled=${isclosed}
            icon="hass:arrow-down"
            role="button"
            @click=${this._service("cover", "close_cover", entity)}
          ></paper-icon-button>
        </span>
      </div>
    `;
  }

  getCardSize() {
    return 3;
  }

  navigate(path) {
    history.pushState(null, "", path);
    this.fire("location-changed", { replace: true });
  }

  openEntityPopover(entityId) {
    this.fire("hass-more-info", { entityId });
  }

  fire(type, detail, options) {
    options = options || {};
    detail = detail === null || detail === undefined ? {} : detail;
    const e = new Event(type, {
      bubbles: options.bubbles === undefined ? true : options.bubbles,
      cancelable: Boolean(options.cancelable),
      composed: options.composed === undefined ? true : options.composed
    });
    e.detail = detail;
    this.dispatchEvent(e);
    return e;
  }
}

window.customElements.define("banner-card", BannerCard);

export default BannerCard;
