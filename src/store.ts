import * as redux from 'redux'
import { loading, finished, errored, LoadingState } from './loadingState'

declare global {
  type User = { readonly name: string }
  type Post = { readonly id: number, readonly text: string }
  type State = typeof initialState
}

const initialState = {
  user: loading() as LoadingState<User>,
  posts: loading() as LoadingState<readonly Post[]>,
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

export function createStore() {
  const devtoolsMiddleware = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()

  return redux.createStore(reducer, devtoolsMiddleware)
}

