import styled from 'styled-components';

export const Container = styled.form`
  align-self: center;
  margin-bottom: 20px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

  img {
    width: 10rem;
    height: 10rem;
    max-width: 100%;
    max-height: 100%;
    padding: 2px;
    border: 2px solid rgb(225, 225, 230);
    border-radius: 100%;
    background-position: center center;
    background-size: cover;
    background-clip: content-box;
  }

    input {
      display: none;
    }
  }
`;
