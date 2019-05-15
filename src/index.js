import { LitElement, html, css } from "lit-element";
import template from "loadsh.template";
import styles from "./styles";

//
// type: custom:banner
// heading: 🛋 Living room
// template: >
//   {entities[0].friendly_name}
// background: #999
// entities:
//   - entity: light.fibaro_system_fgd212_dimmer_2_level

function mapObject(data, fn) {
  return Object.entries(data).reduce((result, [key, value]) => {
    return {
      ...result,
      [key]: fn(value, key)
    };
  }, {});
}
function parseEntity(entity) {
  if (typeof entity === "object") {
    return mapObject(entity, value => {
      return value === false ? null : value;
    });
  }
  return { entity };
}

class BannerCard extends LitElement {
  static get properties() {
    return {
      config: Object,
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

    if (config.template) {
      this.template = template(config.template);
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
        value: state.state,
        unit: state.attributes.unit_of_measurement,
        domain: config.entity.split(".")[0]
      };

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
      return html`
        <ha-card class="not-found">
          <h2 class="heading">
            ${this.config.heading}
          </h2>
          <div class="overlay-strip">
            <div class="error">
              ${this.error}
            </div>
          </div>
        </ha-card>
      `;
    }

    const onClick = () => this.config.link && this.navigate(this.config.link);
    const numEntities = this.entityValues.length;
    return html`
      <ha-card style="background: ${this.config.background};">
        <h2 class="heading" @click=${onClick}>
          ${this.config.heading}
        </h2>
        <div class="overlay-strip ${numEntities > 3 ? "scroll" : ""}">
          <div class="entities">
            ${this.entityValues.map(
              ({ entity, name, state, value, unit, domain }) => {
                const onClick = () => this.openEntityPopover(entity);
                const nameHtml = html`
                  <span class="entity-name" @click=${onClick}>
                    ${name}
                  </span>
                `;

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
                } else if (value.match(/^(mdi|hass):/)) {
                  return html`
                    <div class="entity-state" @click=${onClick}>
                      <span class="entity-name">${name}</span>
                      <span class="entity-value">
                        <ha-icon icon="${value}"></ha-icon>
                      </span>
                    </div>
                  `;
                } else {
                  return html`
                    <div class="entity-state" @click=${onClick}>
                      <span class="entity-name">${name}</span>
                      <span class="entity-value">${value} ${unit}</span>
                    </div>
                  `;
                }
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
