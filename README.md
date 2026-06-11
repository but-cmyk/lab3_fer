# 📖 Hướng Dẫn Chi Tiết & Giải Thích Hoạt Động Ứng Dụng React Quiz

Dự án này là một ứng dụng trắc nghiệm đơn giản (Quiz Application) được viết bằng thư viện **ReactJS** (sử dụng Create React App). Tài liệu này được biên soạn nhằm giải thích cặn kẽ cách một ứng dụng web hoạt động chuyên sâu, vai trò của các file cấu hình và giải thích chi tiết **từng dòng code** trong dự án để giúp bạn nắm chắc kiến thức Frontend.

---

## 🌐 1. Cách Một Ứng Dụng Web Hoạt Động (Chuyên Sâu)

Để hiểu cách ứng dụng này chạy trên trình duyệt, chúng ta cần đi qua các khái niệm cốt lõi sau:

### 1.1. Kiến Trúc Client - Server
*   **Client (Trình duyệt của người dùng):** Gửi yêu cầu (Request) và nhận lại tài nguyên (HTML, CSS, JS, hình ảnh). Trình duyệt chịu trách nhiệm biên dịch và hiển thị mã nguồn thành giao diện trực quan cho người dùng tương tác.
*   **Server (Máy chủ):** Lưu trữ mã nguồn ứng dụng web. Khi nhận được yêu cầu từ Client, Server sẽ phản hồi (Response) bằng cách gửi các file tĩnh (HTML/CSS/JS) hoặc dữ liệu cần thiết.

### 1.2. Vòng Đời Request - Response & Quá Trình Render Trang Web
Khi bạn nhập một địa chỉ trang web hoặc chạy ứng dụng cục bộ (`localhost:3000`), các bước sau sẽ diễn ra:
1.  **Phân giải tên miền (DNS Lookup):** Trình duyệt tìm địa chỉ IP của máy chủ lưu trữ.
2.  **Bắt tay TCP (TCP Handshake) & Thiết lập SSL/TLS:** Khởi tạo kết nối an toàn giữa Client và Server.
3.  **HTTP Request & Response:** Client gửi lệnh `GET /` đến Server. Server trả về file HTML gốc (ở đây là file `public/index.html`).
4.  **Xây dựng DOM & CSSOM Tree:**
    *   Trình duyệt đọc file HTML để dựng cây **DOM (Document Object Model)** - cấu trúc phân cấp của các thẻ HTML.
    *   Trình duyệt đọc các file CSS để dựng cây **CSSOM (CSS Object Model)** - cấu trúc chứa thông tin định kiểu (styling).
5.  **Render Tree:** Kết hợp DOM và CSSOM để tạo ra Render Tree (chỉ chứa các phần tử sẽ thực sự hiển thị trên màn hình).
6.  **Layout (Reflow):** Tính toán vị trí và kích thước chính xác của từng phần tử trên màn hình.
7.  **Paint (Repaint):** Tô màu và vẽ các pixel lên màn hình (hiển thị giao diện hoàn chỉnh).

### 1.3. Cơ Chế Hoạt Động Của React: Single Page Application (SPA)
*   **Trang web truyền thống (Multi-Page Application - MPA):** Mỗi lần người dùng chuyển trang hoặc click vào một liên kết, trình duyệt phải gửi yêu cầu mới lên Server, Server dựng lại toàn bộ trang HTML mới và gửi về, khiến trang bị tải lại (reload) toàn bộ.
*   **Single Page Application (SPA):** 
    *   Trình duyệt chỉ tải **một file HTML duy nhất** (`public/index.html`) từ Server ngay trong lần tải đầu tiên. Trang HTML này ban đầu gần như trống rỗng (chỉ có một thẻ `<div id="root"></div>`).
    *   Đi kèm với HTML là một file JavaScript lớn (được bundle/đóng gói lại). 
    *   JavaScript sẽ nắm quyền điều khiển toàn bộ ứng dụng. Khi người dùng tương tác (ví dụ: chuyển từ câu hỏi này sang câu hỏi khác), JavaScript sẽ **tự động thay đổi cấu trúc DOM trực tiếp ngay tại Client** để hiển thị giao diện mới mà không cần yêu cầu Server gửi lại trang HTML mới. Nhờ đó, ứng dụng chạy cực kỳ mượt mà, không bị hiện tượng chớp nháy tải lại trang.

