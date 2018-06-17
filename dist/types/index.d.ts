/// <reference types="node" />
import { EventEmitter } from "events";
import { IMMOptions } from "./interface";
declare class MetisMenu extends EventEmitter {
    config: IMMOptions;
    element: HTMLElement;
    private isTransitioning;
    private disposed;
    private ulArr;
    private liArr;
    private aArr;
    private cacheEl;
    private cacheConfig;
    private listenerOb;
    constructor(element: HTMLElement, options?: IMMOptions);
    update(): void;
    dispose(): void;
    init(): void;
    private clickEvent;
    private toggle;
    private show;
    private hide;
    private setTransitioning;
}
export default MetisMenu;
