import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import logo from "../../assets/images/logo.svg";
import {
  Container,
  Content,
  ProfileButton,
  ProfileImage,
  Menu,
  HeaderDivider,
  ProfileCard,
  AdminBadge,
  DisableMenu,
  TopMenuLink,
  LinksContainer,
} from "./styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import {
  MdAdd,
  MdAssignmentInd,
  MdExitToApp,
  MdLowPriority,
  MdLibraryBooks,
  MdFlag,
} from "react-icons/md";
import { BiStats } from "react-icons/bi";
import NewProjectModal from "../../components/NewProjectModal";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { backgrounds } from "polished";

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component={Link}
      {...props}
    />
  );
}

const useIconButtonStyle = makeStyles((theme) => ({
  root: {
    color: "#5196FF",
    backgroundColor: "rgba(81,150,255,0.2)",
    transition: "transform 250ms linear, filter 250ms linear",
  },
}));
const useRotatedIconButtonStyle = makeStyles((theme) => ({
  root: {
    color: "#5196FF",
    backgroundColor: "rgba(81,150,255,0.2)",
    transform: "rotate(45deg)",
    transition: "transform 250ms linear, filter 250ms linear",
  },
}));

const useDividerStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
}));

export default function Header() {
  const [value, setValue] = useState(0);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const iconButton = useIconButtonStyle();
  const iconButtonRotated = useRotatedIconButtonStyle();
  const divider = useDividerStyle();
  const [profileMenuShow, setProfileMenuShow] = React.useState(null);
  const [addMenuShow, setAddMenuShow] = React.useState(null);

  const { user, Logout } = useAuth();
  console.log(user);
  async function handleLogout() {
    Logout();
  }

  const handleOpenAddMenu = () => {
    setAddMenuShow(!addMenuShow);
  };

  const handleCloseAddMenu = () => {
    setAddMenuShow(false);
  };

  const handleOpenProfileMenu = () => {
    setProfileMenuShow(!profileMenuShow);
  };

  const handleCloseProfileMenu = () => {
    setProfileMenuShow(false);
  };

  const handleOpenNewProjectModalOpen = () => {
    setIsNewProjectModalOpen(true);
    setAddMenuShow(false);
  };

  const handleCloseNewProjectModalClose = () => {
    setIsNewProjectModalOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Content>
          <LinksContainer>
            <Link to="/" >
              <nav onClick={() => handleChange(0)}>
                <img src={logo} alt="Requart" />
              </nav>
            </Link>

            <AppBar position="static">
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
              >
                <LinkTab label="Home" to="/" {...a11yProps(0)} />
                <LinkTab label="Projetos" to="/projects" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
          </LinksContainer>
        <aside>
          <IconButton
            onClick={handleOpenAddMenu}
            className={addMenuShow ? iconButtonRotated.root : iconButton.root}
            color="primary"
          >
            <MdAdd />
          </IconButton>
          {addMenuShow && <DisableMenu onClick={handleCloseAddMenu} />}
          <Menu visible={addMenuShow} right="280px" width="360px">
            <h2>Criar</h2>
            <a>
              <div onClick={() => handleOpenNewProjectModalOpen()}>
                <span>Projeto</span>
                <h1>Crie um novo projeto dentro da plataforma.</h1>
              </div>
              <div>
                <MdLibraryBooks />
              </div>
            </a>
            <Divider variant="middle" className={divider.root} />
            <a>
              <div>
                <span>Prioridade</span>
                <h1>Cria uma nova prioridade para atribuir aos requisitos.</h1>
              </div>
              <div>
                <MdFlag />
              </div>
            </a>
            <a>
              <div>
                <span>Situação</span>
                <h1>Cria uma nova situação para atribuir aos requisitos.</h1>
              </div>
              <div>
                <BiStats />
              </div>
            </a>
            <a>
              <div>
                <span>Complexidade</span>
                <h1>
                  Cria uma nova complexidade para atribuir aos requisitos.
                </h1>
              </div>
              <div>
                <MdLowPriority />
              </div>
            </a>
          </Menu>

          <HeaderDivider />

          <ProfileButton onClick={handleOpenProfileMenu}>
            <aside>
              <strong>{user.name}</strong>
              {/* <Link to="/profile">Meu perfil</Link> */}

              <ProfileImage>
                <img src={user.avatar.url} alt="Profile" />
              </ProfileImage>
            </aside>
          </ProfileButton>
          <Menu visible={profileMenuShow} right="40px" width="380px">
            <ProfileCard>
              <aside>
                <img src={user.avatar.url} alt="Profile" />
                <div>
                  <strong>{user.name}</strong>
                  <h1>{user.email}</h1>
                  <AdminBadge>
                    <h1>{user.admin ? "Admin" : "User"}</h1>
                  </AdminBadge>
                </div>
              </aside>
            </ProfileCard>
            <Link to="/profile" onClick={() => (handleCloseProfileMenu(), handleChange(0))}>
              <span >Meu perfil</span>
              <div>
                <MdAssignmentInd />
              </div>
            </Link>
            <Divider variant="middle" className={divider.root} />
            <a onClick={handleLogout}>
              <span>Sair</span>
              <div>
                <MdExitToApp />
              </div>
            </a>
            <h1 style={{ marginTop: 10 }}>
              Privacidade · Termos · Publicidade · Cookies{" "}
            </h1>
            <h1>Requart © 2021</h1>
          </Menu>
          {profileMenuShow && <DisableMenu onClick={handleCloseProfileMenu} />}
        </aside>
      </Content>
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onRequestClose={handleCloseNewProjectModalClose}
      />
    </Container>
  );
}
