declare module 'elstorage' {
  import elstorage from 'elstorage';

  namespace ElTypes {
    interface ObjectIdInterface {
      _id: ThisParameterType;
    }

    class ObjectId {
      _id: string;
    }
  }

}
