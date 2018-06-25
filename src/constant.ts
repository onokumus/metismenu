import { IMMOptions } from "./interface";

export type MetisMenuEvents =
  | "show.metisMenu"
  | "shown.metisMenu"
  | "hide.metisMenu"
  | "hidden.metisMenu";

export const Default: IMMOptions = {
  activeClass: "active",
  collapseClass: "collapse",
  collapseInClass: "in",
  collapsingClass: "collapsing",
  parentTrigger: "li",
  preventDefault: true,
  subMenu: "ul",
  toggle: true,
  triggerElement: "a"
};
