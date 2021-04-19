import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useHistory } from 'react-router-dom';
import { Panel, PanelHeader } from '../../../components/Panel';
import Zoom from '@material-ui/core/Zoom';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { MdArrowBack } from 'react-icons/md';
import {
  Body,
  Details,
  Card,
  CardTitle,
  CardDescription,
  Sparetor,
  DetailsSubTitle,
  DetailsCards,
  DetailsDescription,
  DetailsTitle,
} from './styles';
import { MdDelete, MdEdit, MdDirections } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import { Fab, IconButton } from '@material-ui/core';
import { Dropdown } from '../../../components/Dropdown';
import OpConfirmation from '../../../components/OpConfirmation';
import { DataGrid, ptBR, GridToolbar } from '@material-ui/data-grid';

// import { Container } from './styles';

const ProjectDetails = ({ location }) => {
  const history = useHistory();
  const iconButton = useIconButtonStyle();
  const [project, setProject] = useState(location.state);
  const [requirements, setRequirements] = useState([]);

  const fetchRequirements = async () => {
    const { data } = await api.get('projects');
    data.forEach((e) => {
      const delivery = parseISO(e.delivery_date);
      const created = parseISO(e.createdAt);
      e.fromattedDeliveryDate = format(delivery, 'dd/MM/yyyy', {
        timeZone: 'America/Sao_Paulo',
      });
      e.createdAt = format(created, 'dd/MM/yyyy', {
        timeZone: 'America/Sao_Paulo',
      });
    });
    setRequirements(data);
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  const handleRequirementDelete = async (id) => {
    console.log(id);
    try {
      await api.delete(`projects/${id}`);
      await fetchRequirements();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      field: 'details',
      headerName: ' ',
      width: 70,
      renderCell: ({ row }) => {
        return (
          <IconButton
            color="primary"
            aria-label="details"
            onClick={() => history.push('/projects/details', row)}
          >
            <MdDirections />
          </IconButton>
        );
      },
    },
    { field: 'id', headerName: 'Código', width: 100 },
    { field: 'name', headerName: 'Nome', width: 280 },
    {
      field: 'owner',
      headerName: 'Responsável',
      width: 260,
      renderCell: (params) => <span>{params.value.name}</span>,
    },
    {
      field: 'createdAt',
      headerName: 'Data de Criação',
      type: 'date',
      width: 200,
    },
    {
      field: 'fromattedDeliveryDate',
      headerName: 'Previsão de Entrega',
      type: 'date',
      width: 200,
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
              className="project-dropdown"
              options={[
                {
                  label: 'Editar',
                  icon: <MdEdit />,
                  onClick: () => {},
                },
                {
                  label: 'Deletar',
                  icon: <MdDelete />,
                  onClick: () => {
                    OpConfirmation({
                      title: 'Atenção',
                      message: 'Voce realmente deseja deletar este projeto?',
                      onConfirm: () => {
                        handleRequirementDelete(row.id);
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
    <Panel
      styles={{ height: '125vh', marginTop: '60px', marginBottom: '60px' }}
    >
      <PanelHeader title="Detalhes">
        <Zoom in={true}>
          <Fab
            onClick={() => history.goBack()}
            className={iconButton.root}
            color="primary"
          >
            <MdArrowBack />
          </Fab>
        </Zoom>
      </PanelHeader>
      <Body>
        <Details>
          <DetailsTitle>{project.name}</DetailsTitle>
          <DetailsCards>
            <Card>
              <CardTitle>Data de Criação</CardTitle>
              <CardDescription>{project.createdAt}</CardDescription>
            </Card>
            <Card>
              <CardTitle>Responsável</CardTitle>
              <CardDescription>{project.name}</CardDescription>
            </Card>
            <Card>
              <CardTitle>Previsão de Entrega</CardTitle>
              <CardDescription>{project.fromattedDeliveryDate}</CardDescription>
            </Card>
          </DetailsCards>
        </Details>
        <Sparetor />
        <DetailsSubTitle>Descrição</DetailsSubTitle>
        <DetailsDescription>{project.description}</DetailsDescription>
        <Sparetor />
        <DetailsSubTitle>Requisitos</DetailsSubTitle>
        <div style={{ height: '600px', width: '100%' }}>
          <ThemeProvider theme={DataGridTheme}>
            <DataGrid
              disableSelectionOnClick={true}
              rows={requirements}
              columns={columns}
              pageSize={10}
            />
          </ThemeProvider>
        </div>
      </Body>
    </Panel>
  );
};

const DataGridTheme = createMuiTheme({}, ptBR);

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

export default ProjectDetails;
