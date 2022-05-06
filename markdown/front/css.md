### [戻る](./../front-end.md)

# CSS をコーディングしてみよう

<br>

/app/public/css/style.css

```css
@import url(https://fonts.googleapis.com/css?family=Roboto);

/* global */
* {
  font-family: "Roboto";
  list-style: none;
  font-size: 16px;
}

h1 {
  font-size: 24px;
}

html {
  background-color: #fafcff;
}

body {
  height: 100%;
  margin: 0;
  padding: 0;
}

header {
  background-color: #fff;
  height: 60px;
  width: 100%;
  box-shadow: 2px 2px 8px 1px rgba(220, 220, 220, 0.4);
}

header .icon {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid {
  display: grid;
  gap: 5%;
  margin: 0 10%;
  margin-top: 40px;
  grid-template-columns: repeat(12, 1fr);
}

.grid div {
  grid-column: 6 span;
}

.card {
  background-color: #fff;
  box-shadow: 2px 2px 8px 1px rgba(220, 220, 220, 0.4);
  border-radius: 3px;
}

.card-fit {
  width: max-content;
  background-color: #fff;
  box-shadow: 2px 2px 8px 1px rgba(220, 220, 220, 0.4);
  border-radius: 3px;
}

/* title */
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 160px;
}

.title h1 {
  padding-top: 3px;
}

.title img {
  margin-right: 8px;
}

/* clock */
#now {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 8px;
  padding: 2% 1%;
}

#now h1 {
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
}

/* position */
.position-title {
  margin-top: 24px;
}

.position {
  margin-top: 16px;
}

.position div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 1%;
}

.position h1 {
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 41px;
}

.position h1 + h1 {
  margin-left: 87px;
}

/* status */
.status {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.status div {
  padding: 5% 10%;
  display: flex;
  justify-content: center;
}

/* log */
.log-title {
  margin-bottom: 8px;
}

.log {
  position: relative;
  margin-bottom: 18px;
}

.log > div > div {
  padding: 1% 5%;
  display: flex;
}

.log > div > div > p {
  margin: 0 0;
  margin-top: 10px;
  color: #cdcdcd;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
}

.log > div > div > p + p {
  margin-left: 16px;
}

.log-status {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
}

.log div > h1 {
  margin: 0;
  margin-bottom: 10px;
}

.log-status > h2 {
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  margin-left: 12px;
}
```

<br><br>

# 課題

- html の`background-color`の値を変更して自分好みの色に変えてみよう

<br>

## http://localhost:8080

---

<br><br>

## 参考リンク

- https://developer.mozilla.org/ja/docs/Web/CSS
