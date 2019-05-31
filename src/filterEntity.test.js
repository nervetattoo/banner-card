import test from "ava";
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
    friendly_name: "Office"
  }
};

const hass = {
  "media_player.office": mediaPlayer
};

function config(state, attributes = null, entity = "media_player.office") {
  return {
    entity,
    when: { state, attributes }
  };
}

test("filterEntity with basic state matching", t => {
  t.assert(filterEntity(config("playing"), hass) === true);
  t.assert(filterEntity(config("paused"), hass) === false);
});

test("filterEntity with operator prefixed state matching", t => {
  t.assert(filterEntity(config(["=", "playing"]), hass) === true);
  t.assert(filterEntity(config(["!=", "playing"]), hass) === false);
  t.assert(filterEntity(config(["!=", "paused"]), hass) === true);
});

test("filterEntity with attribute matching", t => {
  t.assert(
    filterEntity(config(undefined, { media_artist: "Pink Floyd" }), hass) ===
      true
  );

  t.assert(filterEntity(config(undefined, { shuffle: false }), hass) === true);

  t.assert(
    filterEntity(config(undefined, { shuffle: ["!=", false] }), hass) === false
  );

  t.assert(
    filterEntity(config(undefined, { volume_level: [">", 0] }), hass) === true
  );

  t.assert(
    filterEntity(config(undefined, { volume_level: [">", 0.08] }), hass) ===
      true
  );

  t.assert(
    filterEntity(config(undefined, { volume_level: [">", 0.09] }), hass) ===
      false
  );
});

test("filterEntity with state + attribute matching", t => {
  t.assert(
    filterEntity(config("playing", { media_artist: "Pink Floyd" }), hass) ===
      true
  );
});
