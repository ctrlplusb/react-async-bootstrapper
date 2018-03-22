/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react'
import asyncBootstrapper from '../'

describe('asyncBootstrapper()', () => {
  let values = []
  let actualContext

  class DeprecatedAPI extends Component {
    asyncBootstrap() {
      values.push(this.props.id)
      return true
    }

    render() {
      return <div>{this.props.children}</div>
    }
  }

  class NewAPI extends Component {
    bootstrap() {
      values.push(this.props.id)
      actualContext = this.context
      return true
    }

    render() {
      return <div>{this.props.children}</div>
    }
  }

  const app = Foo => (
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

  beforeEach(() => {
    values = []
  })

  it('deprecated API', () =>
    asyncBootstrapper(app(DeprecatedAPI)).then(() =>
      expect(values).toEqual([1, 2, 4, 3]),
    ))

  it('new API', () =>
    asyncBootstrapper(app(NewAPI), null, { bespokeContext: true }).then(() => {
      expect(values).toEqual([1, 2, 4, 3])
      expect(actualContext).toEqual({
        bespokeContext: true,
        reactAsyncBootstrapperRunning: true,
      })
    }))
})
