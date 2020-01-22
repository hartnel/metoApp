import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';


export function migrationFactory() {
  return {
    1: (db, transaction) => {
      const store = transaction.objectStore("location");
      store.createIndex('postcode', 'postcode', { unique: true });
    },
  };
}

export const dbConfig: DBConfig = {
  name: 'MeteoDatabase10',
  version: 3,
  objectStoresMeta: [{
    store: 'user',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'lastname', keypath: 'lastname', options: { unique: false } },
      { name: 'firstname', keypath: 'firstname', options: { unique: false } },
      { name: 'sex', keypath: 'sex', options: { unique: false } },
      { name: 'birthday', keypath: 'birthday', options: { unique: false } },
      { name: "profile", keypath: "profile", options: { unique: false, } }
    ]
  },
  {
    store: 'location',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'country', keypath: 'country', options: { unique: false } },
      { name: 'region', keypath: 'region', options: { unique: false } },
      { name: 'longitude', keypath: 'longitude', options: { unique: false } },
      { name: "latitude", keypath: "lotitude", options: { unique: false } },
      { name: "postcode", keypath: "postcode", options: { unique: true, } },
      { name: "street", keypath: "street", options: { unique: false, } },
      { name: "key", keypath: "key", options: { unique: true, } },
    ]
  }
  ],
  migrationFactory
};
