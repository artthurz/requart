import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: var(--text-title);

  .new-user-modal-submit-button {
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
