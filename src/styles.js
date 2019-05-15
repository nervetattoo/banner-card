import { css } from "lit-element";

export default css`
  ha-card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .heading {
    display: block;
    font-size: 3em;
    font-weight: 300;
    cursor: pointer;
    align-self: stretch;
    text-align: center;
    color: var(--primary-text-color)
  }

  .overlay-strip {
    background: rgba(0, 0, 0, .3);
    width: 100%;
  }

  .entities {
    padding: 16px;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    overflow: auto;
  }

  .entities.scroll {
    overflow: -moz-scrollbars-none
    -ms-overflow-style: none;
  }
  .entities.scroll::-webkit-scrollbar {
    width: 0 !important
  }

  .entity-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 4px;
    flex: 1 0 33%;
  }

  .entity-name {
    font-weight: 700;
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
