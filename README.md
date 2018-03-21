# react-async-bootstrapper 👢

Execute a `bootstrap` method on your React/Preact components. Useful for data prefetching and other activities.

[![npm](https://img.shields.io/npm/v/react-async-bootstrapper.svg?style=flat-square)](http://npm.im/react-async-bootstrapper)
[![MIT License](https://img.shields.io/npm/l/react-async-bootstrapper.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Travis](https://img.shields.io/travis/ctrlplusb/react-async-bootstrapper.svg?style=flat-square)](https://travis-ci.org/ctrlplusb/react-async-bootstrapper)
[![Codecov](https://img.shields.io/codecov/c/github/ctrlplusb/react-async-bootstrapper.svg?style=flat-square)](https://codecov.io/github/ctrlplusb/react-async-bootstrapper)

## TOCs

* [Introduction](#introduction)
* [Simple Example](#simple-example)

## Introduction

This library is a simple implementation of [`react-tree-walker`](https://github.com/ctrlplusb/react-tree-walker), allowing you to attach a `bootstrap` method to your React/Preact "class" components. I would highly recommend you review `react-tree-walkers` documentation so as to gain more familiarity with what is being wrapped up by `react-bootstrapper`.

I have created this implementation that responds to a `bootstrap` method to allow me to have a standard implementation that would allow for interop between multiple packages requiring a bootstrapping process. For example I have create [`react-async-component`](https://github.com/ctrlplusb/react-async-component) which provides code splitting support, and [`react-jobs`](https://github.com/ctrlplusb/react-jobs) which enables data fetching. Both packages use this library to allow for a single bootstrapping parse satisfying the needs of both.

## Simple Example

```jsx
import bootstrapper from 'react-async-bootstrapper'

// Our super naive global state. Don't copy this, it's just illustrative. You'd
// likely want to use something
const globalStateManager = {
  products: {},
}

class Product extends Component {
  // 👇
  bootstrap() {
    // Fetch our product and load up our state
    return fetch(`/api/products/${this.props.productId}`).then(response => {
      // store in our global state
      globalStateManager.products[this.props.productId] = response.json()
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
bootstrapper(app)
  .then(() => {
    // Bootstrapping is complete, now when we render our application to the DOM
    // the global products state will be populated and so our components
    // should render immediately with the data.
    ReactDOM.render(app, document.getElementById('app'))
  })
  .catch(err => console.log('Eek, error!', err))
```

Yep, not a particularly useful idea in the context of executing on the front end only, but when doing server side rendering of your react application this pattern can be extremely useful.

## API

The API is very simple at the moment, only exposing a single function.

### **bootstrapper**

The default export of the library. The function that performs the magic.

```javascript
const bootstrapper = require('react-async-bootstrapper')
```

_or_

```javascript
import bootstrapper from 'react-async-bootstrapper'
```

**Paramaters**

* **app** (React/Preact application/element, _required_)

  The react application you wish to walk.

  e.g. `<div>Hello world</div>`

* **options** (`Object`, _optional_)

  Additional options/configuration. It currently supports the following values:

  * _componentWillUnmount_: Enable this to have the `componentWillUnmount` lifecycle event be executed during the bootstrapping process. Defaults to `false`. This was added as an experimental additional flag to help with applications where they have critical disposal logic being executed within the `componentWillUnmount` lifecycle event.

* **context** (`Object`, _optional_)

  Any context you wish to expose to your application. This will become available to the entire application and could be useful for exposing configuration to your `bootstrap` methods.

  e.g. `{ myContextItem: 'foo' }`

**Returns**

A `Promise` that resolves when the bootstrapping has completed.
