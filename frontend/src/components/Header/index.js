import React from "react";
// import { Link } from 'react-router-dom';

import { useAuth } from "../../contexts/auth";

import logo from "../../assets/images/logo.svg";
import profileCircle from "../../assets/images/profileCircle.svg";
import {
  Container,
  Content,
  Profile,
  ProfileImage,
  ProfileImageBorder,
  Divisor
} from "./styles";
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core"
import { MdAdd } from "react-icons/md";

const useIconButtonStyle = makeStyles((theme) => ({
  root: {
    color: "#5196FF", 
    backgroundColor: "rgba(81,150,255,0.2)"
  },
}));

export default function Header() {
  const iconButton = useIconButtonStyle();
  const { user } = useAuth();
  console.log(user);

  return (
    <Container>
      <Content>
        {/* <Link to="/dashboard"> */}
        <nav>
          <img src={logo} alt="Requart" />
        </nav>
        {/* </Link> */}

        <aside>
          <IconButton className={iconButton.root} color="primary">
            <MdAdd />
          </IconButton>

          <Divisor/>

          <Profile>
            <aside>
              <strong>{user.name}</strong>
              {/* <Link to="/profile">Meu perfil</Link> */}

              <ProfileImageBorder>
                <img src={profileCircle} alt="ProfileCircle" />
              </ProfileImageBorder>
              <ProfileImage>
                <img src={user.avatar.url} alt="Profile" />
              </ProfileImage>
            </aside>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
