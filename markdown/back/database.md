### [戻る](./../back-end.md)

# SQLite を使いデータを登録してみよう

SQLite はサーバとして動作させるのではなく単独のアプリケーションとして動作させることが可能な関係データベース管理システム (RDBMS) です。

<br>

# 課題

- データを追加してみて反映されたか確認する
- 更新してもデータが消えないか確認する

<br>

## http://localhost:8080/test.html

<br><br>

[/app/app.js](../../app/app.js)

```js
// 新しい状態データの作成
db.prepare("INSERT INTO status(body) VALUES (?)").run(status).finalize();
```

---

<br><br>

## 参考リンク

- https://www.dbonline.jp/sqlite/
- https://ja.wikipedia.org/wiki/SQLite
