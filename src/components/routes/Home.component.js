import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

export default class Home extends Component {
  render() {
    return (
      <Container>
        <div>

          <div className="home-banner" >
            <div className="home-banner__content" >
              <h1>Hello World</h1>
            </div>
          </div>

        </div>
      </Container>
    )
  }
}
