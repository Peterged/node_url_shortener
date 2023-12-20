declare module 'estorage' {
  import estorage from 'estorage';

  export interface IBlueprint<
  T extends Record<string, AllTypes>,
  EventsAsDiscoUnion = EventsConfigToDiscriminatedUnion<T>,
  > {
    add(definition: EventsAsDiscoUnion): IBlueprint<T, EventsAsDiscoUnion>;
  }

  declare class Blueprint<
  T extends Record<string, AllTypes>,
  EventsAsDiscoUnion = BlueprintToDiscriminatedUnion<T>,
  > { // implements IBlueprint<T, EventsAsDiscoUnion>
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

    //     type IfEquals<T, U, Y = true, N = false> =
    //     (<G>() => G extends T ? 1 : 0) extends
    //     (<G>() => G extends U ? 1 : 0) ? Y : N;

    //     type IsPathDefaultUndefined<PathType> = PathType extends { default: undefined } ?
    //       true :
    //       PathType extends { default: (...args: any[]) => undefined } ?
    //         true :
    //         false;

    //     type IsPathRequired<P, TypeKey extends string = DefaultTypeKey> =
    //   P extends {
    //     required: true | [true, string | undefined]
    // | { isRequired: true } } | ArrayConstructor | any[]
    //     ? true
    //     : P extends { required: boolean }
    //       ? P extends { required: false }
    //         ? false
    //         : true
    //       : P extends (Record<TypeKey, ArrayConstructor | any[]>)
    //         ? IsPathDefaultUndefined<P> extends true
    //           ? false
    //           : true
    //         : P extends (Record<TypeKey, any>)
    //           ? P extends { default: any }
    //             ? IfEquals<P['default'], undefined, false, true>
    //             : false
    //           : false;

    type BlueprintToDiscriminatedUnion<
    T extends Record<string, AllTypes>> = {
      [K in keyof T]: Prettify<TBlueprintConvertType<T[K]>>
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    declare const implement = (blueprintName: string, blueprint: Blueprint<any, any>): void => {
      console.log(blueprintName, blueprint);
    };
}
