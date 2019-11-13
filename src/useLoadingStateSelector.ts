import { useSelector, useStore } from 'react-redux'
import { LoadingState } from './loadingState'

export function useLoadingStateSelector<T>(selector: (state: State) => LoadingState<T>): T {
  const data = useSelector(selector)
  const store = useStore()

  if (data.state === 'finished') {
    return data.data
  } else if (data.state === 'error') {
    throw data.error
  } else {
    throw new Promise((resolve, reject) => {
      store.subscribe(() => {
        const currentData = selector(store.getState())
        if (currentData.state === 'finished') {
          resolve(currentData.data)
        } else if (currentData.state === 'error') {
          reject(currentData.error)
        }
      })
    })
  }
}
