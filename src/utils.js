// Helper to return an attribute if specified and present,
// if not the value of state
export function getAttributeOrState({ state, attributes }, attribute = false) {
  if (typeof attribute === "string" && attributes.hasOwnProperty(attribute)) {
    return attributes[attribute];
  }
  return state;
}

export function mapObject(data, fn) {
  return Object.entries(data).reduce((result, [key, value]) => {
    return {
      ...result,
      [key]: fn(value, key)
    };
  }, {});
}

export function parseEntity(entity) {
  if (typeof entity === "object") {
    return mapObject(entity, value => {
      return value === false ? null : value;
    });
  }
  return { entity };
}

export function readableColor(hex, light, dark) {
  if (!hex || hex[0] !== "#") {
    return dark;
  }
  hex = hex.substring(1);

  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    const [a, b, c] = hex;
    hex = [a, a, b, b, c, c].join("");
  }
  if (hex.length !== 6) {
    return dark;
  }

  const rgb = [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255
  ];

  const [r, g, b] = rgb.map(c => {
    if (c <= 0.03928) {
      return c / 12.92;
    } else {
      return Math.pow((c + 0.055) / 1.055, 2.4);
    }
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.179 ? dark : light;
}
