import React from 'react'
import { UseGlobalContext } from './context'
import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'

const App = () => {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nxtQuestion,
    checkAnswer,
  } = UseGlobalContext()

  if (waiting) {
    return <SetupForm />
  }
  if (loading) {
    return <Loading />
  }
  const { question, incorrect_answers, correct_answer } = questions[index]
  // console.log(correct_answer)
  // const answers = [...incorrect_answers, correct_answer]
  let answers = [...incorrect_answers]
  const tempIndex = Math.floor(Math.random() * 4)
  // console.log(tempIndex)
  if (tempIndex === 3) {
    answers.push(correct_answer)
  } else {
    answers.push(answers[tempIndex])
    answers[tempIndex] = correct_answer
  }
  return (
    <main>
      <Modal />
      <section className="quiz">
        <h2>Quiz App</h2>
        <p className="correct-answers">
          correct answers: {correct}/{index}
        </p>
        <article className="container">
          <h3 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  className="answer-btn"
                  onClick={() => checkAnswer(correct_answer === answer)}
                  key={index}
                  dangerouslySetInnerHTML={{ __html: answer }}
                ></button>
              )
            })}
          </div>
        </article>
        <button className="next-question" onClick={nxtQuestion}>
          Next Question
        </button>
      </section>
    </main>
  )
}

export default App
