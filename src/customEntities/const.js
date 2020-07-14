// taken from:
// https://github.com/kalkih/mini-media-player/blob/0ef04dd7eeaca80b3708c59c3af958bf6b709064/src/const.js

const DEFAULT_HIDE = {
  shuffle: true,
  power_state: true,
  artwork_border: true,
  icon_state: true,
  sound_mode: true,
  runtime: true,
  volume: false,
  controls: false,
  play_pause: false,
  play_stop: true,
  prev: false,
  next: false
};

const PROGRESS_PROPS = [
  "media_duration",
  "media_position",
  "media_position_updated_at"
];

const LABEL_SHORTCUT = "Shortcuts...";

const MEDIA_INFO = [
  { attr: "media_title" },
  { attr: "media_artist" },
  { attr: "media_series_title" },
  { attr: "media_season", prefix: "S" },
  { attr: "media_episode", prefix: "E" },
  { attr: "app_name" }
];

const PLATFORM = {
  SONOS: "sonos",
  SQUEEZEBOX: "squeezebox",
  BLUESOUND: "bluesound",
  SOUNDTOUCH: "soundtouch"
};

const buildConfig = config => {
  const conf = {
    artwork: "default",
    info: "default",
    more_info: true,
    source: "default",
    sound_mode: "default",
    toggle_power: true,
    volume_step: null,
    tap_action: {
      action: "more-info"
    },
    ...config,
    hide: { ...DEFAULT_HIDE, ...config.hide },
    speaker_group: {
      show_group_count: true,
      platform: "sonos",
      ...config.sonos,
      ...config.speaker_group
    },
    shortcuts: {
      label: LABEL_SHORTCUT,
      ...config.shortcuts
    }
  };
  conf.max_volume = Number(conf.max_volume) || 100;
  conf.min_volume = Number(conf.min_volume) || 0;
  conf.collapse = conf.hide.controls || conf.hide.volume;
  conf.info = conf.collapse && conf.info !== "scroll" ? "short" : conf.info;
  conf.flow = conf.hide.icon && conf.hide.name && conf.hide.info;

  return conf;
};

export {
  DEFAULT_HIDE,
  PROGRESS_PROPS,
  LABEL_SHORTCUT,
  MEDIA_INFO,
  PLATFORM,
  buildConfig
};
