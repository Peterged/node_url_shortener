declare module 'estorage' {
    type StringType = 'String' | 'string' | typeof String;
    type NumberType = Blueprint.Number | 'Number' | 'number' | typeof Number;
    type BooleanType = Blueprint.Boolean | 'Boolean' | 'boolean';
    type ArrayType<T> = Array<T> | Blueprint.Array<T> | 'Array' | 'array';
    type ObjectType = globalThis.Object | Blueprint.Object | 'Object' | 'object';
    type FunctionType = (...args: unknown[]) => unknown | Blueprint.Function | 'Function' | 'function';
    type DateType = DateConstructor | Blueprint.Date | 'Date' | 'date';

    export type AllTypes =
    | StringType
    | NumberType
    | BooleanType
    | DateType
    | ArrayType<unknown>;

    export type BlueprintTypeOptions = Record<string, { type: AllTypes }>;
// type RequiredProps<T extends > =
}
