import React, { Component } from 'react'
import { Icon, Segment } from 'semantic-ui-react'
import axios from 'axios'

export default class VideoList extends Component {
  state = {
    endpoint: process.env.REACT_APP_API_HOST,
    videos: []
  }

  constructor(props) {
    super(props)
    this.fetchVideos.bind(this)
  }

  componentDidMount(props) {
    this.fetchVideos()
  }

  componentDidUpdate(props) {
    if (this.props.shouldFetch) {
      this.fetchVideos()
    }
    this.props.onDone()
  }



  fetchVideos = (userId) => {
    return axios.get(`http://localhost:3000/v1/videos`).then((res) => {
      this.setState({ videos: res.data })
    }).catch(e => {
      console.error(e)
    })
  }

  render() {
    const { state } = this
    const { shouldFetch, onDrop } = this.props

    console.log('shouldFetch: ', shouldFetch)

    return (
      <div>
        <h2>Videos</h2>
        <Segment placeholder>
          {
            state.videos.length > 0 && (
              <div className='ui grid' >
                {
                  state.videos.map(video => {
                    return (
                      <div className='column'>
                        <img src={`http://localhost:3000/uploads/${video.name}`} alt={video.name} height='150px' className='ui fluid bordered image' />
                      </div>
                    )
                  })
                }
              </div>
            )
          }
        </Segment>
      </div>
    )
  }
}
