import filterEntity from "./filterEntity";

const mediaPlayer = {
  state: "playing",
  attributes: {
    volume_level: 0.09,
    media_title:
      "Shine On You Crazy Diamond, Pts. 6-9 - 2011 Remastered Version",
    media_artist: "Pink Floyd",
    media_album_name: "Wish You Were Here [Remastered] (Remastered Version)",
    source_list: ["Discover Weekly", "Radio"],
    shuffle: false,
    sonos_group: ["media_player.office"],
    friendly_name: "Office",
  },
};

const hass = {
  "media_player.office": mediaPlayer,
};

function config(state, attributes = null, entity = "media_player.office") {
  return {
    entity,
    when: { state, attributes },
  };
}

test("filterEntity with basic state matching", () => {
  expect(filterEntity(config("playing"), hass)).toBe(true);
  expect(filterEntity(config("paused"), hass)).toBe(false);
});

test("filterEntity with operator prefixed state matching", () => {
  expect(filterEntity(config(["=", "playing"]), hass)).toBe(true);
  expect(filterEntity(config(["!=", "playing"]), hass)).toBe(false);
  expect(filterEntity(config(["!=", "paused"]), hass)).toBe(true);
});

test("filterEntity with attribute matching", () => {
  expect(
    filterEntity(config(undefined, { media_artist: "Pink Floyd" }), hass)
  ).toBe(true);

  expect(filterEntity(config(undefined, { shuffle: false }), hass)).toBe(true);

  expect(
    filterEntity(config(undefined, { shuffle: ["!=", false] }), hass)
  ).toBe(false);

  expect(
    filterEntity(config(undefined, { volume_level: [">", 0] }), hass)
  ).toBe(true);

  expect(
    filterEntity(config(undefined, { volume_level: [">", 0.08] }), hass)
  ).toBe(true);

  expect(
    filterEntity(config(undefined, { volume_level: [">", 0.09] }), hass)
  ).toBe(false);
});

test("filterEntity with state + attribute matching", () => {
  expect(
    filterEntity(config("playing", { media_artist: "Pink Floyd" }), hass)
  ).toBe(true);
});
