import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Store from './store/store'

const store = new Store();

interface State {
  store: Store
}
export const Context = createContext<State>({
  store
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Context.Provider value={{store}}>
      <App />
  </Context.Provider>,
)
