/* eslint-disable no-console */

import reactTreeWalker from 'react-tree-walker'

const warnmsg =
  '"react-async-bootstrapper" deprecation notice: please rename your "asyncBootstrap" methods to "bootstrap"'

const defaultContext = {
  reactAsyncBootstrapperRunning: true,
}

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
    return undefined
  }

  return reactTreeWalker(
    app,
    visitor,
    Object.assign({}, context, defaultContext),
    options,
  )
}
