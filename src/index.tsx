import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { loading, finished, errored, LoadingState } from './loadingState'

type User = { name: string }
type Post = { id: number, text: string }

const initialState = {
  user: loading() as LoadingState<User>,
  posts: loading() as LoadingState<readonly Post[]>,
}

const loadUser = () => ({
  type: 'LOAD_USER',
}) as const

const loadPosts = () => ({
  type: 'LOAD_POSTS',
}) as const

const finishUser = (data: User) => ({
  type: 'FINISH_USER',
  payload: data,
}) as const

const finishPosts = (data: readonly Post[]) => ({
  type: 'FINISH_POSTS',
  payload: data,
}) as const

const errorUser = (error: any) => ({
  type: 'ERROR_USER',
  payload: error,
}) as const

const errorPosts = (error: any) => ({
  type: 'ERROR_POSTS',
  payload: error,
}) as const

declare global {
  type Action =
    | ReturnType<typeof loadUser>
    | ReturnType<typeof loadPosts>
    | ReturnType<typeof finishUser>
    | ReturnType<typeof finishPosts>
    | ReturnType<typeof errorUser>
    | ReturnType<typeof errorPosts>
  type State = typeof initialState
}

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'LOAD_USER':
      return {...state, user: loading() }
    case 'LOAD_POSTS':
      return {...state, posts: loading() }
    case 'FINISH_USER':
      return {...state, user: finished(action.payload) }
    case 'FINISH_POSTS':
      return {...state, posts: finished(action.payload) }
    case 'ERROR_USER':
      return {...state, user: errored(action.payload) }
    case 'ERROR_POSTS':
      return {...state, posts: errored(action.payload) }
    default:
      return state
  }
}
const store = createStore(reducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())

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

for (const [time, action] of actionTimeline) {
  setTimeout(() => store.dispatch(action), time)
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Provider store={store}><App /></Provider>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
