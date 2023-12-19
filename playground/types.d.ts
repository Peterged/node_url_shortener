declare module 'estorage' {
  namespace Blueprint {

  }
    type StringType = string | Blueprint.String;
    type NumberType = number | Blueprint.Number;

    type AllType =
        | StringType
        | NumberType;
}
