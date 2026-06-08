## 📖 Giới thiệu

React Quiz Application là một dự án Frontend được phát triển bằng ReactJS sử dụng Create React App. Ứng dụng cho phép người dùng trả lời các câu hỏi trắc nghiệm, nhận phản hồi ngay sau khi chọn đáp án và xem kết quả tổng kết sau khi hoàn thành bài kiểm tra.

Dự án được xây dựng nhằm mục đích:

- Thực hành React Components
- Làm quen với State và Props
- Xử lý sự kiện trong React
- Thực hành Conditional Rendering
- Thiết kế giao diện người dùng bằng CSS

---

## ✨ Tính năng

### 📝 Hệ thống câu hỏi trắc nghiệm

- Hiển thị từng câu hỏi riêng biệt
- Mỗi câu hỏi gồm nhiều đáp án lựa chọn
- Kiểm tra đáp án đúng/sai tự động

### 📊 Thanh tiến trình

- Hiển thị số câu hỏi hiện tại
- Theo dõi tiến độ làm bài bằng Progress Bar
- Cập nhật theo thời gian thực

### ✅ Phản hồi tức thì

Sau khi chọn đáp án:

- Hiển thị đáp án đúng bằng màu xanh
- Hiển thị đáp án sai bằng màu đỏ
- Thông báo kết quả ngay lập tức

### ⏱️ Chuyển câu hỏi tự động

- Sau khi hiển thị phản hồi
- Hệ thống tự động chuyển sang câu hỏi tiếp theo sau 1.2 giây

### 🏆 Tính điểm tự động

- Cộng điểm khi trả lời đúng
- Hiển thị tổng điểm cuối bài

### 📈 Thống kê kết quả

Sau khi hoàn thành bài kiểm tra:

- Tổng số câu đúng
- Tỷ lệ phần trăm chính xác
- Đánh giá kết quả theo mức độ

### 🔄 Chơi lại

- Nút "Play Again"
- Khởi động lại toàn bộ bài quiz

### 📋 Chia sẻ kết quả

- Sao chép kết quả vào Clipboard
- Dễ dàng chia sẻ với người khác

---



## 📂 Cấu trúc thư mục

```text
project-root/
│
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── index.js
│   ├── index.css
│   ├── QuizApp.js
│   ├── QuizApp.css
│   ├── Question.js
│   └── Score.js
│
├── package.json
├── README.md
└── .gitignore
```

---

## 🧩 Kiến trúc Component

### 1. QuizApp Component

**File:** `src/QuizApp.js`

Là component chính của ứng dụng.

#### Chức năng

- Quản lý State
- Lưu danh sách câu hỏi
- Theo dõi điểm số
- Điều khiển luồng hoạt động của Quiz

#### State

```javascript
{
  questions: [],
  currentQuestion: 0,
  score: 0,
  quizEnd: false,
  selectedAnswer: null,
  feedback: null
}
```

---

### 2. Question Component

**File:** `src/Question.js`

#### Chức năng

- Hiển thị câu hỏi
- Hiển thị đáp án
- Hiển thị tiến trình làm bài
- Hiển thị phản hồi đúng/sai

#### Props

```jsx
<Question
  data={question}
  onAnswer={handleAnswer}
  questionNumber={1}
  total={10}
  selectedAnswer={selectedAnswer}
  feedback={feedback}
/>
```

---

### 3. Score Component

**File:** `src/Score.js`

#### Chức năng

- Hiển thị kết quả cuối cùng
- Tính phần trăm chính xác
- Hiển thị đánh giá
- Chơi lại bài quiz
- Chia sẻ kết quả

---

## 🔄 Luồng hoạt động

```text
Khởi động ứng dụng
        │
        ▼
Hiển thị câu hỏi
        │
        ▼
Người dùng chọn đáp án
        │
        ▼
Kiểm tra đáp án
        │
 ┌──────┴──────┐
 │             │
 ▼             ▼
Đúng         Sai
 │             │
 ▼             ▼
Cộng điểm   Không cộng điểm
 │             │
 └──────┬──────┘
        ▼
Hiển thị phản hồi
        ▼
Chuyển câu tiếp theo
        ▼
Hết câu hỏi?
        │
 ┌──────┴──────┐
 │             │
 No           Yes
 │             │
 ▼             ▼
Tiếp tục   Hiển thị kết quả
```

---


## 👨‍💻 Tác giả - me
**Student Project - React Quiz Application**

Dự án được xây dựng nhằm mục đích học tập và thực hành ReactJS.

