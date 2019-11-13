# Exploration of the suspense contract with react-redux

The magic happens in [useLoadingStateSelector](src/useLoadingStateSelector.ts).
It works, but I wouldn't put this in a production site.
I'd rather wait until the react-redux team creates a proper robust hook for this.

This demo is based on the example linked to in the concurrent mode documentation: https://codesandbox.io/s/frosty-hermann-bztrp

See the current concurrent mode documentation here: https://reactjs.org/docs/concurrent-mode-intro.html
