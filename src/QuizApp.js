import React, { Component } from 'react';
import Question from './Question';
import Score from './Score';
import defaultQuestions from './defaultQuestions'; // Import bộ câu hỏi mặc định từ file riêng
import './QuizApp.css';

/**
 * QuizApp là Component cha quản lý toàn bộ trạng thái và logic của ứng dụng Quiz.
 * File này được xây dựng dưới dạng CLASS COMPONENT nhằm minh họa cho bài học:
 * - Khởi tạo state ban đầu (Setting initial component state)
 * - Tự động gộp state khi cập nhật (Merging component state)
 * - Khai báo và ràng buộc ngữ cảnh xử lý sự kiện (Event Handling & Binding)
 */
class QuizApp extends Component {
  // 1. KHỞI TẠO STATE BAN ĐẦU (Setting initial component state)
  // Constructor chạy đầu tiên khi Component được tạo ra trên giao diện.
  constructor(props) {
    super(props); // Gọi constructor của lớp Component cha (bắt buộc)
    
    this.state = {
      questions: defaultQuestions, // Mảng danh sách các câu hỏi
      currentQuestion: 0,          // Chỉ số (index) câu hỏi hiện tại đang hiển thị
      score: 0,                    // Điểm số của người dùng (số câu trả lời đúng)
      quizEnd: false,              // Trạng thái đã hoàn thành bài quiz hay chưa
      selectedAnswer: null,        // Đáp án mà người dùng đã bấm chọn ở câu hiện tại
      feedback: null               // Trạng thái phản hồi ('correct' | 'wrong' | null)
    };
  }

  // 2. KHAI BÁO EVENT HANDLER (Declaring event handlers)
  // Sử dụng cú pháp Arrow Function (=>) để tự động ràng buộc (bind) ngữ cảnh 'this'
  // thuộc về instance của class QuizApp. Người mới không cần viết bind(this) thủ công trong constructor.
  handleAnswer = (selectedOption) => {
    // Ngăn người dùng nhấn liên tiếp nhiều đáp án khi đang hiển thị phản hồi câu đúng/sai
    if (this.state.feedback !== null) return;

    const { questions, currentQuestion, score } = this.state;
    const isCorrect = selectedOption === questions[currentQuestion].answer;

    // 3. CẬP NHẬT VÀ GỘP TRẠNG THÁI (Merging component state)
    // setState trong Class Component có đặc tính tự động gộp (merge). 
    // Chúng ta chỉ cần truyền những trường cần thay đổi, các trường khác (như questions, currentQuestion...) sẽ được giữ nguyên.
    this.setState({
      selectedAnswer: selectedOption,
      feedback: isCorrect ? 'correct' : 'wrong',
      score: isCorrect ? score + 1 : score
    });

    // Chuyển sang câu hỏi tiếp theo sau một khoảng thời gian ngắn (1.2 giây)
    // để người dùng kịp nhìn thấy màu sắc đáp án phản hồi.
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        // Tiếp tục câu hỏi mới: Reset đáp án đã chọn và feedback về null
        this.setState({
          currentQuestion: nextQuestion,
          selectedAnswer: null,
          feedback: null
        });
      } else {
        // Hết câu hỏi: Cập nhật quizEnd = true để hiển thị màn hình kết quả
        this.setState({ quizEnd: true });
      }
    }, 1200);
  }

  // Event handler xử lý tính năng chơi lại (Replay)
  // Reset các biến trạng thái về ban đầu để chơi từ câu hỏi đầu tiên.
  handlePlayAgain = () => {
    this.setState({
      currentQuestion: 0,
      score: 0,
      quizEnd: false,
      selectedAnswer: null,
      feedback: null
    });
  }

  render() {
    // Giải nén các biến từ state để sử dụng ngắn gọn hơn trong JSX
    const { questions, currentQuestion, score, quizEnd, selectedAnswer, feedback } = this.state;

    return (
      <div className="quiz-container">
        {/* Render có điều kiện (Conditional Rendering) dựa trên biến quizEnd */}
        {!quizEnd ? (
          // Nếu chưa kết thúc, hiển thị Component Question và truyền dữ liệu qua Props
          <Question
            data={questions[currentQuestion]}
            onAnswer={this.handleAnswer}
            questionNumber={currentQuestion + 1}
            total={questions.length}
            selectedAnswer={selectedAnswer}
            feedback={feedback}
          />
        ) : (
          // Nếu đã kết thúc, hiển thị Component Score
          // Truyền hàm callback handlePlayAgain xuống qua prop onReplay để con có thể gọi ngược lại cha
          <Score 
            score={score} 
            total={questions.length} 
            onReplay={this.handlePlayAgain} 
          />
        )}
      </div>
    );
  }
}

export default QuizApp;