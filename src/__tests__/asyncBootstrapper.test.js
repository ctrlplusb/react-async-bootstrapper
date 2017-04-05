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
      expect(values).toEqual([1, 2, 4, 3]))
  })
})
