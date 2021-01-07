import styled from 'styled-components';
import * as colors from '../../config/color';

export const Section = styled.section`
  padding: 20px;

  .foto-perfil {
    display: flex;
    justify-content: center;
    background: ${colors.primaryDarkColor};
    padding: 20px;
    margin-top: 20px;
    border-radius: 5px;

    .foto-item {
      position: relative;
      width: 150px;
      height: 150px;
      overflow: hidden;

      img,
      svg.img {
        width: 100%;
        height: 100%;
        color: ${colors.primaryColor};
        border-radius: 500px;
        border: 5px solid rgba(255, 255, 255, 0.1);
      }

      .foto-edit {
        position: absolute;
        bottom: 0;
        right: 0;
        border-radius: 500px;
        background: rgba(255, 255, 255, 0.1);
        z-index: 510;
        padding: 9px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.3s all ease;
        svg {
          color: #fff;
          width: 20px;
          height: 20px;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
