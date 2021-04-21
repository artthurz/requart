import styled from 'styled-components';

export const Wrapper = styled.div`
  background: var(--background); 

  main {
    flex: 1;
  }

  /*background: linear-gradient(-90deg, #4169e1, #41b9e1);*/
`;

export const ChildrenWrapper = styled.div`
  display: flex;
  margin-top: 5rem;
  height: calc(100vh - 5rem);
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
`;
