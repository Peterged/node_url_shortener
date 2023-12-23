declare module 'estorage' {
  type DefaultTypeKey = 'type';

  type IsItRecordAndNotAny<T> = IfEquals<
  T,
  unknown,
  false,
  T extends Record<unknown, unknown> ? true : false>;

  /**
 * @summary Checks if two types are identical.
 * @param {T} T The first type to be compared with {@link U}.
 * @param {U} U The seconde type to be compared with {@link T}.
 * @param {Y} Y A type to be returned if {@link T} &  {@link U} are identical.
 * @param {N} N A type to be returned if {@link T} &  {@link U} are not identical.
 */
type IfEquals<T, U, Y = true, N = false> =
(<G>() => G extends T ? 1 : 0) extends
(<G>() => G extends U ? 1 : 0) ? Y : N;

type IsPathDefaultUndefined<PathType> = PathType extends { default: undefined } ?
  true :
  PathType extends { default: (...args: unknown[]) => undefined } ?
    true :
    false;

type IsPathRequired<P, TypeKey extends string = DefaultTypeKey> =
  P extends {
    required:
    | true
    | [true, string | undefined]
    | { isRequired: true } }
  | ArrayConstructor
  | unknown[]
    ? true
    : P extends { required: boolean }
      ? P extends { required: false }
        ? false
        : true
      : P extends (Record<TypeKey, ArrayConstructor | unknown[]>)
        ? IsPathDefaultUndefined<P> extends true
          ? false
          : true
        : P extends (Record<TypeKey, unknown>)
          ? P extends { default: unknown }
            ? IfEquals<P['default'], undefined, false, true>
            : false
          : false;

/**
 * @summary A Utility to obtain schema's required path keys.
 * @param {T} T A generic refers to document definition.
 * @param {TypeKey} TypeKey A generic of literal string type.
 * "Refers to the property used for path type definition".
 * @returns required paths keys of document definition.
 */
type RequiredPathKeys<T, TypeKey extends string = DefaultTypeKey> = {
  [K in keyof T]: IsPathRequired<T[K], TypeKey> extends true ?
    IfEquals<T[K], unknown, never, K> : never;
}[keyof T];

type OptionalPathKeys<T, TypeKey extends string = DefaultTypeKey> = {
  [K in keyof T]: IsPathRequired<T[K], TypeKey> extends true ? never : K;
}[keyof T];

}
