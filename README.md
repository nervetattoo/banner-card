# Lovelace banner card

A fluffy linkable banner with interactive glances to spice up your home dashboards

| ![Example 1](/banner-card-living-room.png) | ![Example 2](/banner-card-bathroom.png) |
| ------------------------------------------ | --------------------------------------- |


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
  - url: /local/banner-card.js?v=1
    type: module
```

## Available configuration options:

| Key                  | Type                | Description                                                                                                                                                                                                 | Example                                                     |
| -------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| heading              | _string_            | The heading to display. Remember to escape                                                                                                                                                                  | `heading: "\U0001F6CB Living room"`                         |
| background           | _string_            | A valid CSS color to use as the background                                                                                                                                                                  | `background: "#EDE7B0"`, `background: red`                  |
| link                 | _string_            | A link, to a different view in HA for example                                                                                                                                                               | `link: /lovelace/living_room`                               |
| entities             | _array_             | An array of entities to display for glances. Either as strings or as objects                                                                                                                                | `entities: [binary_sensor.remote_ui]`                       |
| row_size             | _number_            | Configure number of "entity cells" in the grid before it wraps to a new line. 3 is the default and what looks best _in most cases_                                                                          | `row_size: 4`                                               |
| entities[].entity    | _string_            | Entity id                                                                                                                                                                                                   | `- entity: binary_sensor.remote_ui`                         |
| entities[].unit      | _string_ or _false_ | Override the automatic unit                                                                                                                                                                                 | `unit: My unit`                                             |
| entities[].name      | _string_            | Override the automatic usage of friendly_name                                                                                                                                                               | `name: A sensor`                                            |
| entities[].map_state | _object_            | Map state values to resulting text or icons. A string prefixed with mdi: or hass: will yield a rendered icon.                                                                                               | `map_state: { home: mdi:home-account, not_home: mdi:walk }` |
| entities[].attribute | _string_            | Display an attribute instead of the state                                                                                                                                                                   |                                                             |
| entities[].size      | _number_            | Override how many "entity cells" this entity will fill. The default for most entities is 1 cell, except if you include a media_player which will use whatever is the value for `row_size`, thus full width. |                                                             |

## Example configuration for results as seen in screenshot

```yaml
- type: custom:banner-card
  background: "#EDE7B0"
  heading: "\U0001F6CB Living room"
  link: /lovelace/living_room
  entities:
    - light.fibaro_system_fgd212_dimmer_2_level
    - light.fibaro_system_fgd212_dimmer_2_level_3
    - sensor.aeotec_zw100_multisensor_6_temperature_6

- type: custom:banner-card
  heading: "\U0001F6C1 Bathroom"
  background: "#B0C2ED"
  link: /lovelace/bathroom
  entities:
    - entity: light.fibaro_system_fgd212_dimmer_2_level_11
      name: Light
    - entity: sensor.aeotec_zw100_multisensor_6_temperature_5
      name: Temperature
    - entity: sensor.aeotec_zw100_multisensor_6_relative_humidity_5
      name: Humidity
```
