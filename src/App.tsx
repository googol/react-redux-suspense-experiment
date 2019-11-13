import React, { Suspense } from 'react';
import { useLoadingStateSelector } from './useLoadingStateSelector'

function ProfileDetails() {
  const user = useLoadingStateSelector((state) => state.user)
  return <h2>{user.name}</h2>;
}

function ProfileTimeline() {
  const posts = useLoadingStateSelector((state) => state.posts)
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

class ErrorBoundary extends React.Component<{}, { error: any, hasError: boolean }> {
  state = {
    error: undefined,
    hasError: false
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2>An error occurred</h2>
          <p>{JSON.stringify(this.state.error)}</p>
        </>
      )
    }
    return this.props.children
  }
}

const App: React.FC = () => {
  return (
    <>
      <h1>react-redux suspense experiment</h1>
      <p>This is a simple react-redux suspense exploration.</p>
      <p>Definitely not production quality, just an excercise in how the current experimental suspense contract works.</p>
      <p>Based on <a href="https://codesandbox.io/s/frosty-hermann-bztrp">the example linked to in the suspense documentation</a></p>
      <p><a href="https://github.com/googol/react-redux-suspense-experiment">Source code on github</a></p>
      <ErrorBoundary>
        <Suspense
          fallback={<h2>Loading profile...</h2>}
        >
          <ProfileDetails />
          <Suspense
            fallback={<h2>Loading posts...</h2>}
          >
            <ProfileTimeline />
          </Suspense>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
