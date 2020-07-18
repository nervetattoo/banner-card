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
    grid-column: span 3;
  }

  .remote-controls {
    padding: 16px;

    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .controls {
    flex: 2;
    text-align: right;
  }

  .entity-name {
    margin-left: 8px;
    font-weight: 400;
    white-space: nowrap;
    font-size: 14px;
  }

  .entity-icon {
    animation: fade-in 0.25s ease-out;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 100%;
    height: 40px;
    width: 40px;
    min-width: 40px;
    line-height: 40px;
    margin-right: calc(40px / 5);
    text-align: center;
    will-change: border-color;
    transition: border-color 0.25s ease-out;
  }

  .flex {
    display: flex;
    display: -ms-flexbox;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
  }
`;
