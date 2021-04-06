import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: var(--text-title);

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      width: 15rem;
      height: 15rem;
      max-width: 100%;
      max-height: 100%;
      border-radius: 100%;
      background-position: center center;
      background-size: cover;
      background-clip: content-box;
    }
    input {
      display: none;
    }
  }

  .edit-avatar-modal-submit-button {
    width: 20rem;
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
