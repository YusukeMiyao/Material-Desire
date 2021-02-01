# [Material Desire](https://material-desire-c5ada.web.app/)

## どんなアプリ?

- ほしい物リスト
- ドラッグ&ドロップによる、視覚的に欲しい物の順位付けが可能

### Demo

- [youtube で見る](https://youtu.be/mWZBJO5Ju50)

### Features

- SNS による新規登録・ログイン(firebase/Authentication)
- ゲストログイン
- ルーティング機能(react-router-dom)
- 欲しい物の追加・編集・削除(firebase/Realtime Database,Storage)
- 追加した欲しい物のドラッグ&ドロップ(react-beautiful-dnd)
- 一番欲しいリストに入っている欲しい物の総額
- リストタイトル編集
- 詳細機能
- 画像のスワイプ(Swiper)
- バリデーションチェック
- 画像アップロード後の圧縮(firebase/Resize Images) etc...

## How to start

### front

1. `git clone https://github.com/YusukeMiyao/Material-Desire.git`
1. `cd client`
1. `touch .env`
1. 下記\*のシークレット箇所を firebase コンソールで確認し、.env を編集
   `REACT_APP_FIREBASE_KEY=******************** REACT_APP_FIREBASE_DOMAIN=******************** REACT_APP_FIREBASE_DATABASE=******************** REACT_APP_FIREBASE_PROJECT_ID=******************** REACT_APP_FIREBASE_STORAGE_BUCKET=******************** REACT_APP_FIREBASE_SENDER_ID=******************** REACT_APP_FIREBASE_APP_ID=******************** REACT_APP_FIREBASE_MEASUREMENT_ID=********************`

1. `npm install`
1. `npm start`
1. `http://localhost:3000/`にアクセス

## 展望

- ネイティブアプリにする
- EC サイトの商品ページから追加できるようにする etc...順次拡大
