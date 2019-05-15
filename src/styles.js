import { css } from "lit-element";

export default css`
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
    font-size: 3em;
    font-weight: 300;
    cursor: pointer;
    align-self: stretch;
    text-align: center;
    color: var(--primary-text-color);
  }

  .overlay-strip {
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
  }

  .error {
    display: flex;
    padding: 16px;
    color: white;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 1.4rem;
  }
  .entities {
    padding: 8px 0px;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .entity-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 33%;
    margin: 8px 0;
  }

  .entity-name {
    font-weight: 700;
    white-space: nowrap;
  }

  .entity-value {
    padding-top: 4px;
    font-size: 1.5rem;
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
