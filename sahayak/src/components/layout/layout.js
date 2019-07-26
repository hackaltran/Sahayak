import React, { Component } from 'react';
import './layout.scss';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import SaHeader from '../common/SaHeader';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../../content/LandingPage';
import RepoPage from '../../content/RepoPage';

class Layout extends Component {
  render() {
    return (
      <>
        <SaHeader />
        <Content>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/repos" component={RepoPage} />
          </Switch>
        </Content>
      </>
    );
  }
}

export default Layout;
