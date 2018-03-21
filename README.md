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

This library is an abstraction of [`react-tree-walker`](https://github.com/ctrlplusb/react-tree-walker), that allows you to attach an `asyncBootstrap` method to your React "class" components.

Within the `asyncBootstrap` you can do any asynchronous work you like (e.g. fetching data) that you like, returning a `Promise` to indicate when the asynchronous work has completed.

## Naive Example

```jsx
import asyncBootstrapper from 'react-async-bootstrapper'

// Our super naive global state. Don't copy this, it's just illustrative. You'd
// likely want to use something
const globalStateManager = {
  products: {},
}

class Product extends Component {
  // 👇
  asyncBootstrap() {
    if (globalStateManager.products[this.props.productId]) {
      // Already have data
      return
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

Zing.  You can do anything you like.  And interplay with other libaries that support `react-async-bootstrapper`, such as [`react-async-component`](https://github.com/ctrlplusb/react-async-component) which provides code splitting support.

## FAQs

> Let me know if you have any questions