### 1.4. Virtual DOM (DOM Ảo) & Cơ Chế Reconciliation (Đối Soát)
Thao tác trực tiếp trên DOM thật của trình duyệt là một tác vụ rất chậm và tốn hiệu năng. Để tối ưu hóa, React sử dụng **Virtual DOM**:
1.  **Virtual DOM** là một bản sao nhẹ của DOM thật dưới dạng các đối tượng JavaScript (Object) nằm trong bộ nhớ.
2.  Khi **State** (trạng thái) của một component thay đổi (ví dụ: người dùng chọn đáp án và `selectedAnswer` được cập nhật):
    *   React sẽ tạo ra một cây Virtual DOM mới đại diện cho giao diện sau khi thay đổi.
    *   React chạy thuật toán so sánh (gọi là **Diffing Algorithm**) để đối chiếu cây Virtual DOM mới này với cây Virtual DOM cũ.
    *   Quá trình đối chiếu và tìm ra điểm khác biệt nhỏ nhất này được gọi là **Reconciliation**.
3.  Cuối cùng, React chỉ cập nhật những phần thực sự thay đổi lên DOM thật (chứ không vẽ lại toàn bộ trang). Ở ứng dụng này, khi sang câu hỏi mới, chỉ có nội dung câu hỏi, thanh tiến trình và các nút bấm được cập nhật lại, còn khung giao diện `.quiz-container` bên ngoài vẫn được giữ nguyên.

---

## 📂 2. Cấu Trúc Thư Mục Dự Án

```text
project-root/
│
├── public/                 # Thư mục chứa các tài nguyên tĩnh không qua xử lý của Webpack
│   ├── favicon.ico         # Icon hiển thị trên tab trình duyệt
│   ├── index.html          # File HTML duy nhất của ứng dụng (nơi React render giao diện vào)
│   ├── logo192.png         # Logo React kích thước 192x192
│   ├── logo512.png         # Logo React kích thước 512x512
│   ├── manifest.json       # File cấu hình cấu trúc khi cài đặt Web App (PWA)
│   └── robots.txt          # Cấu hình cho các công cụ tìm kiếm (SEO)
│
├── src/                    # Thư mục chứa mã nguồn React chính
│   ├── index.js            # Điểm khởi đầu của ứng dụng (Entry point)
│   ├── index.css           # CSS chung cho toàn bộ trang web
│   ├── QuizApp.js          # Component cha quản lý trạng thái chính của ứng dụng Quiz
│   ├── QuizApp.css         # CSS riêng cho giao diện Quiz
│   ├── Question.js         # Component con hiển thị câu hỏi và đáp án lựa chọn
│   └── Score.js            # Component hiển thị kết quả và điểm số cuối cùng
│
├── package.json            # File mô tả dự án và quản lý các thư viện phụ thuộc (Dependencies)
├── package-lock.json       # Khóa phiên bản chính xác của các thư viện phụ thuộc
├── .gitignore              # Định nghĩa các thư mục/file Git sẽ bỏ qua không upload lên GitHub
└── README.md               # Tài liệu hướng dẫn sử dụng và giải thích dự án (file này)
```

---

## ⚙️ 3. Giải Thích Chi Tiết 2 File Cấu Hình Dự Án

### 3.1. File `package.json`
`package.json` là trái tim của mọi dự án Node.js/React. Nó định nghĩa các thông tin cấu hình cơ bản, các tập lệnh (scripts) và các thư viện cần dùng.

*   `"name": "lab3"`: Tên của dự án.
*   `"version": "0.1.0"`: Phiên bản hiện tại của dự án.
*   `"private": true`: Ngăn chặn việc vô tình xuất bản dự án này lên kho chứa công cộng npm registry.
*   `"dependencies"`: Danh sách các thư viện mà dự án cần để chạy trong môi trường thực tế (production):
    *   `"react"` và `"react-dom"`: Thư viện ReactJS lõi để xây dựng component và render lên DOM của trình duyệt.
    *   `"react-scripts"`: Bộ công cụ đi kèm của Create React App chứa cấu hình Webpack, Babel giúp build, chạy và test ứng dụng mà không cần cấu hình thủ công.
*   `"scripts"`: Định nghĩa các phím tắt lệnh để chạy qua terminal (`npm run <tên_script>`):
    *   `"start"`: Chạy dự án ở chế độ phát triển (development) tại địa chỉ `http://localhost:3000`.
    *   `"build"`: Biên dịch và tối ưu hóa mã nguồn thành các file tĩnh (HTML/CSS/JS) đặt trong thư mục `build/` để sẵn sàng triển khai lên Server thực tế.
    *   `"test"`: Chạy các bài kiểm tra tự động (unit tests).
    *   `"eject"`: Đưa toàn bộ cấu hình ẩn của Webpack/Babel ra ngoài để tự tùy chỉnh (lưu ý hành động này không thể hoàn tác).

### 3.2. File `package-lock.json`
Khi bạn chạy lệnh `npm install`, npm sẽ đọc các thư viện trong `package.json`. Tuy nhiên, các phiên bản trong `package.json` thường có ký tự mũ `^` (ví dụ: `^19.2.7`), nghĩa là npm có thể tự động tải các phiên bản cập nhật nhỏ hơn khi cài đặt ở máy khác.

