import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { Nav, NavItem, Navbar } from "react-bootstrap";
import Routes from "./Routes";
// import RouteNavItem from "./components/RouteNavItem";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/Menu';
import RaisedButton from 'material-ui/Button';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      open: false
    };
  }

  async componentDidMount() {
    // try {
    //   if (await authUser()) {
    //     this.userHasAuthenticated(true);
    //   }
    // }
    // catch(e) {
    //   alert(e);
    // }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    // signOutUser();

    this.userHasAuthenticated(false);

    this.props.history.push("/login");
  }
  handleToggle = () => this.setState({ open: !this.state.open });
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      // !this.state.isAuthenticating &&
      <div className="App container">
        {/* <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Scratch</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : [
                    <RouteNavItem key={1} href="/signup">
                      Signup
                    </RouteNavItem>,
                    <RouteNavItem key={2} href="/login">
                      Login
                    </RouteNavItem>
                  ]}
            </Nav>
          </Navbar.Collapse>
        </Navbar> */}
        <div>
          <RaisedButton
            label="Toggle Drawer"
            onClick={this.handleToggle}
          />
          <Drawer open={this.state.open}>
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
          </Drawer>
        </div>
        <Routes childProps={childProps} />
      </div >
    );
  }
}

export default withRouter(App);