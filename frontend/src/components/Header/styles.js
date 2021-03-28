import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  background: #212122;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 93px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      height: 34px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  text-align: right;
  margin-right: 10px;
  height: 75px;
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

    &:hover {
      color: ${darken(0.1, "#999")};
    }

    &:active {
      color: #4169e1;
    }
  }
`;

export const ProfileImage = styled.div`
  margin-right: 5px;
  img {
    height: 56px;
    width: 56px;
    min-height: 56px;
    min-width: 56px;
    border-radius: 50%;
    margin-left: 20px;
    z-index: 10;
  }
`;

export const ProfileImageBorder = styled.div`
  position: absolute;
  right: 3.12rem;
  img {
    height: 66px;
    width: 66px;
    height: 66px;
    width: 66px;
    border-radius: 50%;
    z-index: 9;
  }
`;

export const Divisor = styled.div`
  height: 75px;
  width: 2px;
  margin-right: 20px;
  margin-left: 20px;
  background-color: #000;
`;
