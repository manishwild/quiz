import axios from 'axios'
import React, { createContext, useContext,  useState } from 'react'

// in api category is used as number
const table = {
  GeneralKnowledge: 9,
  Books: 10,
  Film: 11,
  Music: 12,
  MusicalsTheatres: 13,
  Television: 14,
  VideoGames: 15,
  BoardGames: 16,
  ScienceNature: 17,
  Computers: 18,
  Mathematics: 19,
  Mythology: 20,
  Sports: 21,
  Geography: 22,
  History: 23,
  Politics: 24,
  Art: 25,
  Celebrities: 26,
  Animals: 27,
  Vehicles: 28,
  Comics: 29,
  Gadgets: 30,
  JapaneseAnimeManga: 31,
  CartoonAnimations:32,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'



// const tempUrl =
//   'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

const AppContext = createContext()

const AppProvider = ({ children }) => {
  // for form
  const [waiting, setWaiting] = useState(true)
  const [loading, setLoading] = useState(false)
  // data
  const [questions, setQuestions] = useState([])
  // value
  const [index, setIndex] = useState(0)
  // correct or incorrect
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'GeneralKnowledge',
    difficulty: 'easy',
    type: 'multiple',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchQuestions = async (url) => {
    setLoading(true)
    setWaiting(false)
    const response = await axios(url).catch((err) => console.log(err))
    console.log(response)
    if (response) {
      const data = response.data.results
      if (data.length > 0) {
        setQuestions(data)
        setLoading(false)
        setWaiting(false)
        setError(false)
      } else {
        setWaiting(true)
        setError(true)
      }
    } else {
      setWaiting(true)
    }
  }

  const nxtQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1
      if (index > questions.length - 1) {
        openModal()
        return 0
      } else {
        return index
      }
    })
  }
  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1)
    }
    nxtQuestion()
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setWaiting(true)
    setCorrect(0)
    setIsModalOpen(false)
  }

  const changeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setQuiz({ ...quiz, [name]: value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const { amount, category, difficulty,type } = quiz
    console.log(quiz)
    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=${type}`
    fetchQuestions(url)
    console.log(url)
  }

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nxtQuestion,
        checkAnswer,
        closeModal,
        quiz,
        changeHandler,
        submitHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// always make sure to name use in the beging
export const UseGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
