import { parseEntity, mapObject, getAttributeOrState } from "./utils";

// Test that entities both can be specified as a string or as an object
test("parseEntity supports string + object", () => {
  const entity = "my.entity";
  expect(parseEntity(entity)).toEqual({ entity });
  expect(parseEntity({ entity })).toEqual({ entity });
});

test("parseEntity nulls false values", () => {
  const fixture = {
    entity: "a",
    name: false,
  };
  expect(parseEntity(fixture).name).toBe(null);
});

test("parseEntity passes through all truthy values", () => {
  const fixture = {
    entity: "a",
    name: "B",
    foo: true,
  };
  expect(parseEntity(fixture)).toEqual(fixture);
});

test("getAttributeOrState returns only valid attribute", () => {
  const fixture = {
    state: "on",
    attributes: {
      active: true,
    },
  };

  expect(getAttributeOrState(fixture, "active")).toBe(true);
  expect(getAttributeOrState(fixture, "nope")).toBe("on");
});
