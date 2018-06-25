import { Default, MetisMenuEvents } from "./constant";
import { IMMOptions } from "./interface";

class MetisMenu {
  public config: IMMOptions;
  public element: HTMLElement;
  private isTransitioning: boolean;
  private disposed: boolean;
  private ulArr: any[];
  private cacheEl: HTMLElement;
  private cacheConfig: IMMOptions;
  private listenerOb: any[];

  constructor(element: HTMLElement, options?: IMMOptions) {
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

  public on(event: MetisMenuEvents, fn: EventListenerOrEventListenerObject) {
    this.element.addEventListener(event, fn, false);
    return this;
  }

  public off(event: MetisMenuEvents, fn: EventListenerOrEventListenerObject) {
    this.element.removeEventListener(event, fn);
    return this;
  }

  private emit(
    event: MetisMenuEvents,
    eventDetail: object,
    shouldBubble = false
  ) {
    let evt;
    if (typeof CustomEvent === "function") {
      evt = new CustomEvent(event, {
        bubbles: shouldBubble,
        detail: eventDetail
      });
    } else {
      evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(event, shouldBubble, false, eventDetail);
    }
    this.element.dispatchEvent(evt);
    return this;
  }

  private init(): void {
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
    const complete = () => {
      ul.classList.remove(this.config.collapsingClass);
      ul.style.height = "";
      ul.removeEventListener("transitionend", complete);
      this.setTransitioning(false);
      this.emit("shown.metisMenu", {
        shownElement: ul
      });
    };

    const li = ul.parentNode;
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
    this.emit("show.metisMenu", {
      showElement: ul
    });
    ul.addEventListener("transitionend", complete);
  }

  private hide(ul) {
    if (
      this.isTransitioning ||
      !ul.classList.contains(this.config.collapseInClass)
    ) {
      return;
    }
    this.emit("hide.metisMenu", {
      hideElement: ul
    });

    const li = ul.parentNode;
    li.classList.remove(this.config.activeClass);

    const complete = () => {
      ul.classList.remove(this.config.collapsingClass);
      ul.classList.add(this.config.collapseClass);
      ul.removeEventListener("transitionend", complete);
      this.setTransitioning(false);
      this.emit("hidden.metisMenu", {
        hiddenElement: ul
      });
    };

    ul.style.height = ul.getBoundingClientRect().height + "px";
    ul.style.height = ul.offsetHeight + "px";

    ul.classList.add(this.config.collapsingClass);
    ul.classList.remove(this.config.collapseClass);
    ul.classList.remove(this.config.collapseInClass);
    this.setTransitioning(true);

    ul.addEventListener("transitionend", complete);

    ul.style.height = "0px";

    const a = li.querySelector(this.config.triggerElement);
    a.setAttribute("aria-expanded", "false");
  }

  private setTransitioning(isTransitioning) {
    this.isTransitioning = isTransitioning;
  }
}

export default MetisMenu;
