import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Routes from "./Routes";
import AppShell from './components/core/AppShell'
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
        <AppShell>
          <Routes childProps={childProps} />
        </AppShell>

      </div >
    );
  }
}

export default withRouter(App);