import mongoose from 'mongoose'

mongoose.Promise = global.Promise

//  スキーマの作成
const ListSchema = new mongoose.Schema({
  id: Number,
  goodsName: String,
  url: String,
  price: Number,
  img: String,
  editing: Boolean,
})

// モデルの作成
// mongoose.modelの第一引数の複数形の名前（今回だと'Lists'）のコレクションが生成される
const List = mongoose.model('List', ListSchema)

// モデルをexport
export default List