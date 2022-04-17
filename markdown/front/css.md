## CSSをコーディングしてみよう

/app/style.css
```css
@import url(https://fonts.googleapis.com/css?family=Roboto);

* {
  font-family: "Roboto";
  list-style: none;
  font-size: 22px;
}

body {
  height: 100%;
  margin: 0;
  padding: 0;
}

header {
  position: fixed;
  background-color: black;
  width: 100%;
}

header h2 {
  margin-left: 40px;
  color: white;
}

.main {
  display: table;
  width: 100%;
}

.split-item {
  display: table-cell;
  width: 50%;
}

.split-left {
  top: 30%;
  left: 0;
  height: 100%;
  position: absolute;
  text-align: center;
}

.split-left__inner {
  height: 100%;
  width: 50%;
  position: fixed;
}

.split-right__inner{
  margin-top: 180px;
  text-align: center;
}

.card {
  color: #333;
  width: 80%;
  padding: 0.3em 0.8em;
  margin: 0 auto;
  margin-bottom: 30px;
  box-shadow: 2px 2px 4px gray;
  box-sizing: border-box;
  border: 0.5px solid #e9eaea;
  border-radius: 10px;
  text-align: left;
  padding-left: 50px;
  padding-bottom: 20px;
}

.status {
  padding: 0 0.3em;
  font-size: 0.6em;
  color: #777;
}

.detail {
  display: flex;
  justify-content: space-between;
}

.circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}
```