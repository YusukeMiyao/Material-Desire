# ToDoList

## How to start

### server & DB
1. `npm install`
1. `mongod --config /usr/local/etc/mongod.conf`
1. 別タブに移動し、`npm start`

### front
1. `cd client`
1. `npm install`
1. `npm start`
1. `http://localhost:3000/`にアクセス

## 開発ルール

1. 自分の開発する機能に対応する issue を立てる。

1. ローカルで`develop`ブランチに`checkout`。

1. リモートの変更を反映するため、**必ずプルする**。

    - `git pull origin develop`

1. issue に対応したブランチを切る。

    - ブランチの命名
      - まず`feature`（機能追加）, `fix`（バグ修正）, `hotfix` （致命的なバグの修正）など、そのブランチで行う作業の概要を書く。
      - "/" で区切り、詳細な説明をハイフン区切りで記述。
      - "_"で区切り、issue番号を追加。

      例

      > about/detail-description-of-function_issue00

    - コミットは細かく。細かい変更目的毎にコミットすること。

    - コミットメッセージの書き方

      - 一行目に概要。まず`ADD`, `DELETE`, `FIX`, `IMPROVE`など、そのコミットで行った作業を書く。
      - ":"で区切り、詳細を書き足す。
      - （もしあれば）二行目にTODOを書く。メモ代わり。
      - 最終行には "#00" の形で対応するissue番号を下記。

      書き方

      > ABOUT: write about your development
      >
      > TODO(optional): write about your (or someone's) to-do
      >
      > #00 (issue number)

       具体例
      > MODIFY: encoding of output csv of prediction
      >
      > TODO(optional): encoding of output accuracy
      >
      > #124

1. issue で書いた内容を必要十分に開発できたら、適切なブランチに対して（だいたいは`develop`）マージする。
