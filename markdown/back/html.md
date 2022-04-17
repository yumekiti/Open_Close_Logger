## HTMLを返してみよう

/app/app.js
```diff
// HTMLを返す
app.get("/", (req, res) => {
+  res.sendFile(__dirname + "/index.html");
-  res.send("Hello, World !");
});
```

/app/index.html
```html
<h1>Hello, World!!</h1>
```

以下リンクに`Hello, World!!`と表示される

http://localhost:8080

### 参考リンク
- https://jsprimer.net/use-case/ajaxapp/entrypoint/