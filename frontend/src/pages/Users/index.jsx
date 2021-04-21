import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { Panel, PanelHeader } from '../../components/Panel';
import NewUserModal from './NewUserModal';
import EditUserModal from './EditUserModal';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import { DataGrid, ptBR, GridToolbar } from '@material-ui/data-grid';
import { format, parseISO } from 'date-fns';
import Fab from '@material-ui/core/Fab';
import { Dropdown } from '../../components/Dropdown';
import OpConfirmation from '../../components/OpConfirmation';

import { Container, Body, ProfileImage } from './styles';

const useIconButtonStyle = makeStyles(() => ({
  root: {
    position: 'absolute',
    left: '-30px',
    top: '10px',
    fontSize: '25px',
    color: '#fff !important',
    backgroundColor: 'rgba(81,150,255, 1) !important',
    transition: 'transform 250ms linear, filter 250ms linear',
    '&:hover': {
      backgroundColor: 'rgba(81,150,255, 0.9) !important',
    },
  },
}));

const useRotatedIconButtonStyle = makeStyles(() => ({
  root: {
    position: 'absolute',
    left: '-30px',
    top: '10px',
    fontSize: '25px',
    color: '#fff !important',
    backgroundColor: 'rgba(81,150,255, 1) !important',
    transform: 'rotate(45deg)',
    transition: 'transform 250ms linear, filter 250ms linear',
    '&:hover': {
      backgroundColor: 'rgba(81,150,255, 0.9) !important',
    },
  },
}));

const DataGridTheme = createMuiTheme({}, ptBR);

const Users = () => {
  const iconButton = useIconButtonStyle();
  const iconButtonRotated = useRotatedIconButtonStyle();
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  const fetchUsers = async () => {
    const { data } = await api.get('users');
    data.forEach((e) => {
      const created = parseISO(e.createdAt);
      e.createdAt = format(created, 'dd/MM/yyyy', {
        timeZone: 'America/Sao_Paulo',
      });
    });
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserDelete = async (id) => {
    console.log(id);
    try {
      await api.delete(`users/${id}`);
      await fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      field: 'avatar.id',
      headerName: 'Avatar',
      width: 100,
      renderCell: ({ row }) => {
        return (
          <ProfileImage>
            <img src={row.avatar.url} alt="Profile" />
          </ProfileImage>
        );
      },
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },
    { field: 'name', headerName: 'Nome', width: 200 },
    {
      field: 'login',
      headerName: 'Login',
      width: 140,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
    },
    {
      field: 'admin',
      headerName: 'Papel',
      width: 100,
      renderCell: ({ row }) => {
        return (
          <>
            <span>{row.admin ? 'Admin' : 'User'}</span>
          </>
        );
      },
    },
    {
      field: 'createdAt',
      headerName: 'Data de Criação',
      type: 'date',
      width: 180,
    },
    {
      field: 'options',
      headerName: ' ',
      width: 70,
      renderCell: ({ row }) => {
        return (
          <>
            <Dropdown
              popperOpts={{ placement: 'bottom-end' }}
              className="user-dropdown"
              options={[
                {
                  label: 'Editar',
                  icon: <MdEdit />,
                  onClick: () => {
                    setSelectedUser(row);
                    setIsEditUserModalOpen(true);
                  },
                },
                {
                  label: 'Deletar',
                  icon: <MdDelete />,
                  onClick: () => {
                    OpConfirmation({
                      title: 'Atenção',
                      message: 'Voce realmente deseja deletar este usuário?',
                      onConfirm: () => {
                        handleUserDelete(row.id);
                      },
                    });
                  },
                },
              ]}
            />
          </>
        );
      },
    },
  ];

  return (
    <Container>
      <Panel>
        <PanelHeader title="Usuários">
          <Zoom in={!isNewUserModalOpen}>
            <Fab
              onClick={() => setIsNewUserModalOpen(true)}
              className={
                isNewUserModalOpen ? iconButtonRotated.root : iconButton.root
              }
              color="primary"
            >
              <MdAdd />
            </Fab>
          </Zoom>
        </PanelHeader>
        <Body>
          <NewUserModal
            isOpen={isNewUserModalOpen}
            onRequestClose={() => setIsNewUserModalOpen(false)}
            fetchUsers={() => fetchUsers()}
          />
          {isEditUserModalOpen && (
            <EditUserModal
              isOpen={isEditUserModalOpen}
              onRequestClose={() => setIsEditUserModalOpen(false)}
              fetchUsers={() => fetchUsers()}
              user={selectedUser}
            />
          )}

          <div style={{ height: '100%', width: '100%' }}>
            <ThemeProvider theme={DataGridTheme}>
              <DataGrid
                rows={users}
                columns={columns}
                pageSize={10}
                rowHeight={80}
              />
            </ThemeProvider>
          </div>
        </Body>
      </Panel>
    </Container>
  );
};

export default Users;
