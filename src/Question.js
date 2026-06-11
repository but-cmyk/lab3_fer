import React from "react";

/**
 * Question là một FUNCTIONAL COMPONENT hiển thị câu hỏi hiện tại,
 * thanh tiến trình (progress bar), và danh sách các nút bấm đáp án.
 * 
 * Các nội dung chú thích phục vụ học tập:
 * - Cách nhận Props bằng Destructuring.
 * - Cách tính chiều rộng thanh tiến trình động bằng Inline Style.
 * - Cách dùng hàm .map() duyệt qua danh sách để sinh các nút HTML kèm theo thuộc tính `key`.
 * - Cách cộng dồn class CSS động (dynamic className) để đổi màu đáp án đúng/sai.
 */
const Question = ({
  data,            // Đối tượng câu hỏi hiện tại: { id, question, options, answer }
  onAnswer,        // Hàm callback gửi đáp án đã chọn lên component cha (QuizApp)
  questionNumber,  // Thứ tự câu hỏi hiện tại (ví dụ: 1, 2, 3...)
  total,           // Tổng số câu hỏi (ví dụ: 10)
  selectedAnswer,  // Đáp án người dùng chọn ở câu hỏi này (nếu chưa chọn thì là null)
  feedback,        // Trạng thái phản hồi ('correct' | 'wrong' | null)
}) => {
  return (
    <div className="question-box">
      {/* 1. THANH TIẾN TRÌNH (Progress Indicator) */}
      <div className="progress">
        <span>
          Question {questionNumber} of {total}
        </span>
        <div className="progress-bar">
          {/* Tính toán động thuộc tính CSS 'width' theo tỷ lệ phần trăm câu hỏi hiện tại */}
          <div
            className="progress-fill"
            style={{ width: `${(questionNumber / total) * 100}%` }}
          />
        </div>
      </div>

      {/* 2. NỘI DUNG CÂU HỎI */}
      <p className="question-text">{data.question}</p>

      {/* 3. DANH SÁCH CÁC PHƯƠNG ÁN LỰA CHỌN */}
      <div className="options">
        {/* Duyệt qua mảng options để render ra các thẻ button tương ứng */}
        {data.options.map((option) => {
          let className = "option-button";

          // LOGIC ĐỔI MÀU NÚT BẤM KHI ĐÃ CHỌN ĐÁP ÁN:
          // Nếu người dùng đã chọn đáp án (selectedAnswer khác null):
          if (selectedAnswer !== null) {
            if (option === data.answer) {
              // Phương án đúng sẽ luôn được tô màu xanh (class 'correct')
              className += " correct";
            } else if (option === selectedAnswer) {
              // Phương án sai người dùng bấm sẽ được tô màu đỏ (class 'wrong')
              className += " wrong";
            }
          }

          return (
            <button
              key={option} // Thuộc tính key duy nhất giúp React tối ưu hóa quá trình đối soát Virtual DOM
              className={className}
              onClick={() => onAnswer(option)} // Gọi hàm callback truyền lên component cha
              disabled={selectedAnswer !== null} // Vô hiệu hóa (disable) tất cả nút bấm khi đã trả lời câu này
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* 4. HIỂN THỊ THÔNG BÁO ĐÚNG/SAI (Feedback message) */}
      {/* Sử dụng toán tử short-circuit (&&). Bản chất: nếu feedback có giá trị thì mới render thẻ <p> */}
      {feedback && (
        <p className={`feedback ${feedback}`}>
          {feedback === "correct" ? "✓ Correct!" : "✗ Wrong answer!"}
        </p>
      )}
    </div>
  );
};

export default Question;
