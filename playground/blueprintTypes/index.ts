declare module 'estorage' {
  namespace Blueprint {
    class String extends global.String {
      static blueprintName: 'String';
    }
    class Map<V> extends global.Map<string, V> { }
    class Number extends global.Number {
      static blueprintName: 'Number';
    }
    class Boolean extends global.Boolean {
      static blueprintName: 'Boolean';
    }
    class Array<T> extends global.Array<T> { }
    class Object extends global.Object { }
    class Function extends global.Function {
      static blueprintName: 'Function';
    }
    class Date extends global.Date {
      static blueprintName: 'Date';
    }
  }
}
