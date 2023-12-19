declare module 'estorage' {
  import estorage from 'estorage';

  class Map<V> extends global.Map<string, V> { }
}