Để tránh lỗi không tương thích giữa các máy khác nhau:
*   `package-lock.json` được tạo ra tự động để **ghi nhận chính xác tuyệt đối phiên bản** của từng thư viện và tất cả các thư viện con phụ thuộc vào nó (dependency tree).
*   Nó đảm bảo rằng bất kỳ lập trình viên nào tải mã nguồn này về và chạy `npm install` cũng sẽ cài đặt chính xác cấu trúc thư mục `node_modules` giống hệt nhau, tránh lỗi "chạy được trên máy tôi nhưng lỗi trên máy người khác".

---

## 📝 4. Giải Thích Chi Tiết Từng Dòng Code Trong Dự Án

Dưới đây là phần mổ xẻ chi tiết từng dòng code trong tất cả các file của ứng dụng.

---

### 4.1. File `public/index.html`
Đây là bộ khung HTML duy nhất được trình duyệt tải về đầu tiên.

```html
1:  <!DOCTYPE html>
```
*   **Giải thích:** Khai báo kiểu tài liệu chuẩn HTML5 cho trình duyệt biết cách hiển thị trang web chính xác.

```html
2:  <html lang="en">
```
*   **Giải thích:** Thẻ mở của tài liệu HTML, thuộc tính `lang="en"` khai báo ngôn ngữ chính của trang web là tiếng Anh (giúp ích cho các công cụ đọc màn hình và SEO).

```html
3:    <head>
4:      <meta charset="utf-8" />
```
*   **Giải thích:** Thẻ `<head>` chứa siêu dữ liệu (metadata) của trang web. Dòng 4 đặt bảng mã ký tự là `utf-8` để hiển thị tốt tiếng Việt và các ký tự đặc biệt mà không bị lỗi font.

```html
5:      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```
*   **Giải thích:** Liên kết tới icon nhỏ hiển thị trên tab của trình duyệt. `%PUBLIC_URL%` là một biến đặc biệt trong Create React App, tự động thay thế bằng đường dẫn thư mục `public` khi build ứng dụng.

```html
6:      <meta name="viewport" content="width=device-width, initial-scale=1" />
```
*   **Giải thích:** Cấu hình Responsive. Thiết lập chiều rộng của trang web bằng với chiều rộng màn hình thiết bị (`width=device-width`) và tỷ lệ thu phóng ban đầu là 1.0 (`initial-scale=1`), giúp giao diện hiển thị đẹp trên điện thoại di động.

```html
7:      <meta name="theme-color" content="#000000" />
```
*   **Giải thích:** Xác định màu sắc chủ đạo của thanh địa chỉ trình duyệt trên một số thiết bị di động (ví dụ: Android).

```html
8:      <meta
9:        name="description"
10:       content="Web site created using create-react-app"
11:     />
```
*   **Giải thích:** Đoạn mô tả ngắn về trang web, hiển thị dưới tiêu đề trang trong kết quả tìm kiếm của Google (phục vụ SEO).

```html
12:     <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
13:     <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
```
*   **Giải thích:** Dòng 12 khai báo icon ứng dụng dành riêng cho thiết bị iOS (Apple). Dòng 13 liên kết tới file `manifest.json` chứa cấu hình PWA để người dùng có thể cài đặt web app này lên màn hình điện thoại như ứng dụng native.

```html
27:     <title>React App</title>
28:   </head>
```
*   **Giải thích:** Dòng 27 đặt tiêu đề hiển thị trên tab trình duyệt là "React App". Dòng 28 đóng thẻ `<head>`.

```html
29:   <body>
30:     <noscript>You need to enable JavaScript to run this app.</noscript>
```
*   **Giải thích:** Bắt đầu phần thân trang web (`<body>`). Dòng 30 hiển thị thông báo cảnh báo nếu người dùng tắt JavaScript trên trình duyệt của họ (vì ứng dụng React không thể chạy nếu thiếu JavaScript).

```html
31:     <div id="root"></div>
```
*   **Giải thích:** **ĐÂY LÀ DÒNG QUAN TRỌNG NHẤT.** Thẻ `div` trống này có thuộc tính `id="root"`. React sẽ tìm đến phần tử này và render (bơm) toàn bộ giao diện động được viết bằng JavaScript vào bên trong nó.

```html
32:     <!-- Các đoạn ghi chú thích thích hợp... -->
42:   </body>
43: </html>
```
*   **Giải thích:** Đóng thẻ thân (`<body>`) và thẻ tài liệu (`<html>`).

---

