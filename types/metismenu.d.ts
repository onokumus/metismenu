// Type definitions for metisMenu 3.0
// Project: http://github.com/onokumus/metisMenu
// Definitions by: onokumus <https://github.com/onokumus/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference types="jquery"/>

interface MetisMenuOptions {
    toggle?: boolean;
    preventDefault?: boolean;
    triggerElement?: string;
    parentTrigger?: string;
    subMenu?: string;
}

type MetisMenuEvents = "show.metisMenu" | "shown.metisMenu" | "hide.metisMenu" | "hidden.metisMenu";

interface JQuery {
    metisMenu(options?: MetisMenuOptions | "dispose"): JQuery;
    on(events: MetisMenuEvents, handler: (eventObject: JQuery.Event) => any): JQuery;
}
