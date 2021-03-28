import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  background: #212122;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 75px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 40px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const ProfileButton = styled.button`
  border: 0;
  display: flex;
  text-align: right;
  margin-right: 10px;
  height: 60px;
  padding-right: 10px;
  padding-left: 20px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);

  strong {
    display: block;
    color: #fff;
  }

  a {
    display: block;
    margin-top: 2px;
    font-size: 12px;
    color: #999;
  }

  &:hover {
    background: ${darken(0.25, "rgba(255, 255, 255, 0.2)")};
  }
`;

export const ProfileImage = styled.div`
  margin-right: 8px;
  margin-top: 3px;
  img {
    height: 46px;
    width: 46px;
    min-height: 46px;
    min-width: 46px;
    border-radius: 50%;
    margin-left: 20px;
    z-index: 10;
  }
`;

export const ProfileImageBorder = styled.div`
  margin-top: 3px;
  position: absolute;
  right: 3.32rem;
  img {
    height: 56px;
    width: 56px;
    height: 56px;
    width: 56px;
    border-radius: 50%;
    z-index: 9;
  }
`;

export const HeaderDivider = styled.div`
  height: 75px;
  width: 2px;
  margin-right: 20px;
  margin-left: 20px;
  background-color: #000;
`;
