import React, { Component } from 'react';
import './layout.scss';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import SaHeader from '../common/SaHeader';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../../content/LandingPage';
import RepoPage from '../../content/RepoPage';
import AboutPage from '../../content/About';
import QuestionsPage from '../../content/QuestionsPage'

class Layout extends Component {
  render() {
    return (
      <>
        <SaHeader />
        <Content>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/repos" component={RepoPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/questions" component={QuestionsPage} />
          </Switch>
        </Content>
      </>
    );
  }
}

export default Layout;
