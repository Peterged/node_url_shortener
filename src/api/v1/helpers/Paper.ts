declare module 'elstorage' {
  import elstorage from 'elstorage';

  class Paper<T = any> {
    constructor(doc?: any); 

    _id?: T;
  }
}
      