### 4.2. File `src/index.js`
Điểm khởi đầu (Entry Point) của phần mã nguồn JavaScript. Khi Webpack chạy build, nó sẽ bắt đầu đọc từ file này.

```javascript
1: import React from 'react';
```
*   **Giải thích:** Import thư viện React để có thể sử dụng các tính năng của React như JSX, Component.

```javascript
2: import ReactDOM from 'react-dom/client';
```
*   **Giải thích:** Import module `ReactDOM` phiên bản mới (từ thư mục `client`). Module này cung cấp các phương thức để tương tác trực tiếp và render component React vào DOM thật của trình duyệt.

```javascript
3: import QuizApp from './QuizApp';
```
*   **Giải thích:** Import component cha `QuizApp` từ file `./QuizApp.js` để chuẩn bị hiển thị nó lên trang web.

```javascript
5: const root = ReactDOM.createRoot(document.getElementById('root'));
```
*   **Giải thích:** Sử dụng hàm `document.getElementById('root')` để tìm thẻ `<div id="root">` trong file `index.html`. Sau đó, `ReactDOM.createRoot` khởi tạo một "gốc React" (React root) quản lý thẻ div này. Đây là cách bắt đầu ứng dụng của React 18+.

```javascript
6: root.render(
7:   <React.StrictMode>
8:     <QuizApp />
9:   </React.StrictMode>
10: );
```
*   **Giải thích:** Gọi phương thức `.render()` để vẽ giao diện vào thẻ root.
    *   `<React.StrictMode>`: Là một công cụ hỗ trợ của React trong quá trình phát triển (development). Nó không hiển thị gì lên giao diện nhưng giúp kiểm tra, cảnh báo các lỗi tiềm ẩn, các hàm đã bị lỗi thời (deprecated).
    *   `<QuizApp />`: Gọi component `QuizApp` đã import ở trên để hiển thị cấu trúc của nó.

---

### 4.3. File `src/index.css`
Định nghĩa phong cách CSS toàn cục cơ bản.

```css
1: body {
2:   margin: 0;
```
*   **Giải thích:** Reset margin của thẻ `<body>` về 0 để loại bỏ khoảng cách trống mặc định của trình duyệt ở các cạnh màn hình.

```css
3:   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
4:     'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
5:     sans-serif;
```
*   **Giải thích:** Khai báo danh sách font chữ ưu tiên. Trình duyệt sẽ quét từ trái qua phải, nếu hệ điều hành của máy người dùng có sẵn font nào thì sẽ dùng font đó để tối ưu hóa tốc độ tải (không cần tải thêm font từ mạng).

```css
6:   -webkit-font-smoothing: antialiased;
7:   -moz-osx-font-smoothing: grayscale;
8: }
```
*   **Giải thích:** Các thuộc tính giúp tối ưu hóa kết xuất chữ (font smoothing), làm cho chữ trông mượt mà, sắc nét hơn trên trình duyệt Webkit (Safari, Chrome) và Firefox.

```css
10: code {
11:   font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
12:     monospace;
13: }
```
*   **Giải thích:** Định dạng font chữ dạng monospace (khoảng cách các chữ bằng nhau) dành riêng cho các khối mã code (thẻ `<code>`).

---

### 4.4. File `src/QuizApp.js`
Component chính quản lý trạng thái, dữ liệu câu hỏi và logic chuyển đổi màn hình của bài trắc nghiệm. File này sử dụng **Class Component**.

```javascript
1: import React, { Component } from 'react';
2: import Question from './Question';
3: import Score from './Score';
4: import './QuizApp.css';
```
*   **Giải thích:** 
    *   Dòng 1: Import đối tượng `React` và lớp base `Component` để kế thừa và viết Class Component.
    *   Dòng 2 & 3: Import hai component con là `Question` (giao diện câu hỏi) và `Score` (giao diện kết quả).
    *   Dòng 4: Nhúng file định kiểu CSS dành riêng cho QuizApp.

```javascript
6: class QuizApp extends Component {
```
*   **Giải thích:** Khai báo lớp `QuizApp` kế thừa từ `Component` của React. Đây là cách định nghĩa một Class Component.

```javascript
7:   constructor(props) {
8:     super(props);
```
*   **Giải thích:** 
    *   Hàm `constructor` khởi tạo đối tượng khi component được tạo ra.
    *   `super(props)` là bắt buộc để gọi hàm khởi tạo của lớp cha (`Component`), giúp chúng ta có thể sử dụng `this.props` và các tính năng của React Class.

```javascript
9:     this.state = {
10:       questions: [
```
*   **Giải thích:** Khởi tạo **State** (trạng thái cục bộ) của component bằng một đối tượng JavaScript. `state` chứa dữ liệu có thể thay đổi trong quá trình chạy ứng dụng, khi `state` thay đổi, component sẽ tự động render lại. Mảng `questions` chứa danh sách 10 câu hỏi trắc nghiệm (mỗi câu gồm `id`, `question`, `options` và `answer` đúng).

