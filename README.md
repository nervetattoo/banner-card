# Lovelace banner card

A fluffy linkable banner with interactive glances to spice up your home dashboards

## Installation

### Installation and tracking with `custom updater` _(Recommended)_

1. Make sure you've the [custom_updater](https://github.com/custom-components/custom_updater) component installed and working.
2. Configure Lovelace to load the card:.

```yaml
resources:
  - url: /customcards/github/nervetattoo/banner-card.js?track=true
    type: module
```

3. Run the service `custom_updater.check_all` or click the "CHECK" button if you use the tracker-card.
4. Refresh the website.

### Installation _(Manual)_

1. Download the `banner-card.js` from the [latest release](https://github.com/nervetattoo/banner-card/releases/latest) and store it in your `configuration/www` folder.
   _Previously you could download the source file from Github but starting from the 0.14 release that is no longer possible. If you try to do so it will crash_
2. Configure Lovelace to load the card:

```yaml
resources:
  - url: /local/simple-thermostat.js?v=1
    type: module
```

## Available configuration options:

| Key     | Type     | Description                                | Example                             |
| ------- | -------- | ------------------------------------------ | ----------------------------------- |
| heading | _string_ | The heading to display. Remember to escape | `heading: "\U0001F6CB Living room"` |
