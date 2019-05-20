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
