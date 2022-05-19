import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import GitHubUser from './GitHubUser';
import GitHub from './GitHub';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import JumboTronComponent from './Jumbotron';
import Products from './Products';
import {Button} from 'react-bootstrap';
import Rating from './Rating';
import UserForm from './UserForm';

class App extends Component {

  render() {

    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default App;

class Header extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/github">GitHub</Nav.Link>
                  <Nav.Link href="/rating">Rating</Nav.Link>
                </Nav>
              </Navbar.Collapse>
          </Navbar>
          <Switch>
          <Route path="/github/user/:login/:id" component={GitHubUser} />
            <Route path= "/github" component={GitHub} />
            <Route path= "/rating" component={Rating} />
            <Route exact path= "/" component={Home} />
            <Route path= "/*" component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        Home
      </div>
    )
  }
}

class NotFound extends Component {
  render() {

    return (
      <div>
        Not Found
      </div>
    )
  }
}
