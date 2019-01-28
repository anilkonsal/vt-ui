import React, { Component } from 'react'
import { Segment, Modal } from 'semantic-ui-react'
import axios from 'axios'

export default class VideoList extends Component {
  state = {
    videos: [],
    open: false
  }

  show = (dimmer, videoName) => () => this.setState({ dimmer, videoName, open: true, })
  close = () => this.setState({ open: false })

  componentDidMount(props) {
    this.fetchVideos()
  }

  componentWillReceiveProps(props) {
    if (this.props.shouldFetch) {
      this.fetchVideos()
      if (this.props.onDone) {
        this.props.onDone()
      }
    }
  }

  fetchVideos = (userId) => {
    return axios.get(`${process.env.REACT_APP_API_HOST}/v1/videos`).then((res) => {
      this.setState({ videos: res.data })
    }).catch(e => {
      console.error(e)
    })
  }


  render() {
    const { state } = this
    const { open, dimmer } = state
    return (
      <div>
        <h2>Videos</h2>
        <Segment placeholder>
          {
            state.videos.length > 0 ? (
              <React.Fragment>

                <Modal dimmer={dimmer} size='small' open={open} onClose={this.close}>
                  <Modal.Header>Select a Photo</Modal.Header>
                  <Modal.Content image>
                    <Modal.Description>
                      <video width="640" height="480" controls>
                        <source src={`${process.env.REACT_APP_API_HOST}/uploads/${state.videoName}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
                <div className='ui small images' >
                  {
                    state.videos.map((video, i) => {
                      return (
                        <img src={`${process.env.REACT_APP_API_HOST}/uploads/${video.name}.jpg`}
                          key={i}
                          onClick={this.show('inverted', video.name)}
                          style={{ cursor: 'pointer' }}
                          alt={video.name}
                          className='ui image bordered' />
                      )
                    })
                  }
                </div>
              </React.Fragment>
            ) : (
                <div className='ui bottom attached warning message'>
                  <i className='icon info'></i>
                  No videos yet
                </div>
              )
          }
        </Segment>
      </div>
    )
  }
}
