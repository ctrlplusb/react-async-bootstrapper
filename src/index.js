import reactTreeWalker from 'react-tree-walker'

export default function asyncBootstrapper(app, options) {
  const visitor = (element, instance) => {
    if (instance && typeof instance.asyncBootstrap === 'function') {
      return instance.asyncBootstrap(options)
    }
    return true
  }

  return reactTreeWalker(app, visitor, {}, options)
}