```javascript
82:       currentQuestion: 0,
```
*   **Giải thích:** Chỉ số (index) của câu hỏi hiện tại trong mảng `questions`. Ban đầu là `0` (câu hỏi đầu tiên).

```javascript
83:       score: 0,
```
*   **Giải thích:** Điểm số hiện tại của người dùng (số câu trả lời đúng). Khởi đầu bằng `0`.

```javascript
84:       quizEnd: false,
```
*   **Giải thích:** Biến boolean xác định xem bài trắc nghiệm đã kết thúc chưa. Ban đầu là `false`.

```javascript
85:       selectedAnswer: null,
```
*   **Giải thích:** Lưu trữ đáp án mà người dùng đã bấm chọn cho câu hỏi hiện tại. Ban đầu là `null` (chưa chọn gì).

```javascript
86:       feedback: null
87:     };
88:   }
```
*   **Giải thích:** Lưu trạng thái phản hồi sau khi chọn đáp án, nhận giá trị `'correct'` (đúng), `'wrong'` (sai) hoặc `null` (chưa chọn). Dòng 88 đóng hàm constructor.

```javascript
90:   handleAnswer = (selectedOption) => {
```
*   **Giải thích:** Khai báo hàm xử lý sự kiện khi người dùng click vào một đáp án. Hàm sử dụng cú pháp **arrow function** để tự động liên kết (bind) từ khóa `this` với instance của Class `QuizApp`.

```javascript
92:     if (this.state.feedback !== null) return;
```
*   **Giải thích:** Dòng này ngăn chặn việc bấm liên tiếp nhiều đáp án khác nhau. Nếu hệ thống đang hiển thị phản hồi đúng/sai (`feedback !== null`), hàm sẽ kết thúc ngay lập tức mà không thực hiện logic phía dưới.

```javascript
94:     const { questions, currentQuestion, score } = this.state;
```
*   **Giải thích:** Sử dụng cú pháp **Destructuring** trong ES6 để giải nén nhanh các thuộc tính từ `this.state` ra thành các biến độc lập có cùng tên.

```javascript
95:     const isCorrect = selectedOption === questions[currentQuestion].answer;
```
*   **Giải thích:** So sánh đáp án người dùng chọn (`selectedOption`) với đáp án đúng được định nghĩa trong dữ liệu câu hỏi hiện tại (`questions[currentQuestion].answer`). Trả về `true` hoặc `false`.

```javascript
98:     this.setState({
99:       selectedAnswer: selectedOption,
100:      feedback: isCorrect ? 'correct' : 'wrong',
101:      score: isCorrect ? score + 1 : score
102:    });
```
*   **Giải thích:** Gọi hàm `this.setState()` của React để cập nhật trạng thái mới. React sẽ gộp các thay đổi này vào state, sau đó kích hoạt quá trình render lại giao diện:
    *   Lưu đáp án đã chọn vào `selectedAnswer`.
    *   Gán trạng thái phản hồi vào `feedback` dựa trên kết quả đúng hay sai.
    *   Nếu đúng (`isCorrect === true`), cộng điểm thêm 1 (`score + 1`), nếu sai giữ nguyên điểm cũ (`score`).

```javascript
105:    setTimeout(() => {
```
*   **Giải thích:** Thiết lập một bộ đếm thời gian bất đồng bộ để trì hoãn hành động bên trong 1.2 giây (1200 mili giây). Mục đích là để người dùng kịp nhìn thấy đáp án đúng/sai (được tô màu xanh/đỏ) trước khi chuyển câu hỏi.

```javascript
106:      const nextQuestion = currentQuestion + 1;
```
*   **Giải thích:** Tính toán chỉ số của câu hỏi tiếp theo bằng cách lấy chỉ số hiện tại cộng thêm 1.

```javascript
107:      if (nextQuestion < questions.length) {
108:        this.setState({
109:          currentQuestion: nextQuestion,
110:          selectedAnswer: null,
111:          feedback: null
112:        });
```
*   **Giải thích:** Nếu chỉ số câu tiếp theo nhỏ hơn tổng số câu hỏi (tức là vẫn còn câu hỏi tiếp theo):
    *   Cập nhật `currentQuestion` thành câu hỏi mới.
    *   Reset `selectedAnswer` về `null` và `feedback` về `null` để chuẩn bị cho câu hỏi mới.

