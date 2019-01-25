import React, { Component } from 'react'
import { Input, Menu, Container } from 'semantic-ui-react'
import { Router, Link } from 'react-router-dom'
import logo from '../../static/img/viewtube.png'

export default class MenuExampleSecondary extends Component {
  state = { activeItem: 'home' }


  render() {

    return (
      <Container>
        <Menu secondary>
          <Menu.Item as={Link} to='/' >
            <h1 className='logo'><img src={logo} /></h1>
          </Menu.Item>
          <Menu.Item style={{ flexGrow: 6 }}>
            <Input fluid icon='search' placeholder='Search...' size='big' />
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item name='Upload' as={Link} to='/upload' />
          </Menu.Menu>
        </Menu>
      </Container>
    )
  }
}