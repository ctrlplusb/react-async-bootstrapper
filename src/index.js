import reactTreeWalker from 'react-tree-walker'

export default function asyncResolver(app) {
  const visitor = (element, instance) => {
    if (instance && typeof instance.reactAsyncResolverTarget === 'function') {
      return instance.reactAsyncResolverTarget()
    }
    return true
  }

  return (
    reactTreeWalker(app, visitor, {})
      // Swallow errors.
      .catch(() => undefined)
  )
}
