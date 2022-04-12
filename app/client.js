// 双方向通信接続
const socket = io();

// 初期ロードフラグ
let init = true

// データの受け取り
socket.on('event', function(status){

  // 南京錠の画像変更
  document.getElementById('status').innerHTML = status.slice(-1)[0].body ?
    '<img src="/images/unlock" alt="開いている時のアイコン" width="300" height="380" />' :
    '<img src="/images/lock" alt="閉まっている時のアイコン" width="300" height="380" />'

  // ログの生成
  const newState = (value) => {
    const element = document.getElementById('history')
    const li = document.createElement('li')

    // 日付のフォーマット
    const date = new Date(value.createdAt);

    // ゼロ埋め
    const zeroPadding = (date) => {
      return date.toString().padStart(2, "0")
    }

    // フォーマットされた日付の生成
    const formatDate = (date)=>{
      const formatted = date.getFullYear() + "-" + 
      zeroPadding((date.getMonth() + 1)) + "-" + 
      zeroPadding(date.getDate()) + "&nbsp;" + 
      zeroPadding(date.getHours()) + ":" + 
      zeroPadding(date.getMinutes()) + ":" + 
      zeroPadding(date.getSeconds());
      return formatted;
    }

    // HTMLの追加
    li.innerHTML = `
      <div class="card">
        <p>${formatDate(date)}</p>
        <div class="detail">
          <span class="status">${value.body ? "OPEN" : "CLOSE" }</span>
          <span class="circle" style="background-color: ${value.body ? "blue" : "red" }"></span>
        </div>
      </div>
    `
    element.prepend(li)
  }

  if(init){
    // 初期ロードなら複数ログを生成する
    status.map(value => newState(value))
    init = false
  } else {
    // 初期ロードでなければ単一ログを生成する
    newState(status.slice(-1)[0])
  }
})