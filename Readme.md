<p align="center">
  <img src="./markdown/image/icon.png" width="100" alt="Logo" />
</p>

OpenCloseLogger (mini)
===

[![github license](https://shields.io/github/license/yumekiti/OC_Trial_Lesson)](https://licenses.opensource.jp/MIT/MIT.html)
![npm version](https://img.shields.io/node/v/express?style=flat)
![pypi version](https://img.shields.io/pypi/v/pyserial.svg?style=flat)
![github languages](https://shields.io/github/languages/count/yumekiti/OC_Trial_Lesson)
![github downloads](https://shields.io/github/downloads/yumekiti/OC_Trial_Lesson/total)

<br>

# 概要

開閉状態管理アプリケーションです。

# 仕組み

シリアル通信で開閉状態の情報を受け取り表示しています。

<br><br><br>

# 開発手順

バックエンドからフロントエンドを動かしているので<br>
まずはバックエンドから開発していきましょう！

## [バックエンド開発へ（ここをクリック）](./markdown/back-end.md)

---

<br>

バックエンドができたら次はフロントエンド開発しよう！

## [フロントエンド開発（ここをクリック）](./markdown/front-end.md)

---

<br>

最後にセンサーを反映できるようにしよう！

## [組み込みシステム開発（ここをクリック）](./markdown/system.md)

---

<br><br><br>

# 開発環境

- Node.js
  - https://nodejs.org/ja/
- Python
  - https://www.python.org/
- Visual Studio Code
  - https://azure.microsoft.com/ja-jp/products/visual-studio-code/

# 使用デバイス

- Raspberry Pi Pico
  - https://www.raspberrypi.com/products/raspberry-pi-pico/

<br><br><br>

# 使い方

## Docker

```sh=
$ make up
```

# Node.js

## パッケージインストール

```sh=
$ cd app
$ npm install
```

## 起動

```sh=
$ node ./app/app.js
```

## EXE

.exeを起動するだけで動きます。

```sh
$ ./*.exe
```

<br><br><br>

# 制作者

[@yumekiti1204](https://twitter.com/yumekiti1204)

# License

This is [MIT license](https://en.wikipedia.org/wiki/MIT_License).