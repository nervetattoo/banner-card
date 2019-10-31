import { LitElement, html, css } from "lit-element";
import styles from "./styles";
import { parseEntity, getAttributeOrState, readableColor } from "./utils";
import filterEntity from "./filterEntity";

//
// type: custom:banner
// heading: 🛋 Living room
// background: #999
// entities:
//   - entity: light.fibaro_system_fgd212_dimmer_2_level

const ICON_REGEXP = /^(mdi|hass):/;
function isIcon(value) {
  return typeof value === "string" && value.match(ICON_REGEXP);
}

class BannerCard extends LitElement {
  static get properties() {
    return {
      config: Object,
      color: String,
      entities: Array,
      entityValues: Array,
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
    this._hass = {};
  }

  setConfig(config) {
    if (typeof config.heading === "undefined") {
      throw new Error("You need to define a heading");
    }

    this.entities = (config.entities || []).map(parseEntity);
    this.config = config;

    this.color =
      config.color ||
      readableColor(
        config.background,
        "var(--bc-heading-color-light)",
        "var(--bc-heading-color-dark)"
      );

    if (typeof config.row_size !== "undefined") {
      if (config.row_size < 1) {
        throw new Error("row_size must be at least 1");
      }
      this.rowSize = config.row_size;
    }
    this.rowSize = this.rowSize || 3;
  }

  set hass(hass) {
    this._hass = hass;

    // Parse new state values for _entities_
    this.entityValues = this.entities
      .filter(conf => filterEntity(conf, hass.states))
      .map(conf => this.parseEntity(conf));
  }

  parseEntity(config) {
    const hass = this._hass;
    if (!hass.states.hasOwnProperty(config.entity)) {
      return {
        ...config,
        error: `Entity not ready`
      };
    }
    const state = hass.states[config.entity];
    const attributes = state.attributes;

    const data = {
      name: attributes.friendly_name,
      state: state.state,
      position: attributes.current_position,
      value: getAttributeOrState(state, config.attribute),
      unit: attributes.unit_of_measurement,
      attributes,
      domain: config.entity.split(".")[0]
    };

    // Will either:
    // set .value to be the key from entities.*.map_value.{key} that matches the current `state` if the value is a string
    // or set all values as dynamicData if it is an object
    const dynamicData = {};
    if (config.map_state && state.state in config.map_state) {
      const mappedState = config.map_state[state.state];
      const mapStateType = typeof mappedState;
      if (mapStateType === "string") {
        dynamicData.value = mappedState;
      } else if (mapStateType === "object") {
        Object.entries(mappedState).forEach(([key, val]) => {
          dynamicData[key] = val;
        });
      }
    }

    return {
      ...data,
      ...config,
      ...dynamicData
    };
  }

  grid(index = 1) {
    if (index === "full" || index > this.rowSize) {
      return `grid-column: span ${this.rowSize};`;
    }
    return `grid-column: span ${index};`;
  }

  // Factory function to make it a little bit easier to create
  // click handlers for basic service calls
  _service(domain, action, entity_id) {
    return () => this._hass.callService(domain, action, { entity_id });
  }

  render() {
    return html`
      <ha-card style="background: ${this.config.background};">
        ${this.renderHeading()} ${this.renderEntities()}
      </ha-card>
    `;
  }

  renderHeading() {
    if (this.config.heading === false) {
      return null;
    }

    const onClick = () => this.config.link && this.navigate(this.config.link);
    return html`
      <h2 class="heading" @click=${onClick} style="color: ${this.color};">
        ${this.config.heading}
      </h2>
    `;
  }

  renderEntities() {
    if (this.entityValues.length === 0) {
      return null;
    }

    return html`
      <div class="overlay-strip">
        <div
          class="entities"
          style="grid-template-columns: repeat(${this.rowSize}, 1fr);"
        >
          ${this.entityValues.map(config => {
            if (config.error) {
              return html`
                <div class="entity-state" style="${this.grid(config.size)}">
                  <span class="entity-name">${config.error}</span>
                  <span class="entity-value error">${config.entity}</span>
                </div>
              `;
            }

            const onClick = () => this.openEntityPopover(config.entity);
            const options = { ...config, onClick };

            // Allow overriding rendering + action if custom is set to true
            if (config.action) {
              return this.renderCustom({
                ...options,
                action: () => {
                  const { service, ...serviceData } = config.action;
                  const [domain, action] = service.split(".");
                  this._hass.callService(domain, action, {
                    entity_id: config.entity,
                    ...serviceData
                  });
                }
              });
            }

            // If an attribute is requested we assume not to render
            // any domain specifics
            if (!config.attribute) {
              switch (config.domain) {
                case "light":
                case "switch":
                case "input_boolean":
                  return this.renderAsToggle(options);
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

  renderValue({ icon, value, image, action, click }, fallback) {
    if (icon || isIcon(value)) {
      return html`
        <ha-icon .icon="${icon || value}" @click=${click}></ha-icon>
      `;
    } else if (image === true) {
      return html`
        <state-badge
          style="background-image: url(${value});"
          @click=${click}
        ></state-badge>
      `;
    }

    return fallback();
  }

  renderDomainDefault({ value, unit, image, icon, name, size, onClick }) {
    const htmlContent = this.renderValue(
      { icon, image, value, click: onClick },
      () =>
        html`
          ${value} ${unit}
        `
    );
    return html`
      <div class="entity-state" style="${this.grid(size)}" @click=${onClick}>
        <span class="entity-name">${name}</span>
        <span class="entity-value">${htmlContent}</span>
      </div>
    `;
  }

  renderCustom({ value, unit, action, image, icon, name, size, onClick }) {
    const htmlContent = this.renderValue(
      { icon, image, value, click: action },
      () => html`
        <mwc-button ?dense=${true} @click=${action}>
          ${value} ${unit}
        </mwc-button>
      `
    );
    return html`
      <div class="entity-state" style="${this.grid(size)}">
        <span class="entity-name" @click=${onClick}>${name}</span>
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
        <div class="entity-value">
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

  renderAsToggle({ onClick, size, name, state, domain, entity }) {
    return html`
      <div class="entity-state" style="${this.grid(size)}">
        <span class="entity-name" @click=${onClick}>${name}</span>
        <span class="entity-value">
          <mwc-switch
            ?checked=${state === "on"}
            @click=${this._service(domain, "toggle", entity)}
          >
          </mwc-switch>
        </span>
      </div>
    `;
  }

  renderDomainCover({ onClick, size, name, state, entity }) {
    const isclosed = position === "50";
    return html`
      <div class="entity-state" style="${this.grid(size)}">
        <span class="entity-name" @click=${onClick}>${name}</span>
        <span class="entity-value">
          <paper-icon-button
            ?disabled=${"100"}
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
            ?disabled=${"0"}
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
