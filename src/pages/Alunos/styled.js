import styled from 'styled-components';
import * as colors from '../../config/color';

export const Section = styled.section`
  padding: 20px;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    tbody tr td,
    thead tr th {
      padding: 8px;
      text-align: center;
    }

    thead tr th {
      padding-top: 12px;
      padding-bottom: 12px;
      background: ${colors.primaryDarkColor};
      color: #fff;
    }

    tbody tr td {
      color: ${colors.primaryDarkColor};
    }

    .foto {
      display: flex;
      justify-content: center;
      img {
        width: 60px;
        height: 60px;
        border-radius: 500px;
      }
    }

    tbody tr:nth-child(even) {
      background: #f2f2f2;
    }

    .btn {
      width: 50px;
      padding: 0;
    }

    .btn button,
    .btn a {
      height: 40px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 500px;
      transition: 0.3s ease all;
    }
    .btn button:hover,
    .btn a:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
    .edit a {
      color: ${colors.primaryDarkColor};
    }

    .delete button {
      background: none;
      margin: 0;
      color: ${colors.primaryColor};
    }
  }

  // Mobile
  @media (max-width: 575.98px) {
    .email,
    .sobrenome {
      display: none;
    }

    table .foto {
      svg,
      img {
        width: 40px;
        height: 40px;
      }
    }
  }
`;
