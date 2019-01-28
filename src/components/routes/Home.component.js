import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import VideoList from '../presentational/video/VideoList.component'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  render() {
    return (
      <Container>
        <div>
          <div className="home-banner" >
            <div className="home-banner__content" >
              <h1 className='font-weight-light'>The best place to upload and share your videos</h1>
              <Link className='ui inverted button' to={'/upload'}>Start uploading now</Link>
            </div>
          </div>
          <VideoList shouldFetch />

        </div>
      </Container>
    )
  }
}
