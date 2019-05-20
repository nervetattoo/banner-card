import { LitElement, html, css } from "lit-element";
import styles from "./styles";
import { parseEntity, getAttributeOrState } from "./utils";

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
      entities: Array,
      error: String,
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

    this.entities = config.entities.map(parseEntity);
    this.config = config;
  }

  set hass(hass) {
    this._hass = hass;
    // Parse
    // Pluck new state values for _entities_
    this.error = null;
    this.entityValues = this.entities.map(config => {
      if (!hass.states.hasOwnProperty(config.entity)) {
        this.error = `Can't find entity ${config.entity}`;
        return config;
      }
      const state = hass.states[config.entity];

      const data = {
        name: state.attributes.friendly_name,
        state: state.state,
        value: getAttributeOrState(state, config.attribute),
        unit: state.attributes.unit_of_measurement,
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
    });
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
        <div class="overlay-strip">
          <div class="entities">
            ${this.entityValues.map(
              ({ entity, name, state, value, unit, domain }) => {
                const onClick = () => this.openEntityPopover(entity);
                let htmlContent;

                if (domain === "light") {
                  return html`
                    <div class="entity-state">
                      <span class="entity-name" @click=${onClick}>${name}</span>
                      <span class="entity-value">
                        <paper-toggle-button
                          class="toggle"
                          ?checked=${state === "on"}
                          @click=${() => {
                            this._hass.callService("light", "toggle", {
                              entity_id: entity
                            });
                          }}
                        />
                      </span>
                    </div>
                  `;
                } else if (isIcon(value)) {
                  htmlContent = html`
                    <ha-icon icon="${value}"></ha-icon>
                  `;
                } else {
                  htmlContent = html`
                    ${value} ${unit}
                  `;
                }
                return html`
                  <div class="entity-state" @click=${onClick}>
                    <span class="entity-name">${name}</span>
                    <span class="entity-value">${htmlContent}</span>
                  </div>
                `;
              }
            )}
          </div>
        </div>
      </ha-card>
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
    console.log("open popover", entityId);
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
