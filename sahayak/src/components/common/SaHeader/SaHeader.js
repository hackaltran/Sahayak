import React from 'react';
import AppSwitcher20 from '@carbon/icons-react/lib/app-switcher/20';
import { Link } from 'react-router-dom';

const SaHeader = () => (
  <div className="bx--grid bx--grid--full-width sa-header">
    <div className="bx--row">
      <div className="bx--col-lg-1">
      <AppSwitcher20 />
      <div data-floating-menu-container>
      <div>
        <div data-overflow-menu className="bx--overflow-menu">
              <ul className="bx--overflow-menu-options">
                <li>option1</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bx--col-lg-10 center"><Link to="/">Sahayak</Link></div>
      <div className="bx--col-lg-1">
        <Link to="/about">ABOUT</Link>
      </div>
    </div>
  </div>
  // <HeaderGlobalBar>
  //   <Header aria-label="Carbon Tutorial">
  //     <HeaderGlobalAction aria-label="App Switcher">
  //       <AppSwitcher20 />
  //     </HeaderGlobalAction>
  //     <HeaderName element={Link} to="/" prefix="">
  //       Sahayak
  //     </HeaderName>
  //     <HeaderNavigation aria-label="Carbon Tutorial">
  //       <HeaderMenuItem element={Link} to="/about">About Sahayak</HeaderMenuItem>
  //     </HeaderNavigation>
  //   </Header>
  // </HeaderGlobalBar>
);

export default SaHeader;
