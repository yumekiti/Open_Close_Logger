## [HTMLをコーディングしてみよう](./../front-end.md)

/app/index.html
```html
<!DOCTYPE html>
<html>
<head>
    <title>OC_trial_Lesson</title>
    <script src="/socket.io/socket.io.js"></script>
    <script src="/client.js"></script>
    <link rel="stylesheet" type="text/css" href="/style.css">
</head>
<body>
  <header>
    <h2>OC_trial_Lesson</h2>
  </header>

  <div class="main">
    <div class="split-item split-left">
      <div class="split-left__inner">
        <span id="status"></span>
      </div>
    </div>
    <div class="split-item split-right">
      <div class="split-right__inner">
        <ul id="history"></ul>
      </div>
    </div>
  </div>
</body>
</html>
```