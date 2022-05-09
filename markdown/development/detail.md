### [戻る](./../process.md)

# 詳細設計

## テーブル定義

---

### status テーブル

| name       | type      | 用途            |
| ---------- | --------- | --------------- |
| id         | INTEGER   |                 |
| body       | BOOLEAN   | 開閉状態        |
| created_at | TIMESTAMP | 変更時間        |
| name_id    | INTEGER   | 外部キー(names) |

---

### names テーブル

| name        | type    | 用途                 |
| ----------- | ------- | -------------------- |
| id          | INTEGER |                      |
| body        | TEXT    | 名前                 |
| category_id | INTEGER | 外部キー(categories) |

---

### categories テーブル

| name | type    | 用途       |
| ---- | ------- | ---------- |
| id   | INTEGER |            |
| body | TEXT    | カテゴリ名 |

---

<br><br>

## デザイン

### 案 1

<img src="../images/design-1.png" alt="design-1" />

### 案 2

<img src="../images/design-2.png" alt="design-2" />

<br><br>

## 機能一覧

[機能一覧](./function.md)
