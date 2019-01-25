import React, { Component, Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './static/css/App.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'
import Home from './components/routes/Home.component'
import VideoUpload from './components/routes/VideoUpload.component'
import Header from './components/presentational/Header.component'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Fragment>
            <header className="App-header">
              <Header />
            </header>
            <Switch>
              <Route path='/upload' component={VideoUpload} />
              <Route path='/' component={Home} />
            </Switch>
          </Fragment>
        </Router>
      </div>

    );
  }
}

export default App;
