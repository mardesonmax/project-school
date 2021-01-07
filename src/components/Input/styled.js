import styled from 'styled-components';
import * as colors from '../../config/color';

export const Label = styled.label`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2em;
  color: ${colors.primaryDarkColor};

  input {
    max-width: 380px;
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    border: 2px solid ${colors.primaryDarkColor};
    border-radius: 500px;
    transition: 0.3s ease all;

    &:focus {
      max-width: 420px;
      border-color: ${colors.primaryColor};
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    }
  }
`;
