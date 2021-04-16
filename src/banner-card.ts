import { name as CARD_NAME, version } from "../package.json";
import BannerCard from "./main";

customElements.define(CARD_NAME, BannerCard);

console.info(`%c${CARD_NAME}: ${version}`, "font-weight: bold");
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: CARD_NAME,
  name: "Banner Card",
  preview: false,
  description:
    "A linkable banner card with a large heading and interactive glances of entities",
});
