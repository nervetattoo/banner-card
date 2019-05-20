import { css } from "lit-element";

export default css`
  :host {
    --bc-error-color: var(--lumo-error-color);
    --bc-font-size-heading: 3em;
    --bc-font-size-entity-value: 1.5em;
    --bc-font-size-media-title: 0.9em;
    --bc-spacing: 4px;
  }
  ha-card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ha-card.not-found {
    background-color: var(--lumo-error-color);
  }

  .heading {
    display: block;
    font-size: var(--bc-font-size-heading);
    font-weight: 300;
    cursor: pointer;
    align-self: stretch;
    text-align: center;
    color: var(--primary-text-color);
  }

  .overlay-strip {
    background: rgba(0, 0, 0, 0.3);
    overflow: hidden;
    width: 100%;
  }

  .error {
    display: flex;
    padding: calc(var(--bc-spacing) * 4)
    color: white;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 1.4rem;
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
    overflow: hidden;
    font-weight: 300;
    font-size: var(--bc-font-size-media-title);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .media-controls {
    flex: 1 0 85px;
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
    padding-top: var(--bc-spacing);
    font-size: var(--bc-font-size-entity-value);
    align-items: center;
  }

  .entity-value.interactive {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .entity-value.interactive ha-icon {
    color: white;
  }

  .entity-value button {
    cursor: pointer;
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
  }

  .entity-value button:hover {
    box-shadow: 1px 1px 1px 1px #0000003d;
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
`;