```javascript
113:      } else {
114:        this.setState({ quizEnd: true });
115:      }
116:    }, 1200);
117:  }
```
*   **Giải thích:** 
    *   Ngược lại, nếu đã trả lời hết câu hỏi cuối cùng (`nextQuestion >= questions.length`), chuyển trạng thái `quizEnd` thành `true` để hiển thị màn hình kết quả.
    *   Dòng 116 kết thúc hàm `setTimeout` với thời gian chờ 1200ms. Dòng 117 đóng hàm `handleAnswer`.

```javascript
119:  render() {
120:    const { questions, currentQuestion, score, quizEnd, selectedAnswer, feedback } = this.state;
```
*   **Giải thích:** Hàm `render` bắt buộc phải có trong Class Component để trả về JSX vẽ giao diện. Dòng 120 giải nén các biến cần dùng từ `this.state`.

```javascript
121:    return (
122:      <div className="quiz-container">
```
*   **Giải thích:** Trả về thẻ cha bọc toàn bộ giao diện có tên class CSS là `quiz-container`.

```javascript
123:        {!quizEnd ? (
```
*   **Giải thích:** Sử dụng toán tử ba ngôi (Ternary Operator) để thực hiện **Conditional Rendering** (Render có điều kiện):
    *   Nếu chưa kết thúc quiz (`!quizEnd` là `true`), sẽ hiển thị khối lệnh ngay sau dấu `?` (Component `<Question />`).
    *   Nếu đã kết thúc (`!quizEnd` là `false`), sẽ hiển thị khối lệnh sau dấu `:` (Component `<Score />`).

```javascript
124:          <Question
125:            data={questions[currentQuestion]}
126:            onAnswer={this.handleAnswer}
127:            questionNumber={currentQuestion + 1}
128:            total={questions.length}
129:            selectedAnswer={selectedAnswer}
130:            feedback={feedback}
131:          />
```
*   **Giải thích:** Truyền dữ liệu sang component con `Question` thông qua các **Props**:
    *   `data`: Đối tượng câu hỏi hiện tại.
    *   `onAnswer`: Truyền tham chiếu của hàm `this.handleAnswer` để component con có thể gọi ngược lại component cha khi người dùng click đáp án (đây là cơ chế nâng trạng thái - lifting state up).
    *   `questionNumber`: Số thứ tự câu hỏi hiển thị (1-indexed, nên lấy `currentQuestion + 1`).
    *   `total`: Tổng số câu hỏi trong bài quiz.
    *   `selectedAnswer` và `feedback`: Các trạng thái phục vụ hiển thị màu sắc đúng/sai.

```javascript
132:        ) : (
133:          <Score score={score} total={questions.length} />
134:        )}
```
*   **Giải thích:** Phần hiển thị sau dấu `:` khi bài quiz đã kết thúc. Render component `Score` và truyền hai props là điểm số (`score`) và tổng số câu hỏi (`total`).

```javascript
135:      </div>
136:    );
137:  }
138: }
```
*   **Giải thích:** Đóng các thẻ JSX và kết thúc Class Component `QuizApp`.

```javascript
140: export default QuizApp;
```
*   **Giải thích:** Export component `QuizApp` làm mặc định để các file khác (như `index.js`) có thể import và sử dụng.

---

### 4.5. File `src/Question.js`
Component con hiển thị nội dung câu hỏi, danh sách nút đáp án và thanh tiến trình làm bài. Sử dụng **Functional Component**.

```javascript
1: import React from 'react';
```
*   **Giải thích:** Import React để biên dịch JSX thành mã JavaScript.

```javascript
3: const Question = ({ data, onAnswer, questionNumber, total, selectedAnswer, feedback }) => {
```
*   **Giải thích:** Khai báo một Functional Component nhận tham số đầu vào là đối tượng `props`. Ở đây, cú pháp Destructuring được áp dụng trực tiếp trong tham số để lấy ra các biến cụ thể thay vì viết `props.data`, `props.onAnswer`,...

```javascript
4:   return (
5:     <div className="question-box">
```
*   **Giải thích:** Trả về thẻ cha `div` có class là `question-box` bọc nội dung của câu hỏi.

```javascript
7:       <div className="progress">
8:         <span>Question {questionNumber} of {total}</span>
```
*   **Giải thích:** Phần hiển thị chỉ số tiến độ bằng chữ dạng text (Ví dụ: "Question 3 of 10").

```javascript
9:         <div className="progress-bar">
10:           <div
11:             className="progress-fill"
12:             style={{ width: `${(questionNumber / total) * 100}%` }}
13:           />
14:         </div>
15:       </div>
```
*   **Giải thích:** Vẽ thanh tiến trình đồ họa (Progress Bar):
    *   `.progress-bar`: Là phần nền xám của thanh tiến trình.
    *   `.progress-fill`: Là phần tô màu xanh đè lên trên.
    *   `style={{ width: ... }}`: Sử dụng inline style trong React để tính toán động chiều rộng của thanh xanh theo phần trăm: `(câu_hiện_tại / tổng_số_câu) * 100%`. Khi câu hỏi tăng lên, state thay đổi, render lại dẫn tới chiều rộng thanh xanh dài ra tương ứng.

