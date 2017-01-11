// Type definitions for metisMenu 2.6.0
// Project: http://github.com/onokumus/metisMenu
// Definitions by: onokums <https://github.com/onokumus/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../jquery/jquery.d.ts"/>

interface MetisMenuOptions {
    toggle?: boolean;
    doubleTapToGo?: boolean;
    preventDefault?: boolean;
    activeClass?: string;
    collapseClass?: string;
    collapseInClass?: string;
    collapsingClass?: string;
    onTransitionStart?: boolean;
    onTransitionEnd?: boolean;
    dispose?: string;
}

interface JQuery {
    metisMenu(options?: MetisMenuOptions): JQuery;
}
