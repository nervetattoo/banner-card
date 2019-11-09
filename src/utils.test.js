import test from "ava";
import { parseEntity, mapObject, getAttributeOrState } from "./utils";

// Test that entities both can be specified as a string or as an object
test("parseEntity supports string + object", t => {
  const entity = "my.entity";
  t.deepEqual(parseEntity(entity), { entity });
  t.deepEqual(parseEntity({ entity }), { entity });
});

test("parseEntity nulls false values", t => {
  const fixture = {
    entity: "a",
    name: false
  };
  t.is(parseEntity(fixture).name, null);
});

test("parseEntity passes through all truthy values", t => {
  const fixture = {
    entity: "a",
    name: "B",
    foo: true
  };
  t.deepEqual(parseEntity(fixture), fixture);
});

test("getAttributeOrState returns only valid attribute", t => {
  const fixture = {
    state: "on",
    attributes: {
      active: true
    }
  };

  t.is(getAttributeOrState(fixture, "active"), true);
  t.is(getAttributeOrState(fixture, "nope"), "on");
});
