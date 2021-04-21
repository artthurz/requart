import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Body = styled.div`
  height: 40rem;
  width: 1200px;
  background-color: #fff;

  .project-dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 20px;
    }
  }
`;
