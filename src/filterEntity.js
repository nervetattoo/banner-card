const COMPARATORS = {
  "=": (x, y) => y.includes(x),
  ">": (x, y) => x > y[0],
  "<": (x, y) => x < y[0],
  "!=": (x, y) => !y.includes(x)
};

// Match _expect_ with _real_ and return true/false
// _expect_ can either be a simple type or an array with an operator
// at index 0. With no operator a '=' operator is defaulted
// Operators trigger different type of functions for matching:
// = : Equality (or for arrays, equal to one of the members)
// != : Opposite of equality
// > : Check if _real_ is bigger than _expect_. Does not support arrays and will only use the first item
// < : Check if _real_ is smaller than _expect_. Does not support arrays and will only use the first item
//
// If an invalid strategy is attempted this function will throw
function compareValue(expect, real) {
  const type = typeof expect;
  if (["string", "number", "boolean"].includes(type)) {
    return COMPARATORS["="](real, [expect]);
  } else if (Array.isArray(expect)) {
    const [operator, ...test] = expect;
    if (COMPARATORS.hasOwnProperty(operator)) {
      return COMPARATORS[operator](real, test);
    }
    return COMPARATORS["="](real, test);
  }

  throw new Error(`Couldn't find a valid matching strategy for '${expect}'`);
}

// Given the card config for an entity, with possible keys:
// * entity
// * when.state
// * when.attributes
// * when.entity
// And the entire HASS state tree
// this function will determine if the passed entity passes filtering rules or not
function filterEntity(config, allStates) {
  if (!allStates.hasOwnProperty(config.entity)) {
    return false;
  }
  if (config.when) {
    const { state: expect, entity = config.entity, attributes } =
      typeof config.when === "string" ? { state: config.when } : config.when;

    // Pluck the state of the requested entity from the HASS object
    const state = allStates[entity];

    // Check state vs expectation from `when`
    if (typeof expect !== "undefined" && !compareValue(expect, state.state)) {
      return false;
    }

    // Check every attribute
    // Paired into: [attributeName, expectedValue]
    const attributePairs = Object.entries(attributes || {});
    return attributePairs.every(([key, val]) => {
      const real = state.attributes[key];
      return compareValue(val, real);
    });
  }

  // By principle of least surprises we will just display anything that has no tests or some contortion of filtering that is not supported
  return true;
}

export default filterEntity;
