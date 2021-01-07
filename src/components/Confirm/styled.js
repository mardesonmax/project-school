import styled from 'styled-components';
import * as colors from '../../config/color';

export const Section = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;

  .container {
    color: ${colors.primaryColor};
    background: #fff;
    padding: 20px;
    border-radius: 5px;
  }

  .container .btn-confirm {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .container .btn-confirm .no {
    background-color: ${colors.successColor};
  }

  .container .btn-confirm .no:hover {
    background-color: ${colors.primaryDarkColor};
  }
`;
