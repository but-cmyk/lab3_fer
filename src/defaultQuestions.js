// Danh sách các câu hỏi mặc định của ứng dụng Quiz.
// Việc tách riêng giúp file component chính sạch sẽ, dễ đọc hơn cho người mới bắt đầu.
const defaultQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    id: 2,
    question: "What is the largest planet in our solar system?",
    options: ["Jupiter", "Saturn", "Mars", "Earth"],
    answer: "Jupiter"
  },
  {
    id: 3,
    question: "Which language is used to style web pages?",
    options: ["CSS", "HTML", "JavaScript", "Python"],
    answer: "CSS"
  },
  {
    id: 4,
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "HyperText and links Markup Language",
      "Home Tool Markup Language"
    ],
    answer: "HyperText Markup Language"
  },
  {
    id: 5,
    question: "Which company developed the React library?",
    options: ["Google", "Facebook", "Microsoft", "Twitter"],
    answer: "Facebook"
  },
  {
    id: 6,
    question: "What is the correct way to declare a variable in modern JavaScript?",
    options: ["let x = 5;", "variable x = 5;", "v x = 5;", "int x = 5;"],
    answer: "let x = 5;"
  },
  {
    id: 7,
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["Float", "Number", "String", "Boolean"],
    answer: "Float"
  },
  {
    id: 8,
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    id: 9,
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<style>", "<css>", "<script>", "<link>"],
    answer: "<style>"
  },
  {
    id: 10,
    question: "In React, what is used to pass data from a parent component to a child component?",
    options: ["Props", "State", "Hooks", "Context"],
    answer: "Props"
  }
];

export default defaultQuestions;
