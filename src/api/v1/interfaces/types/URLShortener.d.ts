// import { UUID } from "crypto"

type URLShortenerType = {
  shortenUrl: (url: string) => string;
  redirect: (shortUrl: string) => string | void;
  // getStats: (shortUrl: string) => object | undefined,
  deleteUrl: (shortUrl: string) => void;
  customizeAlias: (shortUrl: string, alias: string) => boolean;
  updateLongUrl: (shortUrl: string, newLongUrl: string) => boolean;
  listUrls: () => object[] | undefined;
  searchUrls: (query: string) => object[] | undefined;
  // configure(options: URIConfig) => void,
};

declare namespace MyTypes {
  export type AddRequired<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: Type[Property];
  };
}

export default IURLShortener;
