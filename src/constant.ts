import { IMMClassNames, IMMOptions } from "./interface";

export type MetisMenuEvents =
  | "show.metisMenu"
  | "shown.metisMenu"
  | "hide.metisMenu"
  | "hidden.metisMenu";

export const Default: IMMOptions = {
  parentTrigger: "li",
  subMenu: "ul",
  toggle: true,
  triggerElement: "a"
};

export const ClassNames: IMMClassNames = {
  activeClass: "active",
  collapseClass: "collapse",
  collapseInClass: "in",
  collapsingClass: "collapsing"
};
