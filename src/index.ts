import { EventEmitter } from "events";
import { Default } from "./constant";
import { IMMOptions } from "./interface";

class MetisMenu extends EventEmitter {
  public config: IMMOptions;
  public element: HTMLElement;
  private isTransitioning: boolean;
  private disposed: boolean;
  private ulArr: any[];
  private cacheEl: HTMLElement;
  private cacheConfig: IMMOptions;
  private listenerOb: any[];
  constructor(element: HTMLElement, options?: IMMOptions) {
    super();
    this.element =
      typeof element === "string" ? document.querySelector(element) : element;
    this.cacheEl = this.element;
    this.config = { ...Default, ...options };
    this.cacheConfig = this.config;
    this.disposed = false;
    this.ulArr = [];
    this.listenerOb = [];
    this.init();
  }
  public update() {
    this.disposed = false;
    this.element = this.cacheEl;
    this.config = this.cacheConfig;
    this.init();
  }
  public dispose() {
    for (const lo of this.listenerOb) {
      for (const key in lo) {
        if (lo.hasOwnProperty(key)) {
          const el = lo[key];
          el[1].removeEventListener(el[0], el[2]);
        }
      }
    }
    this.ulArr = [];
    this.listenerOb = [];
    this.config = null;
    this.element = null;
    this.disposed = true;
  }
  public init(): void {
    this.ulArr = [].slice.call(
      this.element.querySelectorAll(this.config.subMenu)
    );
    for (const [index, ul] of this.ulArr.entries()) {
      const li = ul.parentNode;
      if (li.getAttribute("id") === null) {
        li.setAttribute("id", `mm-item-${index}`);
        ul.setAttribute("aria-labelledby", `mm-item-${index}`);
      } else {
        ul.setAttribute("aria-labelledby", li.getAttribute("id"));
      }
      const ulId =
        ul.getAttribute("id") !== null
          ? ul.getAttribute("id")
          : `mm-item-ul-${index}`;

      if (ul.getAttribute("id") === null) {
        ul.setAttribute("id", ulId);
      }
      ul.classList.add(this.config.collapseClass);

      if (li.classList.contains(this.config.activeClass)) {
        this.show(ul);
      } else {
        this.hide(ul);
      }
      const a = li.querySelector(this.config.triggerElement);
      if (a.getAttribute("aria-disabled") === "true") {
        return;
      }
      a.setAttribute("aria-controls", ulId);
      a.setAttribute("aria-expanded", "false");
      const listenerOb = {
        aClick: ["click", a, this.clickEvent.bind(this)]
      };

      for (const key in listenerOb) {
        if (listenerOb.hasOwnProperty(key)) {
          const listener = listenerOb[key];
          listener[1].addEventListener(listener[0], listener[2]);
        }
      }
      this.listenerOb.push(listenerOb);
    }
  }

  private clickEvent(ev?) {
    if (!this.disposed) {
      if (ev.currentTarget.tagName === "A") {
        ev.preventDefault();
      }

      const li = ev.target.parentNode;
      const ul = li.querySelector(this.config.subMenu);
      this.toggle(ul);
    }
  }

  private toggle(ul) {
    if (ul.parentNode.classList.contains(this.config.activeClass)) {
      this.hide(ul);
    } else {
      this.show(ul);
    }
  }

  private show(ul) {
    if (
      this.isTransitioning ||
      ul.classList.contains(this.config.collapseInClass)
    ) {
      return;
    }
    const li = ul.parentNode;
    this.emit("show.metisMenu", li);
    const complete = () => {
      ul.classList.remove(this.config.collapsingClass);
      ul.style.height = "";
      ul.removeEventListener("transitionend", complete);
      this.setTransitioning(false);
    };

    li.classList.add(this.config.activeClass);

    const a = li.querySelector(this.config.triggerElement);
    a.setAttribute("aria-expanded", "true");

    ul.style.height = "0px";
    ul.classList.remove(this.config.collapseClass);
    ul.classList.remove(this.config.collapseInClass);
    ul.classList.add(this.config.collapsingClass);
    const eleParentSiblins = [].slice
      .call(li.parentNode.children)
      .filter(c => c !== li);
    if (this.config.toggle && eleParentSiblins.length > 0) {
      for (const sibli of eleParentSiblins) {
        const sibUl = sibli.querySelector(this.config.subMenu);
        if (sibUl !== null) {
          this.hide(sibUl);
        }
      }
    }

    this.setTransitioning(true);

    ul.classList.add(this.config.collapseClass);
    ul.classList.add(this.config.collapseInClass);
    ul.style.height = ul.scrollHeight + "px";
    ul.addEventListener("transitionend", complete);
    this.emit("shown.metisMenu", ul);
  }

  private hide(ul) {
    if (
      this.isTransitioning ||
      !ul.classList.contains(this.config.collapseInClass)
    ) {
      return;
    }
    const li = ul.parentNode;
    this.emit("hide.metisMenu", li);
    li.classList.remove(this.config.activeClass);

    const comp = () => {
      ul.classList.remove(this.config.collapsingClass);
      ul.classList.add(this.config.collapseClass);
      ul.removeEventListener("transitionend", comp);
      this.setTransitioning(false);
    };

    ul.style.height = ul.getBoundingClientRect().height + "px";
    ul.style.height = ul.offsetHeight + "px";

    ul.classList.add(this.config.collapsingClass);
    ul.classList.remove(this.config.collapseClass);
    ul.classList.remove(this.config.collapseInClass);
    this.setTransitioning(true);

    ul.addEventListener("transitionend", comp);

    ul.style.height = "0px";

    const a = li.querySelector(this.config.triggerElement);
    a.setAttribute("aria-expanded", "false");
    this.emit("hidden.metisMenu", li);
  }

  private setTransitioning(isTransitioning) {
    this.isTransitioning = isTransitioning;
  }
}

export default MetisMenu;
