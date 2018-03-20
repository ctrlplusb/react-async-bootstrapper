/* eslint-disable react/prop-types */

import React, { Component } from 'react'
import asyncBootstrapper from '../'

describe('asyncBootstrapper()', () => {
  it('works', () => {
    const values = []

    class Foo extends Component {
      asyncBootstrap() {
        values.push(this.props.id)
        return true
      }

      render() {
        return <div>{this.props.children}</div>
      }
    }

    const app = (
      <Foo id={1}>
        <div>
          <h1>Test</h1>
        </div>
        <Foo id={2}>
          <Foo id={4} />
        </Foo>
        <Foo id={3} />
      </Foo>
    )

    return asyncBootstrapper(app).then(() =>
      expect(values).toEqual([1, 2, 4, 3]),
    )
  })

  it('passes options through if given', () => {
    const values = []

    class Foo extends Component {
      asyncBootstrap(options) {
        values.push({ ...options, id: this.props.id })
        return true
      }

      render() {
        return <div>{this.props.children}</div>
      }
    }

    const app = (
      <Foo id={1}>
        <div>
          <h1>Test</h1>
        </div>
        <Foo id={2}>
          <Foo id={4} />
        </Foo>
        <Foo id={3} />
      </Foo>
    )

    return asyncBootstrapper(app, { key1: 'val1' }).then(() =>
      expect(values).toEqual([
        { id: 1, key1: 'val1' },
        { id: 2, key1: 'val1' },
        { id: 4, key1: 'val1' },
        { id: 3, key1: 'val1' },
      ]),
    )
  })
})
