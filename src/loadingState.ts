export type LoadingState<T> =
  | { readonly state: 'loading' }
  | { readonly state: 'finished', readonly data: T }
  | { readonly state: 'error', readonly error: unknown }

export const loading = (): LoadingState<any> => ({ state: 'loading' })
export const finished = <T>(data: T): LoadingState<T> => ({ state: 'finished', data })
export const errored = (error: unknown): LoadingState<any> => ({ state: 'error', error })
