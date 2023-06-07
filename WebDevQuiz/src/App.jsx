import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    questions: [
      {
        title: "JavaScript 與 Java 有什麼關係？",
        answers: [
          {
            text: "同公司的產品",
            correct: false,
          },
          {
            text: "新版與舊版的關係",
            correct: false,
          },
          {
            text: "一點關係也沒有",
            correct: true,
          },
          {
            text: "JavaScript 是 Java 的 Web 版本",
            correct: false,
          },
        ],
      },
      {
        title: "發明 React JS 的公司是？",
        answers: [
          {
            text: "Google",
            correct: false,
          },
          {
            text: "Facebook",
            correct: true,
          },
          {
            text: "Apple",
            correct: false,
          },
          {
            text: "Microsoft",
            correct: false,
          },
        ],
      },
    ],
    currentQuestionIndex: 0,
    answers: [],
    submitted: false,
  };
  componentDidMount() {
    this.setState({
      answers: Array(this.state.questions.length).fill(null),
    });
  }
  selectAnswer = (index) => {
    const newAnswers = [...this.state.answers];
    newAnswers[this.state.currentQuestionIndex] = index;
    this.setState({
      answers: newAnswers,
    });
  };
  prev = () => {
    if (this.state.currentQuestionIndex === 0) {
      return;
    }
    this.setState({
      currentQuestionIndex: this.state.currentQuestionIndex - 1,
    });
  };
  next = () => {
    if (this.state.currentQuestionIndex === this.state.questions.length - 1) {
      return;
    }
    this.setState({
      currentQuestionIndex: this.state.currentQuestionIndex + 1,
    });
  };
  answerClasses = (index, answered) => {
    let classes;

    if (answered === index) {
      classes = "bg-blue-400";
    } else {
      classes = "bg-slate-50 hover:bg-slate-300";
    }

    if (this.state.submitted) {
      let correctIndex = this.state.questions[
        this.state.currentQuestionIndex
      ].answers
        .map((answer) => answer.correct)
        .indexOf(true);

      if (index === correctIndex) {
        classes = "bg-green-400";
      }

      if (index === answered && index !== correctIndex) {
        classes = "bg-red-400";
      }
    }

    return classes;
  };

  answeredCount = () => {
    return this.state.answers.filter((answer) => answer !== null).length;
  };

  submit = () => {
    this.setState({
      submitted: true,
    });
  };
  score = () => {
    let corrects = 0;
    for (let i = 0; i < this.state.questions.length; i++) {
      const question = this.state.questions[i];
      const answered = this.state.answers[i];

      if (question.answers[answered].correct) {
        corrects++;
      }
    }
    return Math.round((corrects / this.state.questions.length) * 100);
  };

  render() {
    const question = this.state.questions[this.state.currentQuestionIndex];
    const answered = this.state.answers[this.state.currentQuestionIndex];
    return (
      <div className="min-h-screen p-20 bg-slate-100 flex flex-col items-center">
        <h1 className="text-4xl font-bold">Web Dev Quiz!</h1>

        <div
          className="flex mt-12 mb-6 max-w-3xl justify-between 
 items-center w-full text-xl text-slate-700"
        >
          <span>
            第 {this.state.currentQuestionIndex + 1} 题，已回答{" "}
            {this.answeredCount()} 题，共 {this.state.questions.length} 题
          </span>
          {!this.state.submitted && (
            <button
              className="bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-800 disabled:opacity-50"
              disabled={this.answeredCount() !== this.state.questions.length}
              onClick={() => this.submit()}
            >
              提交
            </button>
          )}
          {this.state.submitted && <span>{this.score()}/100</span>}
        </div>

        <div className="rounded-xl overflow-hidden block w-full max-w-3xl shadow-xl bg-white">
          <h2 className="p-6 bg-blue-800 text-white font-bold text-3xl">
            {question.title}
          </h2>
          <ul>
            {question.answers.map((answer, index) => (
              <li
                className={`p-6 border-b-2 border-white text-2xl text-slate-700 cursor-pointer ${this.answerClasses(
                  index,
                  answered
                )}`}
                key={index}
                onClick={() => this.selectAnswer(index)}
              >
                {answer.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex mt-12 mb-6">
          <ul className="flex bg-slate-300 rounded-xl overflow-hidden">
            <li
              className="hover:bg-slate-400 px-4 py-3 cursor-pointer"
              onClick={this.prev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </li>
            <li
              className="hover:bg-slate-400 px-4 py-3 cursor-pointer"
              onClick={this.next}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
