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
    zeroPadding(date.getDate()) +
    "&nbsp;" +
    zeroPadding(date.getHours()) +
    ":" +
    zeroPadding(date.getMinutes()) +
    ":" +
    zeroPadding(date.getSeconds());
  return formatted;
};

// ログの生成
const newState = (value) => {
  const element = document.getElementById("history");
  const li = document.createElement("li");

  // 日付のフォーマット
  const date = new Date(value.created_at);

  // HTMLの追加
  li.innerHTML = `
    <div class="card">
      <p>${formatDate(date)}</p>
      <div class="detail">
        <span class="status">${value.body ? "OPEN" : "CLOSE"}</span>
        <span class="circle" style="background-color: ${
          value.body ? "blue" : "red"
        }"></span>
      </div>
    </div>
  `;
  element.prepend(li);
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
    ? "<img src='/images/unlock.png' alt='開いている時のアイコン' width='300' height='380' />"
    : "<img src='/images/lock.png' alt='閉まっている時のアイコン' width='300' height='380' />";
});
