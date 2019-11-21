# Lovelace banner card

A fluffy linkable banner with interactive glances to spice up your home dashboards

| ![Example 1](/screenshots/living-room.png) | ![Example 2](/screenshots/bathroom.png) |
| ------------------------------------------ | --------------------------------------- |
| ![Example 3](/screenshots/kitchen.png)     | ![Example 2](/screenshots/office.png)   |

## Installation

[`Try HACS first`](https://hacs.xyz/)

1. Download the `banner-card.js` from the [latest release](https://github.com/nervetattoo/banner-card/releases/latest) and store it in your `configuration/www` folder.
   _Previously you could download the source file from Github but starting from the 0.14 release that is no longer possible. If you try to do so it will crash_
2. Configure Lovelace to load the card:

```yaml
resources:
  - url: /local/banner-card.js?v=1
    type: module
```

## Available configuration options:

| Key                  | Type                 | Description                                                                                                                                                                                                 | Example                                                                               |
| -------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| heading              | _string_             | The heading to display. Set to false to hide header (**Note**: Also remember to escape!)                                                                                                                    | `heading: "\U0001F6CB Living room"`                                                   |
| background           | _string_             | A valid CSS color to use as the background                                                                                                                                                                  | `background: "#EDE7B0"`, `background: red`                                            |
| color                | _string_             | A valid CSS color to use as the text color                                                                                                                                                                  | `color: "#EDE7B0"`, `color: red`                                                      |
| link                 | _string_             | A link, to a different view in HA for example                                                                                                                                                               | `link: /lovelace/living_room`                                                         |
| entities             | _array_              | An array of entities to display for glances. Either as strings or as objects                                                                                                                                | `entities: [binary_sensor.remote_ui]`                                                 |
| row_size             | _number_             | Configure number of "entity cells" in the grid before it wraps to a new line. 3 is the default and what looks best _in most cases_                                                                          | `row_size: 4`                                                                         |
| entities[].entity    | _string_             | Entity id                                                                                                                                                                                                   | `- entity: binary_sensor.remote_ui`                                                   |
| entities[].unit      | _string_ or _false_  | Override the automatic unit                                                                                                                                                                                 | `unit: My unit`                                                                       |
| entities[].name      | _string_             | Override the automatic usage of friendly_name                                                                                                                                                               | `name: A sensor`                                                                      |
| entities[].map_state | _object_             | Map state values to resulting text or icons. A string prefixed with mdi: or hass: will yield a rendered icon.                                                                                               | map_state:<br /> home: mdi:home-account<br /> not_home: mdi:walk                      |
| entities[].attribute | _string_             | Display an attribute instead of the state                                                                                                                                                                   |                                                                                       |
| entities[].size      | _number_             | Override how many "entity cells" this entity will fill. The default for most entities is 1 cell, except if you include a media_player which will use whatever is the value for `row_size`, thus full width. |                                                                                       |
| entities[].when      | _string_ or _object_ | Only display this entity when these tests pass                                                                                                                                                              | See separate section                                                                  |
| entities[].image     | _bool_               | Force display the value as a rounded image                                                                                                                                                                  | Will use the provided value as a background for the `<state-badge>` component from HA |
| entities[].action    | _object_             | Specify a service to be called on tap. Will result in either an icon (if a valid icon is set as value with map_state) or a button with the state value as text                                              | See separate section                                                                  |

### map_state

You can use `map_state` to force a value or icon to be rendered when the entity has a certain state. It either supports a full object where you can override any key for the entity, like `value`, `name`, `unit` and so on, or a shorthand string that maps to `value`.
Both forms in an example:

```yaml
entity: media_player.office
map_state:
  playing: mdi:disc-player
  not_playing:
    value: mdi:stop
    name: A custom entity heading
```

## Using when

You can filter entities with a simple but powerful `when` object. This allows you to filter based on state and/or attributes. It is probably simpliest explained through a few examples

This limits to only showing a media_player entity when it is playing. It uses the shorthand form for `when` where a simple string is used instead of specifying an object with state key.

```yaml
entity: media_player.office
when: playing
```

This example limits to only showing a light entity when its on and above a certain brightness

```yaml
entity: light.my_light
when:
  state: "on"
  attributes:
    brightness: [">", 50]
```

The last example shows how passing a simple string/number will imply an equality operator check, whereas you can configure using an array to using different operators. The following operators exist:

### When operators

| Operator | Description                                                                                                                                                                                           | Example                                  |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `=`      | **Equal** check to either match a string/number/boolean input, or if given an array, check that the real value exists inside said array. This is the default operator used when a simple value is set | `state: ['=', 'on', 'off']`              |
| !=       | **Not equal** check that is exactly like the equal check, just negated (opposite results)                                                                                                             | `fan_mode: ['!=', 'On Low', 'Auto Low']` |
| >        | **Bigger than** checks if real value is bigger than what is set. Does not support multiple values                                                                                                     | `brightness: ['>', 50]`                  |
| <        | **Smaller than** checks if real value is smaller than what is set. Does not support multiple values                                                                                                   | `brightness: ['<', 50]`                  |

## Using entity action

You can add **simple** buttons by specifying the action property for an entity. This is intended for simple use cases to start scripts or set a light to specific brightness for example. You can enforce a fixed icon using a crazy hack (and there I made it a feature) that sets an entities value via config. (Its normaly read from state). You can also use `map_state` to use different icons for different states.

```yaml
entity: light.my_light
name: Reading light
value: mdi:book-open-page-variant
action:
  service: light.turn_on
  brightness: 50
```

## CSS vars for theming

Please see the [official docs on theming](https://www.home-assistant.io/components/frontend/#defining-themes) or [check out a tutorial like this one](https://www.juanmtech.com/themes-in-home-assistant/)
The card uses the following CSS variables:

| Var name                          | Default value             | Usage                                                                         |
| --------------------------------- | ------------------------- | ----------------------------------------------------------------------------- |
| --banner-card-error-color         | var(--lumo-error-color)   | Background color when there's an error crashing the card                      |
| --banner-card-heading-size        | 3em                       | The main heading of the card                                                  |
| --banner-card-entity-value-size   | 1.5em                     | Entity value font size                                                        |
| --banner-card-media-title-size    | 0.9em                     | Media player fonts title font size                                            |
| --banner-card-button-size         | 32px                      | Size of buttons                                                               |
| --banner-card-spacing             | 4px                       | Base unit for spacing. Used in multiples many places                          |
| --banner-card-heading-color-dark  | var(--primary-text-color) | The card measures your bg color to figure out to use dark or light text color |
| --banner-card-heading-color-light | #fff                      | The card measures your bg color to figure out to use dark or light text color |

## Example configurations

```yaml
type: custom:banner-card
background: "#EDE7B0"
heading: "\U0001F6CB Living room"
link: /lovelace/living_room
entities:
  - light.fibaro_system_fgd212_dimmer_2_level
  - light.fibaro_system_fgd212_dimmer_2_level_3
  - sensor.aeotec_zw100_multisensor_6_temperature_6
  - entity: sensor.aeotec_zw100_multisensor_6_luminance_6
    name: Lux
  - entity: cover.fibaro_system_fgrm222_roller_shutter_controller_2_level
    name: Roller shutter
```

```yaml
type: custom:banner-card
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
