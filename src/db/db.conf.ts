import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';




export function migrationFactory() {
  return {
    1: (db, transaction) => {
      const store = transaction.objectStore("user");
      store.createIndex('username', 'username', { unique: true });
    },
  };
}

export const dbConfig: DBConfig = {
  name: 'MeteoDb',
  version: 1,
  objectStoresMeta: [{
    store: 'user',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'username', keypath: 'username', options: { unique: true } },
      { name: 'lastname', keypath: 'lastname', options: { unique: false } },
      { name: 'firstname', keypath: 'firstname', options: { unique: false } },
      { name: 'sex', keypath: 'sex', options: { unique: false } },
      { name: 'birthday', keypath: 'birthday', options: { unique: true } },
      { name: "password", keypath: "password", options: { unique: false } },
      { name: "locations", keypath: "locations", options: { unique: false } },
      { name: "profile", keypath: "profile", options: { unique: false , } }
    ]
  }],
  migrationFactory
};