```javascript
18:       <p className="question-text">{data.question}</p>
```
*   **Giải thích:** Hiển thị chuỗi văn bản câu hỏi lấy từ prop `data`.

```javascript
21:       <div className="options">
22:         {data.options.map((option) => {
```
*   **Giải thích:**
    *   `.options`: Div bọc các nút đáp án.
    *   `data.options.map()`: Duyệt qua mảng chứa các phương án lựa chọn (`options`). Với mỗi lựa chọn `option`, hàm sẽ trả về một phần tử `<button>` để hiển thị lên màn hình.

```javascript
23:           let className = "option-button";
24:           if (selectedAnswer !== null) {
25:             if (option === data.answer) {
26:               className += " correct";
27:             } else if (option === selectedAnswer) {
28:               className += " wrong";
29:             }
30:           }
```
*   **Giải thích:** Logic tính toán màu sắc cho nút dựa trên lớp CSS động:
    *   Mặc định nút có class là `option-button`.
    *   Nếu người dùng đã chọn đáp án (`selectedAnswer !== null`):
        *   Nếu phương án đang duyệt trùng khớp với đáp án đúng của câu hỏi (`option === data.answer`), ta cộng thêm class `correct` (để CSS tô nút thành màu xanh).
        *   Nếu phương án đang duyệt là phương án mà người dùng đã click chọn (`option === selectedAnswer`), ta cộng thêm class `wrong` (để CSS tô nút thành màu đỏ).

```javascript
31:           return (
32:             <button
33:               key={option}
34:               className={className}
35:               onClick={() => onAnswer(option)}
36:               disabled={selectedAnswer !== null}
37:             >
38:               {option}
39:             </button>
40:           );
```
*   **Giải thích:**
    *   `key={option}`: Cung cấp thuộc tính `key` duy nhất cho mỗi nút trong danh sách lặp. Điều này giúp cơ chế đối soát Virtual DOM của React biết chính xác phần tử nào cần thay đổi/vẽ lại, tối ưu hiệu năng.
    *   `className={className}`: Gán chuỗi tên class đã tính toán ở trên vào nút.
    *   `onClick={() => onAnswer(option)}`: Gắn sự kiện click. Khi người dùng bấm nút, nó sẽ kích hoạt hàm callback `onAnswer` được truyền từ component cha (`QuizApp.js`) và truyền giá trị của option đó lên cha xử lý.
    *   `disabled={selectedAnswer !== null}`: Vô hiệu hóa nút bấm (không cho click nữa) một khi người dùng đã lựa chọn xong một phương án.

```javascript
41:         })}
42:       </div>
```
*   **Giải thích:** Kết thúc vòng lặp `map` và đóng thẻ bao bọc danh sách các nút tùy chọn.

```javascript
45:       {feedback && (
46:         <p className={`feedback ${feedback}`}>
47:           {feedback === 'correct' ? '✓ Correct!' : '✗ Wrong answer!'}
48:         </p>
49:       )}
50:     </div>
```
*   **Giải thích:** 
    *   Sử dụng toán tử short-circuit `&&`. Nếu `feedback` có giá trị (không phải `null`), React mới vẽ thẻ `<p>` hiển thị phản hồi chữ.
    *   Class của thẻ `<p>` sẽ là động: `feedback correct` hoặc `feedback wrong`.
    *   Nội dung text bên trong: Nếu `feedback === 'correct'` hiển thị `✓ Correct!`, ngược lại hiển thị `✗ Wrong answer!`.

```javascript
52: };
54: export default Question;
```
*   **Giải thích:** Đóng hàm component `Question` và thực hiện export nó ra ngoài.

---

### 4.6. File `src/Score.js`
Component con hiển thị kết quả tổng quan sau khi hoàn thành bài thi trắc nghiệm. Sử dụng **Functional Component**.

```javascript
1: import React from 'react';
```
*   **Giải thích:** Import React để sử dụng JSX.

```javascript
3: const Score = ({ score, total }) => {
```
*   **Giải thích:** Định nghĩa component nhận hai props là `score` (điểm số của người dùng) và `total` (tổng số câu hỏi).

```javascript
4:   const percentage = Math.round((score / total) * 100);
```
*   **Giải thích:** Tính toán tỷ lệ phần trăm chính xác của bài kiểm tra và làm tròn số đến giá trị nguyên gần nhất bằng hàm `Math.round`.

