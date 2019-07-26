import React from 'react';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction
} from 'carbon-components-react/lib/components/UIShell';
// import AppSwitcher20 from '@carbon/icons-react/lib/app-switcher/20';
import { Link } from 'react-router-dom';

// import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';

// const directions = {
//   'Bottom of the trigger button (bottom)': 'bottom',
//   'Top of the trigger button (top)': 'top',
// };


// const props = {
//   menu: () => ({
//     direction: select('Menu direction (direction)', directions, 'bottom'),
//     ariaLabel: text('ARIA label (ariaLabel)', 'Menu'),
//     iconDescription: text('Icon description (iconDescription)', ''),
//     flipped: boolean('Flipped (flipped)', false),
//     onClick: action('onClick'),
//     onFocus: action('onFocus'),
//     onKeyDown: action('onKeyDown'),
//     onClose: action('onClose'),
//     onOpen: action('onOpen'),
//   }),
//   menuItem: () => ({
//     className: 'some-class',
//     disabled: boolean('Disabled (disabled)', false),
//     requireTitle: boolean(
//       'Use hover over text for menu item (requireTitle)',
//       false
//     ),
//     onClick: action('onClick'),
//   }),
// };

const SaHeader = () => (
  <HeaderGlobalBar>
    <Header aria-label="Carbon Tutorial">
      <HeaderGlobalAction aria-label="App Switcher">
        {/* <AppSwitcher20 /> */}
        {/* <div data-overflow-menu class="bx--overflow-menu">
          <button
            class="bx--overflow-menu__trigger bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--right bx--tooltip--align-start"
            aria-haspopup="true" aria-expanded="false" id="example-468kqqk8k1m-trigger" aria-controls="example-468kqqk8k1m">
            <span class="bx--assistive-text">Overflow</span>
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style={{ 'will-change': 'transform;' }} xmlns="http://www.w3.org/2000/svg" class="bx--overflow-menu__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="3" r="1"></circle><circle cx="8" cy="8" r="1"></circle><circle cx="8" cy="13" r="1"></circle></svg>
          </button>
          <ul class="bx--overflow-menu-options" tabindex="-1" role="menu"
            aria-labelledby="example-468kqqk8k1m-trigger" data-floating-menu-direction="bottom"
            id="example-468kqqk8k1m">
            <li
              class="bx--overflow-menu-options__option  ">
              <button class="bx--overflow-menu-options__btn" role="menuitem"  title="An example option that is really long to show what should be done to handle long text"
                  data-floating-menu-primary-focus  >
                <span class="bx--overflow-menu-options__option-content">
                  An example option that is really long to show what should be done to handle long text
                </span>
              </button>
            </li>
            <li
              class="bx--overflow-menu-options__option  ">
              <button class="bx--overflow-menu-options__btn" role="menuitem"   >
                <span class="bx--overflow-menu-options__option-content">
                  Option 2
                </span>
              </button>
            </li>
            <li
              class="bx--overflow-menu-options__option  ">
              <button class="bx--overflow-menu-options__btn" role="menuitem"   >
                <span class="bx--overflow-menu-options__option-content">
                  Option 3
                </span>
              </button>
            </li>
            <li
              class="bx--overflow-menu-options__option  ">
              <button class="bx--overflow-menu-options__btn" role="menuitem"   >
                <span class="bx--overflow-menu-options__option-content">
                  Option 4
                </span>
              </button>
            </li>
            <li
              class="bx--overflow-menu-options__option  bx--overflow-menu-options__option--disabled  ">
              <button class="bx--overflow-menu-options__btn" role="menuitem"    disabled >
                <span class="bx--overflow-menu-options__option-content">
                  Disabled
                </span>
              </button>
            </li>
            <li
              class="bx--overflow-menu-options__option   bx--overflow-menu-options__option--danger ">
              <button class="bx--overflow-menu-options__btn" role="menuitem"   >
                <span class="bx--overflow-menu-options__option-content">
                  Danger option
                </span>
              </button>
            </li>
          </ul>
        </div> */}
      </HeaderGlobalAction>
      <HeaderName element={Link} to="/" prefix="">
        Sahayak
      </HeaderName>
      <HeaderGlobalBar />
      <HeaderNavigation aria-label="Carbon Tutorial">
        <HeaderMenuItem element={Link} to="/repos">About Sahayak</HeaderMenuItem>
      </HeaderNavigation>
    </Header>
  </HeaderGlobalBar>
);

export default SaHeader;
