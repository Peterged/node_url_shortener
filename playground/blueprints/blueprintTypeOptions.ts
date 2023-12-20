declare module 'estorage' {

  class BlueprintTypeOptions<T, EnforcedBlueprintType = any> {
    type?:
    T extends StringType ? string
      : T extends NumberType ? number
        : T extends Blueprint.Boolean ? boolean
          : T extends Blueprint.Array<T> ? Array<T>
            : T extends Blueprint.Function ? (...args: unknown[]) => unknown
              : T extends Blueprint.Date ? Date : never;
  }

  export type TBlueprintConvertType<T> =
    T extends StringType ? string
      : T extends NumberType ? number
        : T extends BooleanType ? boolean
          : T extends ArrayType<T> ? Array<T>
            : T extends FunctionType ? (...args: unknown[]) => unknown
              : T extends DateType ? Date : T;
}
