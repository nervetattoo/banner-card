type LooseObject = Record<string, any>;
export interface CardConfig {
  heading?: false | Array<string> | string;
  background?: string;
  color?: string;
  link?: string;
  row_size?: number | "auto";
  entities?: Array<{
    entity: string;
    unit?: string | false;
    name?: string;
    map_state?: LooseObject;
    attribute?: string;
    size?: number;
    when?:
      | string
      | {
          state: string;
          attributes: LooseObject;
        };
    image?: boolean;
    action?: LooseObject;
  }>;
}
