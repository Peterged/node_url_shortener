namespace Blueprint {
  export class String extends globalThis.String {
    static blueprintName: 'String';
  }
  export class Map<V> extends globalThis.Map<string, V> { }
  export class Number extends globalThis.Number {
    static blueprintName: 'Number';
  }
  export class Boolean extends globalThis.Boolean {
    static blueprintName: 'Boolean';
  }
  export class Array<T> extends globalThis.Array<T> { }
  export class Function extends globalThis.Function {
    static blueprintName: 'Function';
  }
  export class Date extends globalThis.Date {
    static blueprintName: 'Date';
  }
}

type StringType = 'String' | 'string' | typeof String;
type NumberType = Blueprint.Number | 'Number' | 'number' | typeof Number;
type BooleanType = Blueprint.Boolean | 'Boolean' | 'boolean';
type ArrayType<T> = Array<T> | Blueprint.Array<T> | 'Array' | 'array';
type FunctionType = (...args: unknown[]) => unknown | Blueprint.Function | 'Function' | 'function';
type DateType = Date | Blueprint.Date | 'Date' | 'date';

export type AllTypes =
    | StringType
    | NumberType
    | BooleanType
    | ArrayType<unknown>
    | FunctionType
    | DateType;

type DefaultPrintOptions = AllTypes | { type: AllTypes };
// TBlueprintConvertType is a type that converts String, Number, ... variables into a type for intellisense
type printObjectOptions<T> = {
  [P in keyof T]: T[P] extends { type: infer Type } ? TBlueprintConvertType<Type> : TBlueprintConvertType<T[P]>;
};

const b: StringType = String;

export type TBlueprintConvertType<T> =
    T extends StringType ? string
      : T extends typeof Number ? number
        : T extends BooleanType ? boolean
          : T extends ArrayType<infer U> ? Array<U>
            : T extends DateType ? Date : T;

const a: TBlueprintConvertType<string> = '';

function printObject<T = AllTypes>(obj: printObjectOptions<T>) {
  console.log(obj);
}

printObject({
  username: String,
  password: String,
  age: Number,
  address: {
    zip: String,
  },
});
