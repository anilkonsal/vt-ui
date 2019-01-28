import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { Button, Header, Icon, Segment, Dimmer, Loader } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import VideoList from '../presentational/video/VideoList.component'

export default class VideoUpload extends Component {

  state = {
    filesSelected: [],
    files: [],
    isUploading: false,
    shouldFetch: false,
    videos: []
  }

  constructor(props) {
    super(props);
    this.updateShouldFetch = this.updateShouldFetch.bind(this)
  }

  updateShouldFetch() {
    if (this.state.shouldFetch) {
      this.setState({ shouldFetch: false })
    }
  }

  uploadFile = (video, thumb, name) => {
    this.setState({ isUploading: true })
    return axios.post(`${process.env.REACT_APP_API_HOST}/v1/videos`, { video, thumb, name }).then((res) => {
      this.setState({ isUploading: false, shouldFetch: true })
    }).catch(e => {
      this.setState({ isUploading: false })
    })
  }

  onDrop = (acceptedFiles, rejectedfiles) => {
    const me = this
    let { filesSelected } = this.state
    let newAcceptedFiles = []

    if (filesSelected.length > 0) {
      newAcceptedFiles = acceptedFiles.filter(a => {
        let result = false

        for (var i = 0; i <= filesSelected.length - 1; i++) {
          let s = filesSelected[i]
          result = !(a.name === s.name && a.size === s.size && a.lastModified === s.lastModified)
          break;
        }
        return result
      })
    } else {
      newAcceptedFiles = acceptedFiles
    }


    filesSelected = [...filesSelected, ...newAcceptedFiles]

    this.setState({ filesSelected })

    newAcceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {

        const blob = new Blob([reader.result], { type: file.type });
        const url = URL.createObjectURL(blob);
        const videoBase64 = 'data:video/mp4;base64,' + btoa(new Uint8Array(reader.result).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        const video = document.createElement('video');
        let imageData
        const timeupdate = function () {
          if (snapImage()) {
            video.removeEventListener('timeupdate', timeupdate);
            video.pause();
          }
        };
        video.addEventListener('loadeddata', function () {
          if (snapImage()) {
            me.uploadFile(videoBase64, imageData, file.name).then(() => {
              me.setState({ files: [...me.state.files] })
            })
            video.removeEventListener('timeupdate', timeupdate);
          }
        });


        const snapImage = function () {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          const image = canvas.toDataURL();
          imageData = image;

          const success = image.length > 100000;
          if (success) {
            const img = document.createElement('img');
            img.src = image;
            img.classList.add('ui')
            img.classList.add('image')
            URL.revokeObjectURL(url);
          }
          return success;
        };
        video.addEventListener('timeupdate', timeupdate);
        video.preload = 'metadata';
        video.src = url;
        video.muted = true;
        video.playsInline = true;
        video.play();
      };

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsArrayBuffer(file);
    });
  }

  render() {
    const state = this.state;

    return (
      <Container>
        <div>
          <h1>Video Upload</h1>
          <div>
            <Segment placeholder style={{ textAlign: 'center' }}>
              {
                state.isUploading && (
                  <Dimmer active inverted>
                    <Loader >Uploading...</Loader>
                  </Dimmer>)
              }
              <Dropzone
                accept='video/mpeg, video/mp4, video/x-mpeg'
                onDrop={this.onDrop}
                className='attachment-dropzone'>
                <div>
                  <Header icon>
                    <Icon name='video file outline' />
                    Upload your video by Drag/Drop on this area or clicking the button below.
                </Header>
                  <Button primary>Upload Video</Button>
                </div>
              </Dropzone>
            </Segment>
            <div className='ui small images'>
              <div id='vids'></div>
            </div>
            <VideoList shouldFetch={state.shouldFetch} onDone={this.updateShouldFetch} />
          </div>
        </div>
      </Container>
    )
  }
}
