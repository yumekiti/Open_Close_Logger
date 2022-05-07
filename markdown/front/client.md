### [戻る](./../front-end.md)

# client.js をコーディングしてみよう

<br>

/app/public/js/client.js

```js
// モジュールの読み込み
const socket = io();

// ゼロ埋め
const zeroPadding = (date) => {
  return date.toString().padStart(2, "0");
};

// フォーマットされた日付の生成
const formatDate = (date) => {
  const formatted =
    date.getFullYear() +
    "/" +
    zeroPadding(date.getMonth() + 1) +
    "/" +
    zeroPadding(date.getDate());
  return formatted;
};

// フォーマットされた日付の生成
const formatTime = (date) => {
  const formatted =
    zeroPadding(date.getHours()) +
    ":" +
    zeroPadding(date.getMinutes()) +
    ":" +
    zeroPadding(date.getSeconds());
  return formatted;
};

// 現在時刻
const setTime = () => {
  const date = new Date();
  const now = document.getElementById("now");

  now.innerHTML = `
    <h1>${formatDate(date)}</h1>
    <h1>${formatTime(date)}</h1>
  `;
};

// ログの生成
const newState = (value) => {
  const element = document.getElementById("logs");
  const name = document.getElementById("name");
  const div = document.createElement("div");
  div.className = "log";

  // 日付のフォーマット
  const date = new Date(value.created_at);

  // HTMLの追加
  div.innerHTML = `
    <div class="card">
      <div>
        <p>${formatDate(date)}</p>
        <p>${formatTime(date)}</p>
      </div>
      <div>
        <h1>${name.textContent}</h1>
      </div>
      <div class="log-status">
      ${
        value.body
          ? "<img src='images/open.svg' width='24' height='26.5' alt='open' />"
          : "<img src='images/close.svg' width='24' height='26.5' alt='close' />"
      }
      <h2>${value.body ? "OPEN" : "CLOSE"}</h2>
    </div>
  `;
  element.prepend(div);
};

// データの受け取ったとき
socket.on("event", (status) => {
  // 最新の状態を入れる用
  let latest;

  // 初期ロードかどうか
  if (Array.isArray(status)) {
    // 最新の状態を入れる
    latest = status.slice(-1)[0].body;
    // 複数ログを生成
    status.map((value) => newState(value));
  } else {
    // 最新の状態を入れる
    latest = status.body;
    // 単一ログを生成
    newState(status);
  }

  // 最新の状態の画像に変更
  document.getElementById("status").innerHTML = latest
    ? "<img src='images/open.svg' width='122' height='136' alt='open' />"
    : "<img src='images/close.svg' width='122' height='136' alt='close' />";
});

setInterval(() => {
  setTime();
}, 1000 / 60);

window.addEventListener("unload", (e) => {
  window.scroll({ top: 0 });
});
```

<br><br>

# 課題

- デベロッパーツールのコンソール(console)にエラーが出ていないか確認する
  - ショートカットキー（Ctrl + Shift + i）
- /app/client.js の一番上に`console.log("hello, console!");`と追加してコンソールに表示されるか確認する


<br>

## http://localhost:8080

---

<br><br>

## 参考リンク

- https://www.javadrive.jp/javascript/dom/index20.html
- https://developer.mozilla.org/ja/docs/Web/JavaScript
