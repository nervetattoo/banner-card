import { LitElement, html, css, property } from "lit-element";
import styles from "./styles.css";
import { parseEntity, getAttributeOrState, readableColor } from "./utils";
import filterEntity from "./filterEntity";

import { CardConfig } from "./config/card";
import fireEvent from "./fireEvent";

type LooseObject = Record<string, any>;

const ICON_REGEXP = /^(mdi|hass):/;
function isIcon(value) {
  return typeof value === "string" && value.match(ICON_REGEXP);
}

function createElement(tag, config, hass) {
  const element = document.createElement(tag);

  if (element.setConfig) {
    element.setConfig(config);
  }

  element.hass = hass;

  return element;
}

function entityName(name, onClick = null) {
  if (onClick) {
    return html` <a class="entity-name" @click=${onClick}>${name}</a> `;
  }
  return html` <span class="entity-name">${name}</span> `;
}

export default class BannerCard extends LitElement {
  @property()
  config: CardConfig;
  @property()
  color: string;
  @property()
  entities: Array<any>;
  @property()
  entityValues: Array<any>;

  @property()
  rowSize: number;

  _hass: any;

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

    const rowSizeType = typeof config.row_size;
    if (rowSizeType !== "undefined") {
      if (config.row_size < 1) {
        throw new Error("row_size must be at least 1");
      }
      if (config.row_size === "auto") {
        this.rowSize = this.entities.length;
      } else {
        this.rowSize = config.row_size;
      }
    }
    this.rowSize = this.rowSize || 3;
  }

  set hass(hass) {
    this._hass = hass;

    // Parse new state values for _entities_
    this.entityValues = (this.entities || [])
      .filter((conf) => filterEntity(conf, hass.states))
      .map((conf) => this.parseEntity(conf));
  }

  parseEntity(config) {
    const hass = this._hass;
    const state = hass.states[config.entity];
    const attributes = state ? state.attributes : {};

    // Will either:
    // set .value to be the key from entities.*.map_value.{key} that matches the current `state` if the value is a string
    // or set all values as dynamicData if it is an object
    const dynamicData: LooseObject = {};
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

    if (config.attribute) {
      const attributeValue = attributes[config.attribute];

      if (config.map_attribute && attributeValue in config.map_attribute) {
        const mappedAttribute = config.map_attribute[attributeValue];
        const mapAttributeType = typeof mappedAttribute;
        if (mapAttributeType === "string") {
          dynamicData.value = mappedAttribute;
        } else if (mapAttributeType === "object") {
          Object.entries(mappedAttribute).forEach(([key, val]) => {
            dynamicData[key] = val;
          });
        }
      }
    }

    const data = {
      name: attributes.friendly_name,
      state: state ? state.state : "",
      value: getAttributeOrState(state || {}, config.attribute),
      unit: attributes.unit_of_measurement,
      attributes,
      domain: config.entity ? config.entity.split(".")[0] : undefined,
    };

    if (attributes.hasOwnProperty("current_position")) {
      data.state = attributes.current_position;
    }

    return {
      ...data,
      ...config,
      ...dynamicData,
    };
  }

  grid(index: string | number = 1) {
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
    let heading = this.config.heading;
    if (heading === false) {
      return null;
    }

    if (!Array.isArray(heading)) {
      heading = [heading];
    }

    const onClick = () => this.config.link && this.navigate(this.config.link);
    return html`
      <h2 class="heading" @click=${onClick} style="color: ${this.color};">
        ${heading.map((fragment) => {
          if (isIcon(fragment)) {
            return html`
              <ha-icon class="heading-icon" .icon="${fragment}"></ha-icon>
            `;
          }
          return html` <span>${fragment}</span> `;
        })}
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
          ${this.entityValues.map((config) => {
            if (config.error) {
              return html`
                <div class="entity-state" style="${this.grid(config.size)}">
                  ${entityName(config.error)}
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
                    ...serviceData,
                  });
                },
              });
            }

            // If an attribute is requested we assume not to render
            // any domain specifics
            if (!config.attribute) {
              if (config.type && config.type.startsWith("custom:")) {
                const tag = config.type.split(":")[1];
                let customStyle = "";

                // make the calendar custom component look prettier
                if (tag === "calendar-card") {
                  customStyle = "small-text";
                }

                return this.renderCustomElement(tag, options, customStyle);
              }

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

  renderValue(data, fallback) {
    const { icon, value, image, action, click, color } = data;
    if (icon || isIcon(value)) {
      const style = color ? `color: ${color}` : "";
      return html`
        <ha-icon
          .icon="${icon || value}"
          style="${style}"
          @click=${click}
        ></ha-icon>
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

  renderDomainDefault({ value, unit, name, size, onClick, ...data }) {
    const htmlContent = this.renderValue(
      { ...data, value, click: onClick },
      () => html` ${value} ${unit} `
    );
    return html`
      <a class="entity-state" style="${this.grid(size)}" @click=${onClick}>
        ${entityName(name, onClick)}
        <span class="entity-value">${htmlContent}</span>
      </a>
    `;
  }

  renderCustom({ value, unit, action, name, size, onClick, ...data }) {
    const htmlContent = this.renderValue(
      { ...data, value, unit, click: action },
      () => html`
        <mwc-button ?dense=${true} @click=${action}>
          ${value} ${unit}
        </mwc-button>
      `
    );
    return html`
      <div class="entity-state" style="${this.grid(size)}">
        ${entityName(name, onClick)}
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
    domain,
  }) {
    const isPlaying = state === "playing";

    const action = isPlaying ? "media_pause" : "media_play";

    const mediaTitle = [a.media_artist, a.media_title].join(" – ");
    return html`
      <div class="entity-state" style="${this.grid(size || "full")}">
        ${entityName(name, onClick)}
        <div class="entity-value">
          <div class="entity-state-left media-title">${mediaTitle}</div>
          <div class="entity-state-right media-controls">
            <ha-icon-button
              icon="mdi:skip-previous"
              role="button"
              @click=${this._service(domain, "media_previous_track", entity)}
            ></ha-icon-button>
            <ha-icon-button
              icon="${isPlaying ? "mdi:stop" : "mdi:play"}"
              role="button"
              @click=${this._service(domain, action, entity)}
            ></ha-icon-button>
            <ha-icon-button
              icon="mdi:skip-next"
              role="button"
              @click=${this._service(domain, "media_next_track", entity)}
            ></ha-icon-button>
          </div>
        </div>
      </div>
    `;
  }

  _renderCustomElement(tag, config, customStyle) {
    return html`
      <div class="entity-state" style="${this.grid(config.size || "full")}">
        <div class="entity-value">
          <div class="entity-padded ${customStyle}">
            ${createElement(tag, config, this._hass)}
          </div>
        </div>
      </div>
    `;
  }

  renderCustomElement(tag, config, customStyle = "") {
    if (customElements.get(tag)) {
      return this._renderCustomElement(tag, config, customStyle);
    } else {
      console.error(tag + " doesn't exist");
    }
  }

  renderAsToggle({ onClick, size, name, state, domain, entity, color }) {
    color = color ? color : "var(--switch-checked-color)";
    return html`
      <div class="entity-state" style="${this.grid(size)}">
        ${entityName(name, onClick)}
        <span class="entity-value">
          <mwc-switch
            style="--mdc-theme-secondary: ${color};"
            ?checked=${state === "on"}
            @click=${this._service(domain, "toggle", entity)}
          >
          </mwc-switch>
        </span>
      </div>
    `;
  }

  renderDomainCover({ onClick, size, name, state, entity }) {
    const isclosed = state === "closed" || state === 0.0;
    const isopen = state === "open" || state === 100.0;
    return html`
      <div class="entity-state" style="${this.grid(size)}">
        ${entityName(name, onClick)}
        <span class="entity-value">
          <ha-icon-button
            ?disabled=${isopen}
            icon="hass:arrow-up"
            role="button"
            @click=${this._service("cover", "open_cover", entity)}
          ></ha-icon-button>
          <ha-icon-button
            icon="hass:stop"
            role="button"
            @click=${this._service("cover", "stop_cover", entity)}
          ></ha-icon-button>
          <ha-icon-button
            ?disabled=${isclosed}
            icon="hass:arrow-down"
            role="button"
            @click=${this._service("cover", "close_cover", entity)}
          ></ha-icon-button>
        </span>
      </div>
    `;
  }

  getCardSize() {
    return 3;
  }

  navigate(path) {
    history.pushState(null, "", path);
    fireEvent(this, "location-changed", { replace: true });
  }

  openEntityPopover(entityId) {
    fireEvent(this, "hass-more-info", { entityId });
  }
}