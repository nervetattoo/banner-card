import { LitElement, html, css } from "lit-element";
import styles from "./remoteControlsStyles";

class RemoteControls extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {}
    };
  }

  static get styles() {
    return [styles];
  }

  get buttons() {
    return this.config.buttons;
  }

  get name() {
    return this.config.name;
  }

  get icon() {
    return this.config.icon;
  }

  get entity() {
    return this.config.entity;
  }

  _service(domain, action, entity_id) {
    return () => this.hass.callService(domain, action, { entity_id });
  }

  render() {
    return html`
      <ha-card class="remote-controls">
        <div class="flex">
          ${this.icon
            ? html`
                <div class="entity-icon">
                  <ha-icon .icon="${this.icon}"></ha-icon>
                </div>
              `
            : ""}
          <span class="entity-name">${this.name}</span>
        </div>
        <div class="controls">
          ${this.buttons.map(button => {
            const [domain, service] = button.service.split(".", 2);

            return html`
              <ha-icon-button
                role="button"
                .icon="${button.icon}"
                .title="${button.name}"
                @click=${this._service(domain, service, this.entity)}
              ></ha-icon-button>
            `;
          })}
        </div>
      </ha-card>
    `;
  }
}

window.customElements.define("remote-controls", RemoteControls);
