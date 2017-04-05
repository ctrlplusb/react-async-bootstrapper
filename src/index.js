import reactTreeWalker from 'react-tree-walker'

export default function asyncBootstrapper(app) {
  const visitor = (element, instance) => {
    if (instance && typeof instance.asyncBootstrap === 'function') {
      return instance.asyncBootstrap()
    }
    return true
  }

  return reactTreeWalker(app, visitor, {})
}
