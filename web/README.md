<p align="center" style="color: #343a40">
  <img src="./public/images/creatorsstudio.jpeg" alt="creators logo" height="150" width="150">
  <h1 align="center">Shiritori App</h1>
</p>

## Description

TBU

## Demo

## Usage

## Install

1. Install dependencies

```
$ npm install
```

2. Run the app locally

```
$ npm run dev
```

## Licence

TBU

## Author
Creators Studio

## ファイル構成
`src/pages`
ページ全体を表現するためのコンポーネントです。
1 ページ 1 ディレクトリ

e.g.) ホーム画面 -> src/pages/Home
ほぼ DOM を記述するだけのコンポーネントファイル (.tsx) と、データ取得やその他計算などのロジックファイル (hooks.ts) に分けています。
ロジックがほぼ無いような画面はコンポーネントファイルのみでOKです！（例: Home）

`src/reducers`
決められたスコープの状態 (State) と状態変更関数 (Action) 、それをまとめる Reducer で構成されています。
決められたスコープとは、今回の場合はページを示しています。

e.g.) Play画面の reducer -> src/reducers/play.ts
Play画面で現状の一番おしりの単語を、lastWord というデータを状態として定義しています。そしてその状態を更新する (setLastWord) 関数を定義します。

`src/hooks`
ページをまたいで色々なところで使用する可能性があるhooksを定義しています。

