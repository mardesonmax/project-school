import styled from 'styled-components';

export const Section = styled.section`
  padding: 20px;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      text-align: center;
      font-size: 2em;
    }
  }
`;

export const Title = styled.h1`
  color: red;
  text-align: center;
  font-size: 2.5em;

  small {
    font-weight: bolder;
    font-size: 3em;
  }
`;
