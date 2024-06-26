<p align="center">
  <img src="./app/public/icon.png" width="160" alt="Logo" />
</p>

# OpenCloseLogger_pico：開閉状態管理アプリ

[![github license](https://shields.io/github/license/yumekiti/OC_Trial_Lesson)](https://licenses.opensource.jp/MIT/MIT.html)
![npm version](https://img.shields.io/node/v/express?style=flat)
![pypi version](https://img.shields.io/pypi/v/pyserial.svg?style=flat)
![github languages](https://shields.io/github/languages/count/yumekiti/OC_Trial_Lesson)
![github downloads](https://shields.io/github/downloads/yumekiti/OC_Trial_Lesson/total)

<br>

# 仕組み

<img src="markdown/images/system-1.svg" alt="system" />

シリアル通信で開閉状態の情報を受け取り表示しています

<br><br>

# 開発手順

バックエンドからフロントエンドを動かしているので<br>
まずはバックエンドから開発していきましょう！

## [バックエンド開発](./markdown/back-end.md)

---

<br>

バックエンドができたら次はフロントエンド開発しよう！

## [フロントエンド開発](./markdown/front-end.md)

---

<br>

最後にセンサーを反映できるようにしよう！

## [組み込みシステム開発](./markdown/system.md)

---

<br><br>

# 使い方

## Docker

```sh
$ make up
```

## Node.js

```sh
$ cd app
$ npm install
$ node ./app.js
```

## EXE

/app で `npm install` を実行し .exe を同じフォルダに入れ .exe を起動するだけです。<br>
/app に node_modules がある場合は `npm install` 無しで起動できます。

```sh
$ ./*.exe
```

## Python

```sh
# packages install
$ pip install pyserial requests
```

```sh
$ python ./python/host/main.py
```

<br><br>

# リポジトリ

https://github.com/yumekiti/Open_Close_Logger/

# 制作者

[@yumekiti1204](https://twitter.com/yumekiti1204)

# License

This is [MIT license](https://en.wikipedia.org/wiki/MIT_License).
