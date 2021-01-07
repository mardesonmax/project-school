import styled from 'styled-components';
import * as colors from '../../config/color';

export const Section = styled.section`
  padding: 20px;
`;

export const ContainerProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerAlbum = styled.div`
  display: grid;
  flex-wrap: wrap;
  grid-template-columns: repeat(4, 1fr);

  h1 {
    margin-top: 30px;
    grid-column-start: 1;
    grid-column-end: 5;
  }

  .img-item {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    img {
      width: 100%;
    }
    button {
      margin-top: 5px;
    }
  }

  // Mobile
  @media (max-width: 575.98px) {
    .img-item {
      grid-column-start: 1;
      grid-column-end: 5;
    }
  }
`;

export const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  border-radius: 100%;
  border: 4px dashed ${colors.primaryColor};
  background: #ddd;
  cursor: pointer;
  color: ${colors.primaryDarkColor};
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
  input {
    display: none;
  }
`;
