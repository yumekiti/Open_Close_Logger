// コンソールに表示
console.log("hello, console!");

// HTMLの要素を取得
const nowElement = document.getElementById("now");
const historyElement = document.getElementById("history");
const itemsElement = document.getElementById("items");

// itemの状態を保持
let items = [];
let historyPosition = "";

// モジュールの読み込み
const socket = io();

// ゼロ埋め
const zeroPadding = (date) => date.toString().padStart(2, "0")

// フォーマットされた日付の生成
const formatDate = (date) => {
  return `${zeroPadding(date.getMonth() + 1)}/${zeroPadding(date.getDate())}`
}

// フォーマットされた時刻の生成
const formatTime = (date) => {
  return `${zeroPadding(date.getHours())}:${zeroPadding(date.getMinutes())}`
}

// 現在時刻
const setTime = () => {
  const currentDate = new Date();
  nowElement.innerHTML = `
    <p>${formatDate(currentDate)}</p>
    <p>${formatTime(currentDate)}</p>
  `;
};

// ログの生成
const setHistory = (value) => {
  const date = new Date(value.created_at);
  const bgColor = value.status ? "bg-sky-100" : "bg-red-100";

  // HTMLの追加
  const historyHTML = `
    <div class="flex shadow-md rounded-md p-4 items-center justify-around bg-white ${bgColor}">
      <div class="w-full flex flex-col justify-center items-center text-2xl">
        <span>場所 - ${value.position}</span>
        <span>${formatDate(date)} ${formatTime(date)}</span>
      </div>
      <span class="flex justify-center items-center w-full">
        ${value.status ? "🔓" : "🔒"}
      </span>
    </div>
  `;
  historyElement.insertAdjacentHTML("afterbegin", historyHTML);

  twemoji.parse(document.body);
};

// 一部のHistoryを表示
const handleClickHistory = (position) => {
  historyPosition = position; // 履歴の位置を保持
  historyElement.innerHTML = ""; // 初期化

  // アイテムをフィルタリングして表示
  items
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .reverse()
    .filter((value) => value.position === position).forEach((value) => {
      setHistory(value);
    }
  );
}

const setItems = (values) => {
  itemsElement.innerHTML = ""; // 初期化

  // 重複を削除し、アイテムを表示
  values
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .filter((value, index, self) => self.findIndex(v => v.position === value.position) === index)
    .forEach((value) => {
      const date = new Date(value.created_at);
      const diff = new Date() - date;
      const bgColor = diff < 600000 ? "bg-green-100" : "bg-white";

      itemsElement.innerHTML += `
        <button
          ${/* 10分以内に変更があれば緑、30分以内なら黄色、60分以内なら水色、それ以外は白 */ ""}
          class="flex flex-col shadow-md rounded-md p-4 items-center justify-center gap-2 hover:opacity-60 ${bgColor}"
          onclick="handleClickHistory('${value.position}')"
        >
          <span class="flex justify-center items-center w-full">
            ${value.status ? "🔓" : "🔒"}
          </span>
          <div class="flex flex-col justify-center items-center">
            <span>場所 - ${value.position}</span>
            <span>${formatDate(date)} ${formatTime(date)}</span>
          </div>
        </button>
      `;
    }
  );

  twemoji.parse(document.body);
}

// データの受け取ったとき
socket.on("event", (value) => {
  if (Array.isArray(value)) {
    // アイテムを更新
    items = value;
    setItems(items);
    // 履歴を表示
    value.map(value => setHistory(value))
  } else {
    items.push(value);
    setItems(items);
    // 履歴を表示
    if (historyPosition && value.position === historyPosition) {
      setHistory(value);
    } else if (!historyPosition) {
      setHistory(value);
    }
  }
});

// 時間を更新
setInterval(() => setTime(), 1000 / 60);

twemoji.parse(document.body);