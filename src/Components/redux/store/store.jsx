import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '../features/criteriaSlice'
import chatSlice from '../features/chat.bot'

const loadFromLocalStorage = () => {
    try {
      const data = localStorage.getItem('criteriaFilter')
      if (data) {
        return { criteriaFilter: JSON.parse(data) }
      }
    } catch (e) {
      console.warn('Could not load from localStorage:', e)
    }
    return { criteriaFilter: [] }
  }


  const saveToLocalStorage = (state) => {
    try {
      localStorage.setItem('criteriaFilter', JSON.stringify(state.criteria.criteriaFilter))
    } catch (e) {
      console.warn('Could not save to localStorage:', e)
    }
  }


  const preloadedState = {
    criteria: loadFromLocalStorage(),
  }


const store = configureStore({
    reducer: {
        criteria:filterReducer,
        chat:chatSlice
    },
    preloadedState,
  })


  store.subscribe(() => {
    saveToLocalStorage(store.getState())
  })

export default store