import styled from 'styled-components';

import { primaryColor, primaryDarkColor } from '../../config/color';

export const Nav = styled.nav`
  background: ${primaryColor};

  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo a {
    color: #fff;
    font-size: 1.5em;
    font-weight: bold;
    padding: 0 10px;
  }
  .menu-item {
    display: flex;
    a {
      display: flex;
      align-items: center;
      justify-content: center;

      small {
        margin-left: 5px;
      }
    }
  }
  .menu-item a {
    padding: 10px;
    color: #fff;
    transition: 0.3s ease all;
  }

  .menu-item a:hover {
    background: ${primaryDarkColor};
  }

  .active {
    background: ${primaryDarkColor};
  }

  @media (max-width: 575.98px) {
    .menu-item small {
      display: none;
    }
  }
`;
