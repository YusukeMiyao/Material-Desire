import Dexie from "dexie";

const db_constants = {
  name: "mydb",
  version: 1,
};
const store_constants = {
  name: "images",
  indexes: "++id, name, data",
};

class DB {
  constructor() {
    const db = new Dexie(db_constants.name);
    db.version(db_constants.version).stores({
      [store_constants.name]: store_constants.indexes,
    });
    this.db = db;
  }
  // 全件取得する
  getAll() {
    return this.db[store_constants.name].toArray();
  }
  // 1行追加する。成功したとき、idを返す。
  add(image) {
    return this.db[store_constants.name].add(image);
  }
  // 1行削除する。
  delete(key) {
    return this.db[store_constants.name].delete(key);
  }
}

export default new DB();
