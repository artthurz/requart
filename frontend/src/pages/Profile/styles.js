import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  width: 100%;
  height: 100%;

  .edit-user-body {
    height: 40rem;
    width: 1200px;
    background-color: rgb(32, 32, 36);
    position: relative;
    padding: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .avatar-button {
    position: relative;
    margin-top: 3rem;
    margin-bottom: 3rem;
    background: none;
    border: none;
  }

  .edit-icon {
    color: rgb(225, 225, 230);
    font-size: 1.8rem;
    position: absolute;
    bottom: 25px;
    right: 35px;
  }

  img {
    width: 10rem;
    height: 10rem;
    max-width: 100%;
    max-height: 100%;
    padding: 4px;
    border: 4px solid rgb(225, 225, 230);
    border-radius: 100%;
    background-position: center center;
    background-size: cover;
    background-clip: content-box;

    &:hover {
      opacity: 0.8;
    }
  }
`;
export const FormContainer = styled.form`
  width: 50%;
  color: var(--text-title);

  button {
    border: none;
    align-self: flex-start;
    background: none;
    font-size: 1rem;
    color: var(--green);

    &:hover {
      text-decoration: underline;
    }
  }

  h4 {
    color: #fff;
  }

// estilo input
  .MuiOutlinedInput-input {
    color: #fff;
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: rgb(135, 134, 139);
  }

  label {
    color: rgb(135, 134, 139);
  }
// fim estilo input

  .edit-profile-modal-submit-button {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: var(--green);
    color: #fff;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: bold;

    transition: filter 0.2s;

    &:hover {
      background: var(--green);
      filter: brightness(0.9);
    }
  }
`;
