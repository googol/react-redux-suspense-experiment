import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from './store'
import { finishUser, finishPosts, loadUser, errorUser } from './actions'

const actionTimeline = [
  [1000, finishUser({ name: 'Ringo Starr' })],
  [2000, finishPosts([
    {
      id: 0,
      text: "I get by with a little help from my friends"
    },
    {
      id: 1,
      text: "I'd like to be under the sea in an octupus's garden"
    },
    {
      id: 2,
      text: "You got that sand all over your feet"
    }
  ])],
  [5000, loadUser()],
  [10000, errorUser({ reason: 'No internet connection' })],
] as const

const store = createStore()

for (const [time, action] of actionTimeline) {
  setTimeout(() => store.dispatch(action), time)
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Provider store={store}><App /></Provider>);
