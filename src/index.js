import reactTreeWalker from 'react-tree-walker'

const warnmsg =
  'Deprecation notice: you are using the deprecated "asyncBootsrap" for "react-async-bootstrapper", please rename these to "bootstrap"'

export default function asyncBootstrapper(app, options, context = {}) {
  const visitor = (element, instance) => {
    if (
      instance &&
      (typeof instance.asyncBootstrap === 'function' ||
        typeof instance.bootstrap === 'function')
    ) {
      return typeof instance.bootstrap === 'function'
        ? instance.bootstrap()
        : console.log(warnmsg) || instance.asyncBootstrap()
    }
  }

  return reactTreeWalker(app, visitor, context, options)
}