```javascript
6:   const getMessage = () => {
7:     if (percentage === 100) return "Perfect score! Outstanding!";
8:     if (percentage >= 80) return "Great job! Well done!";
9:     if (percentage >= 60) return "Good effort! Keep it up!";
10:    return "Keep practicing, you'll do better next time!";
11:  };
```
*   **Giải thích:** Hàm cục bộ dùng để kiểm tra tỷ lệ phần trăm và trả về một lời nhận xét/lời khuyên tương ứng với kết quả học tập của người dùng.

```javascript
13:  const handleShare = () => {
14:    const text = `I scored ${score}/${total} (${percentage}%) on the Quiz! Can you beat my score?`;
15:    navigator.clipboard.writeText(text).then(() => {
16:      alert("Result copied to clipboard!");
17:    });
18:  };
```
*   **Giải thích:** Định nghĩa hàm xử lý sự kiện chia sẻ kết quả:
    *   Dòng 14: Tạo chuỗi ký tự chứa kết quả cụ thể.
    *   Dòng 15: Sử dụng API bất đồng bộ `navigator.clipboard.writeText` để lưu chuỗi ký tự đó vào Clipboard (bộ nhớ tạm sao chép) của hệ thống.
    *   Dòng 15-17: Sau khi sao chép thành công (`.then()`), hiển thị một thông báo `alert` trên trình duyệt báo cho người dùng biết kết quả đã được copy, sẵn sàng để paste đi nơi khác.

```javascript
20:  return (
21:    <div className="result-box">
22:      <h1>Quiz Completed!</h1>
```
*   **Giải thích:** Trả về cấu trúc JSX của hộp kết quả với thẻ tiêu đề chính `<h1>`.

```javascript
24:      <div className="score-circle">
25:        <span className="score-number">{score}/{total}</span>
26:      </div>
```
*   **Giải thích:** Hiển thị điểm số thô dạng số (Ví dụ: `8/10`) bên trong một hình tròn CSS có class là `score-circle`.

```javascript
28:      <p className="score-percentage">{percentage}%</p>
29:      <p className="score-message">{getMessage()}</p>
```
*   **Giải thích:** Dòng 28 in tỷ lệ phần trăm điểm. Dòng 29 gọi hàm `getMessage()` để in lời nhắn động đã định nghĩa ở trên.

```javascript
31:      <div className="result-buttons">
32:        <button className="btn-replay" onClick={() => window.location.reload()}>
33:          Play Again
34:        </button>
```
*   **Giải thích:** Nút bấm "Play Again". Khi click sự kiện `onClick` sẽ kích hoạt hàm tải lại toàn bộ trang web thông qua lệnh của trình duyệt `window.location.reload()`, đưa mọi trạng thái (state) ứng dụng về trạng thái ban đầu để người dùng chơi lại.

```javascript
35:        <button className="btn-share" onClick={handleShare}>
36:          Share Result
37:        </button>
38:      </div>
```
*   **Giải thích:** Nút bấm "Share Result" kích hoạt hàm chia sẻ kết quả sao chép vào clipboard khi được click.

```javascript
39:    </div>
40:  );
41: };
```
*   **Giải thích:** Đóng các thẻ div JSX và kết thúc component `Score`.

```javascript
43: export default Score;
```
*   **Giải thích:** Export component `Score` để sẵn sàng sử dụng ở component cha.

---

### 4.7. File `src/QuizApp.css`
File chứa toàn bộ mã trang trí và định dạng giao diện cho ứng dụng.

*   `max-width: 600px; margin: 40px auto;`: Giới hạn chiều rộng tối đa của hộp Quiz là 600px và căn giữa màn hình.
*   `box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);`: Tạo bóng đổ mềm mại bao quanh hộp Quiz, tạo cảm giác nổi khối chuyên nghiệp.
*   `transition: all 0.2s ease;`: Hiệu ứng chuyển động mượt mà khi hover chuột vào nút hoặc thay đổi trạng thái.
*   `.option-button:hover:not(:disabled)`: Tạo hiệu ứng khi di chuột lên nút đáp án: đổi màu viền sang xanh, đổi màu nền nhẹ và dịch chuyển sang phải 4px (`transform: translateX(4px)`) nhằm tăng tính tương tác sinh động với người dùng.
*   `@keyframes fadeInUp`: Định nghĩa hoạt ảnh chuyển động: bắt đầu bằng độ mờ `opacity: 0` và bị dịch xuống dưới 8px, sau đó chuyển động mượt mà lên vị trí gốc và hiển thị rõ ràng `opacity: 1`. Hoạt ảnh này giúp câu hỏi mới hiện lên rất sinh động.
*   `background: linear-gradient(135deg, #007bff, #0056b3);`: Đổ màu chuyển sắc (gradient) chéo góc 135 độ từ xanh nhạt sang xanh đậm cho vòng tròn điểm số.
