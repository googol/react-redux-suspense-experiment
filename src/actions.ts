export const loadUser = () => ({
  type: 'LOAD_USER',
}) as const

export const loadPosts = () => ({
  type: 'LOAD_POSTS',
}) as const

export const finishUser = (data: User) => ({
  type: 'FINISH_USER',
  payload: data,
}) as const

export const finishPosts = (data: readonly Post[]) => ({
  type: 'FINISH_POSTS',
  payload: data,
}) as const

export const errorUser = (error: any) => ({
  type: 'ERROR_USER',
  payload: error,
}) as const

export const errorPosts = (error: any) => ({
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
}
