# react-async-bootstrapper 👢

Provides the ability to execute async bootstrapper functions within your React element tree.

[![npm](https://img.shields.io/npm/v/react-async-bootstrapper.svg?style=flat-square)](http://npm.im/react-async-bootstrapper)
[![MIT License](https://img.shields.io/npm/l/react-async-bootstrapper.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Travis](https://img.shields.io/travis/ctrlplusb/react-async-bootstrapper.svg?style=flat-square)](https://travis-ci.org/ctrlplusb/react-async-bootstrapper)
[![Codecov](https://img.shields.io/codecov/c/github/ctrlplusb/react-async-bootstrapper.svg?style=flat-square)](https://codecov.io/github/ctrlplusb/react-async-bootstrapper)

## TOCs

  - [Introduction](#introduction)
  - [FAQs](#faqs)

## Introduction

This library is an abstraction of [`react-tree-walker`](https://github.com/ctrlplusb/react-tree-walker), that allows you to attach an `asyncBootstrap` member to your React components.

Within the `asyncBootstrap` you can do any work/bootstrapping that you like and then return a `Promise` that should resolve to either `true` (which indicates back to the bootstrapping process that it should continue down the current branch of your application in order to locate and resolve any nested `asyncBootstrap` instances), or `false` (which indicates that traversal of the current branch of your application can stop).

## Naive Example

```jsx
import asyncBootstrapper from 'react-async-bootstrapper'

// Don't do this, do a proper imp
const globalStateManager = {
  products: {},
}

class Product extends Component {
  // 👇
  asyncBootstrap() {
    if (globalStateManager.products[this.props.productId]) {
      // Already have data, just return true to allow nested 
      // asyncBootstrap instances to be located/resolved
      return true
    }
  
    // Fetch our product and load up our state
    return fetch(`/api/products/${this.props.productId}`)
      .then((response) => {
        // store in our global state
        globalStateManager.products[this.props.productId] = response.json()
        // Indicates our desire to allow for nested asyncBootstrap instances
        // to be located/resolved
        return true
      })
  }

  render() {
    const product = globalStateManager.products[this.props.productId]
    return (
      <div>
         {product.name} - {product.price}
      </div>
    )
  }
}

const app = (
  <div>
    <h1>My favourite product</h1>
    <Product productId={1337} />
  </div>
)

// Now for the bootstrapping/rendering process (on a client/server)
asyncBootstrapper(app).then(() => {
  // bootstrapping complete
  ReactDOM.render(app, document.getElementById('app'))
})
```

Zing.  You can do anything you like.  And interplay with other libaries that support `react-async-bootstrapper`, such as [`react-async-component`](https://github/ctrlplusb/react-async-component) which provides code splitting support.

## FAQs

> Let me know if you have any questions
