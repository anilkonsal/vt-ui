import React, { Component } from 'react'
import { Input, Menu, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import logo from '../../static/img/viewtube.png'

export default class Header extends Component {
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
            <Menu.Item as={Link} to='/upload' >
              <Icon name='upload' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    )
  }
}
