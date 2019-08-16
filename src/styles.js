import { css } from "lit-element";

export default css`
  :host {
    --bc-font-size-heading: var(--banner-card-heading-size, 3em);
    --bc-font-size-entity-value: var(--banner-card-entity-value-size, 1.5em);
    --bc-font-size-media-title: var(--banner-card-media-title-size, 0.9em);
    --bc-spacing: var(--banner-card-spacing, 4px);
    --bc-button-size: var(--banner-card-button-size, 32px);
    --bc-heading-color-dark: var(
      --banner-card-heading-color-dark,
      var(--primary-text-color)
    );
    --bc-heading-color-light: var(--banner-card-heading-color-light, #fff);
  }
  ha-card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  paper-icon-button {
    width: var(--bc-button-size);
    height: var(--bc-button-size);
    padding: var(--bc-spacing);
  }

  .heading {
    display: block;
    font-size: var(--bc-font-size-heading);
    font-weight: 300;
    cursor: pointer;
    align-self: stretch;
    text-align: center;
  }

  .overlay-strip {
    background: rgba(0, 0, 0, 0.3);
    overflow: hidden;
    width: 100%;
  }

  .entities {
    padding: calc(var(--bc-spacing) * 2) 0px;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-left: -1px;
  }

  .entity-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: calc(var(--bc-spacing) * 2) 0;
    box-shadow: -1px 0px 0 0 white;
  }

  .media-title {
    flex: 1 0;
    overflow: hidden;
    font-weight: 300;
    font-size: var(--bc-font-size-media-title);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .media-controls {
    display: flex;
    flex: 0 0 calc(var(--bc-button-size) * 3);
  }

  .entity-state.expand .entity-value {
    width: 100%;
  }

  .entity-state-left {
    margin-right: auto;
    margin-left: 16px;
  }

  .entity-state-right {
    margin-left: auto;
    margin-right: 16px;
  }

  .entity-name {
    font-weight: 700;
    white-space: nowrap;
  }

  .entity-value {
    display: flex;
    width: 100%;
    flex: 1 0;
    padding-top: var(--bc-spacing);
    font-size: var(--bc-font-size-entity-value);
    align-items: center;
    justify-content: center;
  }

  .entity-value.error {
    display: inline-block;
    word-wrap: break-word;
    font-size: 16px;
    width: 90%;
  }

  .entity-value ha-icon {
    color: white;
  }

  .toggle {
    cursor: pointer;
    --paper-toggle-button-unchecked-bar-color: rgba(255, 255, 255, 0.4);
    --paper-toggle-button-unchecked-button-color: rgba(255, 255, 255, 0.4);
    --paper-toggle-button-unchecked-ink-color: rgba(1, 1, 1, 0.6);

    --paper-toggle-button-checked-bar-color: white;
    --paper-toggle-button-checked-button-color: white;
    --paper-toggle-button-checked-ink-color: white;
  }

  mwc-button {
    --mdc-theme-primary: white;
  }
`;
