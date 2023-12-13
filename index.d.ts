declare namespace MyTypes {
  export type AddRequired<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: Type[Property];
  };
}
