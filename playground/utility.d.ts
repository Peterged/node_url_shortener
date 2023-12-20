declare module 'estorage' {
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


}
