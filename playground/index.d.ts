declare module 'estorage' {
  import estorage from 'estorage';

  export interface IBlueprint<
  T extends Record<string, AllType>,
  EventsAsDiscoUnion = EventsConfigToDiscriminatedUnion<T>,
  > {
    add(definition: EventsAsDiscoUnion): IBlueprint<T, EventsAsDiscoUnion>;
  }

  declare class Blueprint<
  T extends Record<string, estorage.AllType>,
  EventsAsDiscoUnion = estorage.EventsConfigToDiscriminatedUnion<T>,
  > implements IBlueprint<T, EventsAsDiscoUnion> {
    protected definition: EventsAsDiscoUnion;

    static blueprintName: string;

    static blueprint: Blueprint<unknown>;

    static isImplemented: boolean;

    constructor(definition: EventsAsDiscoUnion);
    // add(definition: EventsAsDiscoUnion): IBlueprint<T, EventsAsDiscoUnion>;
    static implement(blueprintName: string, blueprint: Blueprint<unknown>): void;

    static getBlueprint(blueprintName: string): Blueprint<unknown>;
    static getBlueprints(): Record<string, Blueprint<unknown>>;
    static getBlueprintNames(): string[];
    static isImplemented(blueprintName: string): boolean;
    static getImplementation(blueprintName: string): Blueprint<unknown>;
  }

    type Prettify<T> = {
      [K in keyof T]: T[K]
    } & object;

    type EventsConfigToDiscriminatedUnion<
    T extends Record<
    | string, estorage.AllTypes
    | { type: estorage.AllTypes }
    >> = {
      [K in keyof T]: Prettify<{
        type: K
      }> & T[K]
    }[keyof T];

    declare const implement = (blueprintName: string, blueprint: Blueprint<unknown>): void => {
      console.log(blueprintName, blueprint);
    };
}
