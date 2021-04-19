import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/images/logo.svg';
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
  LinksContainer,
} from './styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import {
  MdAdd,
  MdAssignmentInd,
  MdExitToApp,
  MdLowPriority,
  MdPersonAdd,
  MdFlag,
} from 'react-icons/md';
import { BiStats } from 'react-icons/bi';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

const useIconButtonStyle = makeStyles((theme) => ({
  root: {
    color: '#5196FF',
    backgroundColor: 'rgba(81,150,255,0.2)',
    transition: 'transform 250ms linear, filter 250ms linear',
  },
}));
const useRotatedIconButtonStyle = makeStyles((theme) => ({
  root: {
    color: '#5196FF',
    backgroundColor: 'rgba(81,150,255,0.2)',
    transform: 'rotate(45deg)',
    transition: 'transform 250ms linear, filter 250ms linear',
  },
}));

const useDividerStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '80%',
    marginTop: '5px',
    marginBottom: '5px',
  },
}));

export default function Header() {
  let history = useHistory();
  const [page, setPage] = useState(0);
  const iconButton = useIconButtonStyle();
  const iconButtonRotated = useRotatedIconButtonStyle();
  const divider = useDividerStyle();
  const [profileMenuShow, setProfileMenuShow] = React.useState(null);
  const [addMenuShow, setAddMenuShow] = React.useState(null);

  const { user, handleLogout } = useAuth();
  async function handleUserLogout() {
    history.push('/');
    handleLogout();
  }

  const handleOpenAddMenu = () => {
    setAddMenuShow(!addMenuShow);
    setProfileMenuShow(false);
  };

  const handleOpenProfileMenu = () => {
    setProfileMenuShow(!profileMenuShow);
    setAddMenuShow(false);
  };

  const setMenusShowFalse = () => {
    setProfileMenuShow(false);
    setAddMenuShow(false);
  };

  const handleChange = (event, nextPage) => {
    setPage(nextPage);
    setMenusShowFalse();
  };

  return (
    <>
      <Container>
        <Content>
          <LinksContainer>
            <div>
              <Link to="/" onClick={() => handleChange(0)}>
                <img src={logo} alt="Requart" />
              </Link>
            </div>
            <AppBar position="static">
              <Tabs variant="fullWidth" value={page} onChange={handleChange}>
                <LinkTab label="Home" to="/" {...a11yProps(0)} />
                <LinkTab label="Projetos" to="/projects" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
          </LinksContainer>
          <div className="menus-section">
            <div>
              <IconButton
                onClick={handleOpenAddMenu}
                className={
                  addMenuShow ? iconButtonRotated.root : iconButton.root
                }
                color="primary"
              >
                <MdAdd />
              </IconButton>
              <Menu visible={addMenuShow} width="360px">
                <h2>Cadastros</h2>
                <Link
                  to="/users"
                  onClick={() => (setAddMenuShow(false), handleChange(0))}
                >
                  <div className="menu-item-details">
                    <span>Usuários</span>
                    <h1>Crie um novo usuário dentro da plataforma.</h1>
                  </div>
                  <div>
                    <MdPersonAdd />
                  </div>
                </Link>
                <Divider variant="middle" className={divider.root} />
                <a>
                  <div className="menu-item-details">
                    <span>Prioridades</span>
                    <h1>
                      Crie uma nova prioridade para atribuir aos requisitos.
                    </h1>
                  </div>
                  <div>
                    <MdFlag />
                  </div>
                </a>
                <a>
                  <div className="menu-item-details">
                    <span>Situaçãos</span>
                    <h1>
                      Crie uma nova situação para atribuir aos requisitos.
                    </h1>
                  </div>
                  <div>
                    <BiStats />
                  </div>
                </a>
                <a>
                  <div className="menu-item-details">
                    <span>Complexidades</span>
                    <h1>
                      Crie uma nova complexidade para atribuir aos requisitos.
                    </h1>
                  </div>
                  <div>
                    <MdLowPriority />
                  </div>
                </a>
              </Menu>
            </div>

            <HeaderDivider />

            <div className="profile-button-and-menu">
              <ProfileButton onClick={handleOpenProfileMenu}>
                <strong>{user.name}</strong>
                <ProfileImage>
                  <img src={user.avatar.url} alt="Profile" />
                </ProfileImage>
              </ProfileButton>
              <Menu visible={profileMenuShow} right="0" width="380px">
                <ProfileCard width="380px">
                  <div>
                    <img src={user.avatar.url} alt="Profile" />
                    <div>
                      <strong>{user.name}</strong>
                      <h1>{user.email}</h1>
                      <AdminBadge>
                        <h1>{user.admin ? 'Admin' : 'User'}</h1>
                      </AdminBadge>
                    </div>
                  </div>
                </ProfileCard>
                <Link
                  to="/profile"
                  onClick={() => (setProfileMenuShow(false), handleChange(0))}
                >
                  <span>Meu perfil</span>
                  <div>
                    <MdAssignmentInd />
                  </div>
                </Link>
                <Divider variant="middle" className={divider.root} />
                <a onClick={handleUserLogout}>
                  <span>Sair</span>
                  <div>
                    <MdExitToApp />
                  </div>
                </a>
                <div
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                  }}
                >
                  <h1 style={{ marginTop: 10 }}>
                    Privacidade · Termos · Publicidade · Cookies{' '}
                  </h1>
                  <h1>Requart © 2021</h1>
                </div>
              </Menu>
            </div>
          </div>
        </Content>
      </Container>
      {profileMenuShow && (
        <DisableMenu onClick={() => setProfileMenuShow(false)} />
      )}
      {addMenuShow && <DisableMenu onClick={() => setAddMenuShow(false)} />}
    </>
  );
}
