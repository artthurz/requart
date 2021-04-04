import styled from "styled-components";

export const Body = styled.div`
  height: calc(100% - 80px);
  background-color: #fff;

  .user-dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 20px;
    }
  }
`;

export const ProfileImage = styled.div`
  position: relative;
  width: 4.2rem;
  height: 4.2rem;
  flex-shrink: 0;
  margin-left: 10px;

  img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    padding: 2px;
    border-radius: 100%;
  }
`;