export type PromiseResolver<T> = { resolve: (value: T) => void, reject: (error: any) => void, promise: Promise<T>, status: 'pending' | 'resolved' | 'rejected' }
export function promiseResolver<T>(): PromiseResolver<T> {
  let status: PromiseResolver<T>['status'] = 'pending'
  let resolver: PromiseResolver<T>['resolve'] | undefined = undefined
  let rejecter: PromiseResolver<T>['reject'] | undefined = undefined
  const promise = new Promise<T>((resolve, reject) => {
    resolver = resolve
    rejecter = reject
  }).then((value) => {
    status = 'resolved'
    return value
  }, (error) => {
    status = 'rejected'
    throw error
  })
  return {
    resolve: resolver!,
    reject: rejecter!,
    promise,
    status,
  }
}


