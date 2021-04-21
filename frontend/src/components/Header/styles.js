import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.header`
  position: fixed;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  height: 5rem;
  padding: 0px 30px;
  background: rgb(32, 32, 36);
  top: 0px;
  z-index: 9998;
  transition: all 0.5s ease-in-out 0s;
  box-shadow: rgb(18 18 20) 0px 0.2rem 2rem;
  opacity: 1;
  transform: translateY(0px);
  visibility: visible;
`;

export const LinksContainer = styled.aside`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 400px;

  a {
    margin-right: 30px;
  }

  .MuiAppBar-colorPrimary {
    background-color: transparent;
    box-shadow: none;

    a {
      margin-right: 0;
    }

    .PrivateTabIndicator-colorSecondary-6 {
      background-color: #5196ff;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1366px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  color: rgb(255, 255, 255);
  padding: 12px 0px;

  div {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    z-index: 2;

    img {
      height: 40px;
    }
  }

  .menus-section {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: end;
    justify-content: flex-end;
    flex: 1 1 0%;
    z-index: 2;
  }

  .profile-button-and-menu {
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    height: 100%;
    padding-left: 12px;
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
    background: ${darken(0.25, 'rgba(255, 255, 255, 0.2)')};
  }
`;

export const ProfileImage = styled.div`
  position: relative;
  flex-shrink: 0;
  margin-left: 10px;

  img {
    width: 3.2rem !important;
    height: 3.2rem !important;
    max-width: 3.2rem !important;
    max-height: 3.2rem !important;
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
  position: absolute !important;
  right: 0;
  top: 72px;
  padding: 30px 0;
  width: ${(props) => props.width};
  background: rgba(33, 33, 34, 0.9);
  border-radius: 15px;
  box-shadow: rgb(0 0 0 / 60%) 0px 5px 20px;
  transition: opacity 0.2s ease 0s, visibility 0.2s ease 0s;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  z-index: 3;
  flex-direction: column;

  strong {
    font-size: 18px;
    width: 300px;
  }

  h2 {
    width: 100%;
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

  span {
      margin-left: 24px;
      font-weight: bold;
      color: #e4e4e8;
    }

  .menu-item-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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

    svg {
      width: 20px;
      height: 20px;
      color: #5196ff;
    }

    :hover {
      background: ${darken(0.25, '#212122')};
    }
  }

  :before {
    content: '';
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
  position: absolute;
  inset: 0px;
  z-index: 2;
`;

export const ProfileCard = styled.div`
  position: relative !important;
  width: ${(props) => props.width};
  height: 10rem;
  padding: 15px;
  flex-shrink: 0 !important;
  justify-content: center !important;
  align-items: flex-start !important;

  div {
    width: 100%;
    height: 100%;

    img {
      width: 8rem !important;
      height: 8rem !important;
      max-width: 8rem !important;
      max-height: 8rem !important;
      padding: 2px;
      border-radius: 100%;
      background-position: center center;
      background-size: cover;
      background-clip: content-box;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      strong {
        color: #fff;
        padding: 0 24px;
        width: unset;
      }

      h1 {
        font-size: 10px;
        color: #e2e2e2;
        padding: 0 24px;
        margin-top: 4px;
      }
    }
  }
`;

export const AdminBadge = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  max-width: 60px;
  height: unset !important;
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
    padding: 0 !important;
    margin: 0 !important;
    align-self: center;
    justify-self: center;
  }
`;
