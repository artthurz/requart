import React from "react";
// import { Link } from 'react-router-dom';

import { useAuth } from "../../contexts/auth";
import logo from "../../assets/images/logo.svg";
import profileCircle from "../../assets/images/profileCircle.svg";
import {
  Container,
  Content,
  ProfileButton,
  ProfileImage,
  ProfileImageBorder,
  HeaderDivider,
} from "./styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import { MdAdd } from "react-icons/md";

const useIconButtonStyle = makeStyles((theme) => ({
  root: {
    color: "#5196FF",
    backgroundColor: "rgba(81,150,255,0.2)",
  },
}));

export default function Header() {
  const iconButton = useIconButtonStyle();
  const [profileMenuAnchor, setProfileMenuAnchor] = React.useState(null);
  const [addMenuAnchor, setAddMenuAnchor] = React.useState(null);

  const { user } = useAuth();
  console.log(user);

  const handleOpenAddMenu = (event) => {
    setAddMenuAnchor(event.currentTarget);
  };

  const handleCloseAddMenu = () => {
    setAddMenuAnchor(null);
  };

  const handleOpenProfileMenu = (event) => {
    setAddMenuAnchor(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAddMenuAnchor(null);
  };

  return (
    <Container>
      <Content>
        {/* <Link to="/dashboard"> */}
        <nav>
          <img src={logo} alt="Requart" />
        </nav>
        {/* </Link> */}

        <aside className="Header">
          <IconButton
            onClick={handleOpenAddMenu}
            className={iconButton.root}
            color="primary"
          >
            <MdAdd />
          </IconButton>

          <HeaderDivider />

          <ProfileButton
            onClick={handleOpenProfileMenu}
          >
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
          </ProfileButton>
        </aside>
      </Content>
    </Container>
  );
}
