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
    "-" +
    zeroPadding(date.getMonth() + 1) +
    "-" +
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

// ログの生成
const newState = (value) => {
  const element = document.getElementById("logs");
  const name = document.getElementById("name");
  const div = document.createElement("div");

  // 日付のフォーマット
  const date = new Date(value.created_at);

  // HTMLの追加
  div.innerHTML = `
    <div class="history">
      <div class="card">
        <div class="history-date">
          <p class="date">${formatDate(date)}</p>
          <p class="time">${formatTime(date)}</p>
        </div>
        <div class="history-position">
          <h1>${name.textContent}</h1>
        </div>
        <div class="history-status">
          ${
            value.body
              ? "<img src='images/close.svg' width='24' height='26.5' alt='close' />"
              : "<img src='images/open.svg' width='24' height='26.5' alt='open' />"
          }
          <h1>${value.body ? "OPEN" : "CLOSE"}</h1>
        </div>
      </div>
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
    ? "<img src='images/close.svg' width='122' height='136' alt='close' />"
    : "<img src='images/open.svg' width='122' height='136' alt='open' />";
});
