import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  background: rgb(61, 60, 66);
  padding: 0 30px;

`;

export const TopMenuLink = styled.div`
  padding: 2px;

  h1 {
    color: white;
    font-size: 18px;
    border-bottom: 2px solid #5196ff;
    font-weight: 100 !important;
  }
`;

export const LinksContainer = styled.aside`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 500px;
  
  a {
    margin-right: 30px;
  }

  .MuiAppBar-colorPrimary {
      background-color: transparent;
      box-shadow: none;

      a{
        margin-right: 0;
      }

      .PrivateTabIndicator-colorSecondary-6 {
          background-color: #5196ff;
      }
    }

  
`;

export const Content = styled.div`
  height: 72px;
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
  height: 60px;
  padding-right: 10px;
  padding-left: 20px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
  transition: background 0.2s ease 0s;

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
  position: relative;
  width: 3.2rem;
  height: 3.2rem;
  flex-shrink: 0;
  margin-left: 10px;

  img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    padding: 2px;
    border: 2px solid rgb(225, 225, 230);
    border-radius: 100%;
    background-position: center center;
    background-size: cover;
    background-clip: content-box;
  }
`;

export const HeaderDivider = styled.div`
  height: 72px;
  width: 2px;
  margin-right: 20px;
  margin-left: 20px;
  background-color: #000;
`;

export const Menu = styled.div`
  position: absolute;
  right: ${(props) => props.right};
  top: 72px;
  padding: 30px 0;
  width: ${(props) => props.width};
  background: rgba(33, 33, 34, 0.9);
  border-radius: 15px;
  box-shadow: rgb(0 0 0 / 60%) 0px 5px 20px;
  transition: opacity 0.2s ease 0s, visibility 0.2s ease 0s;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  z-index: 3;

  strong {
    font-size: 18px;
    width: 300px;
  }

  h2 {
    color: #fff;
    font-size: 24px;
    padding: 0 24px;
    display: flex;
    justify-self: flex-start;
    margin-bottom: 20px;
  }

  h1 {
    font-size: 12px;
    color: #e2e2e2;
    padding: 0 24px;
    display: flex;
    justify-self: flex-start;
  }

  a {
    display: flex;
    flex-direction: row-reverse;
    -webkit-box-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    align-items: center;
    font-size: 16px;
    color: rgb(225, 225, 230);
    padding: 12px 24px;
    transition: background 0.2s ease 0s;
    cursor: pointer;
    background: transparent;
    border: none;
    width: 100%;

    span {
      margin-left: 24px;
      font-weight: bold;
      color: #e4e4e8;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #5196ff;
    }

    :hover {
      background: ${darken(0.25, "#212122")};
    }
  }

  :before {
    content: "";
    position: absolute;
    top: -8px;
    right: 19px;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0px 8px 8px;
    border-color: transparent transparent rgb(32, 32, 36);
  }
`;

export const DisableMenu = styled.div`
  background-color: transparent !important;
  position: fixed;
  inset: 0px;
  z-index: 2;
`;

export const ProfileCard = styled.div`
  position: relative;
  width: 5.2rem;
  height: 5.2rem;
  flex-shrink: 0;
  margin-left: 20px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: flex-start;

  img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    padding: 2px;
    border-radius: 100%;
    background-position: center center;
    background-size: cover;
    background-clip: content-box;
  }

  strong {
    color: #fff;
    display: flex;
    justify-self: flex-start;
    padding: 0 24px;
  }

  h1 {
    font-size: 10px;
    color: #e2e2e2;
    padding: 0 24px;
    display: flex;
    justify-self: flex-start;
    margin-top: 4px;
  }
`;

export const AdminBadge = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  max-width: 50px;
  margin-left: 24px;
  margin-top: 10px;
  padding: 6px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 10px;
    color: #e2e2e2;
    padding: 0;
    margin: 0;
  }
`;
