import React from 'react';
import ReactDOM from 'react-dom/client';
import QuizApp from './QuizApp'; // Import component QuizApp của bạn

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QuizApp />
  </React.StrictMode>
);