## [CSS, client.js, 画像を返してみよう](./../back-end.md)
やり方はHTMLと同じなので考えてコーディングしてみよう

/app/app.js
```js
// HTMLを返す
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// CSSを返す
app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

// client.jsを返す
app.get("/client.js", (req, res) => {
  // ここに入力

});

// 画像を返す
app.get("/images/lock", (req, res) => {
  // ここに入力

});
app.get("/images/unlock", (req, res) => {
  // ここに入力
  
});

// サーバーの実行
http.listen(PORT, () => {
  console.log("server listening. Port:" + PORT);
});
```