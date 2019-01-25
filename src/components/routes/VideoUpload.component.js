import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { Button, Header, Icon, Segment, Dimmer, Loader, Image } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import VideoList from '../presentational/video/VideoList.component'

export default class VideoUpload extends Component {

  state = {
    endpoint: process.env.REACT_APP_API_HOST,
    filesSelected: [],
    files: [],
    isUploading: false,
    shouldFetch: false,
    videos: []
  }

  updateShouldFetch() {
    this.setState({ shouldFetch: false })
  }

  uploadFile = (file, name, type) => {
    this.setState({ isUploading: true })
    return axios.post('http://localhost:3000/v1/videos', { file, name }).then((res) => {
      this.setState({ isUploading: false, shouldFetch: true })

    }).catch(e => {
      this.setState({ isUploading: false })
    })
  }

  onDrop = (acceptedFiles, rejectedfiles) => {
    let { filesSelected } = this.state

    console.log('Files Accepted: ', acceptedFiles)
    console.log('Files Rejeccted: ', rejectedfiles)

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
        this.uploadFile(reader.result, file.name).then(() => {
          this.setState({ files: [...this.state.files] })
        })

      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsDataURL(file);
    });
  }

  render() {
    const s = this.state;

    return (
      <Container>
        <div>
          <h1>Video Upload</h1>
          <div>
            <Segment placeholder style={{ textAlign: 'center' }}>
              {
                s.isUploading && (
                  <Dimmer active inverted>
                    <Loader >Uploading...</Loader>
                  </Dimmer>)
              }
              <Dropzone
                // accept='video/mpeg, video/mp4, video/x-mpeg, image/jpg, image/png'
                onDrop={this.onDrop}
                className='attachment-dropzone'>
                <div>
                  <Header icon>
                    <Icon name='video file outline' />
                    No documents are listed for this customer.
                </Header>
                  <Button primary>Add Document</Button>
                </div>
              </Dropzone>
            </Segment>
            <VideoList shouldFetch onDone={this.updateShouldFetch} />
          </div>

        </div>


      </Container>
    )
  }
}
