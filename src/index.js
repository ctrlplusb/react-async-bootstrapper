import reactTreeWalker from 'react-tree-walker'

export default function asyncBootstrapper(app) {
  const visitor = (element, instance) => {
    if (instance && typeof instance.asyncBootstrapperTarget === 'function') {
      return instance.asyncBootstrapperTarget()
    }
    return true
  }

  return (
    reactTreeWalker(app, visitor, {})
      // Swallow errors.
      .catch(() => undefined)
  )
}
