import { ClassNames, Default } from "./constant";
class MetisMenu {
    constructor(element, options) {
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
    update() {
        this.disposed = false;
        this.element = this.cacheEl;
        this.config = this.cacheConfig;
        this.init();
    }
    dispose() {
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
    on(event, fn) {
        this.element.addEventListener(event, fn, false);
        return this;
    }
    off(event, fn) {
        this.element.removeEventListener(event, fn);
        return this;
    }
    emit(event, eventDetail, shouldBubble = false) {
        let evt;
        if (typeof CustomEvent === "function") {
            evt = new CustomEvent(event, {
                bubbles: shouldBubble,
                detail: eventDetail
            });
        }
        else {
            evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(event, shouldBubble, false, eventDetail);
        }
        this.element.dispatchEvent(evt);
        return this;
    }
    init() {
        this.ulArr = [].slice.call(this.element.querySelectorAll(this.config.subMenu));
        for (const ul of this.ulArr) {
            const li = ul.parentNode;
            ul.classList.add(ClassNames.collapseClass);
            if (li.classList.contains(ClassNames.activeClass)) {
                this.show(ul);
            }
            else {
                this.hide(ul);
            }
            const a = li.querySelector(this.config.triggerElement);
            if (a.getAttribute("aria-disabled") === "true") {
                return;
            }
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
    clickEvent(ev) {
        if (!this.disposed) {
            if (ev.currentTarget.tagName === "A") {
                ev.preventDefault();
            }
            const li = ev.target.parentNode;
            const ul = li.querySelector(this.config.subMenu);
            this.toggle(ul);
        }
    }
    toggle(ul) {
        if (ul.parentNode.classList.contains(ClassNames.activeClass)) {
            this.hide(ul);
        }
        else {
            this.show(ul);
        }
    }
    show(ul) {
        if (this.isTransitioning ||
            ul.classList.contains(ClassNames.collapseInClass)) {
            return;
        }
        const complete = () => {
            ul.classList.remove(ClassNames.collapsingClass);
            ul.style.height = "";
            ul.removeEventListener("transitionend", complete);
            this.setTransitioning(false);
            this.emit("shown.metisMenu", {
                shownElement: ul
            });
        };
        const li = ul.parentNode;
        li.classList.add(ClassNames.activeClass);
        const a = li.querySelector(this.config.triggerElement);
        a.setAttribute("aria-expanded", "true");
        ul.style.height = "0px";
        ul.classList.remove(ClassNames.collapseClass);
        ul.classList.remove(ClassNames.collapseInClass);
        ul.classList.add(ClassNames.collapsingClass);
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
        ul.classList.add(ClassNames.collapseClass);
        ul.classList.add(ClassNames.collapseInClass);
        ul.style.height = ul.scrollHeight + "px";
        this.emit("show.metisMenu", {
            showElement: ul
        });
        ul.addEventListener("transitionend", complete);
    }
    hide(ul) {
        if (this.isTransitioning ||
            !ul.classList.contains(ClassNames.collapseInClass)) {
            return;
        }
        this.emit("hide.metisMenu", {
            hideElement: ul
        });
        const li = ul.parentNode;
        li.classList.remove(ClassNames.activeClass);
        const complete = () => {
            ul.classList.remove(ClassNames.collapsingClass);
            ul.classList.add(ClassNames.collapseClass);
            ul.removeEventListener("transitionend", complete);
            this.setTransitioning(false);
            this.emit("hidden.metisMenu", {
                hiddenElement: ul
            });
        };
        ul.style.height = ul.getBoundingClientRect().height + "px";
        ul.style.height = ul.offsetHeight + "px";
        ul.classList.add(ClassNames.collapsingClass);
        ul.classList.remove(ClassNames.collapseClass);
        ul.classList.remove(ClassNames.collapseInClass);
        this.setTransitioning(true);
        ul.addEventListener("transitionend", complete);
        ul.style.height = "0px";
        const a = li.querySelector(this.config.triggerElement);
        a.setAttribute("aria-expanded", "false");
    }
    setTransitioning(isTransitioning) {
        this.isTransitioning = isTransitioning;
    }
}
export default MetisMenu;
