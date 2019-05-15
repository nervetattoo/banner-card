import { LitElement, html, css } from "lit-element";
import styles from "./styles";

//
// type: custom:banner
// heading: 🛋 Living room
// background: #999
// entities:
//   - entity: light.fibaro_system_fgd212_dimmer_2_level

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
    this._hass = {};
  }

  setConfig(config) {
    if (!config.heading) {
      throw new Error("You need to define a heading");
    }

    this.config = config;
  }

  set hass(hass) {
    this._hass = hass;
    // Parse
    // Pluck new state values for _entities_
    this.entityValues = this.config.entities.map(entity => {
      const state = hass.states[entity];
      const unit = state.attributes.unit_of_measurement;
      return {
        id: state.entity_id,
        name: state.attributes.friendly_name,
        state: state.state,
        value: `${state.state} ${unit || ""}`,
        domain: state.entity_id.split(".")[0]
      };
    });
  }

  render() {
    const onClick = () => this.config.link && this.navigate(this.config.link);
    const numEntities = this.entityValues.length;
    return html`
      <ha-card style="background: ${this.config.background};">
        <h2 class="heading" @click=${onClick}>
          ${this.config.heading}
        </h2>
        <div class="overlay-strip">
          <div class="entities ${numEntities > 3 ? "scroll" : ""}">
            ${this.entityValues.map(({ id, name, state, value, domain }) => {
              if (domain === "light") {
                return html`
                  <div class="entity-state">
                    <span class="entity-name">${name}</span>
                    <span class="entity-value">
                      <paper-toggle-button
                        class="toggle"
                        ?checked=${state === "on"}
                        @click=${() => {
                          this._hass.callService("light", "toggle", {
                            entity_id: id
                          });
                        }}
                      />
                    </span>
                  </div>
                `;
              } else {
                return html`
                  <div class="entity-state">
                    <span class="entity-name">${name}</span>
                    <span class="entity-value">${value}</span>
                  </div>
                `;
              }
            })}
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
