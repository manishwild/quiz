import React from 'react'
import { UseGlobalContext } from './context'

const SetupForm = () => {
  const { quiz, changeHandler, submitHandler, error } = UseGlobalContext()
  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2>Quiz App</h2>
          <h3>Setup Quiz</h3>
          {/* amount */}
          <div className="form-control">
            <label htmlFor="amount">number of question</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={quiz.amount}
              onChange={changeHandler}
              className="form-input"
              min={1}
              max={50}
            />
          </div>
          {/* category */}
          <div className="form-control">
            <label htmlFor="category">category</label>
            <select
              name="category"
              id="categoryt"
              value={quiz.category}
              onChange={changeHandler}
              className="form-input"
            >
              <option value="GeneralKnowledge">General Knowledge</option>
              <option value="Books">Books</option>
              <option value="Film">Film</option>
              <option value="Music">Music</option>
              <option value="MusicalsTheatres">Musicals&Theatres</option>
              <option value="Television">Television</option>
              <option value="VideoGames">Video Games</option>
              <option value="BoardGames">Board Games</option>
              <option value="ScienceNature">Science&Nature</option>
              <option value="Computers">Computers</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Mythology">Mythology</option>
              <option value="Sports">Sports</option>
              <option value="Geography">Geography</option>
              <option value="History">History</option>
              <option value="Politics">Politics</option>
              <option value="Art">Art</option>
              <option value="Celebrities">Celebrities</option>
              <option value="Animals">Animals</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Comics">Comics</option>
              <option value="Gadgets">Gadgets</option>
              <option value="JapaneseAnimeManga">Japanese Anime Manga</option>
              <option value="CartoonAnimations">Cartoon&Animations</option>
            </select>
          </div>
          {/* difficulty */}
          <div className="form-control">
            <label htmlFor="difficulty">Select Difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              value={quiz.difficulty}
              onChange={changeHandler}
              className="form-input"
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          {/* type */}
          <div className="form-control">
            <label htmlFor="type">Select type</label>
            <select
              name="type"
              id="type"
              value={quiz.type}
              onChange={changeHandler}
              className="form-input"
            >
              <option value="multiple">Multiple</option>
              <option value="boolean">True / False</option>
            </select>
          </div>
          {error && (
            <p className="error">
              Can't generate Questions, Please try diffrent options!
            </p>
          )}
          <button className="submit-btn" type="submit" onClick={submitHandler}>
            Start
          </button>
        </form>
      </section>
    </main>
  )
}

export default SetupForm
