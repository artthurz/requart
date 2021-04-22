import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { MdEdit, MdArrowBack } from 'react-icons/md';
import { Panel, PanelHeader } from '../../components/Panel';
import EditRequirementModal from './EditRequirementModal';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import { DataGrid, ptBR } from '@material-ui/data-grid';
import { format, parseISO } from 'date-fns';
import { Fab } from '@material-ui/core';
import {
  Container,
  Body,
  Badge,
  useRotatedAddIconButtonStyle,
  useAddIconButtonStyle,
  useBackIconButtonStyle,
} from './styles';

const Requirements = (params) => {
  const project = params.location.state.project;
  const requirement = params.location.state.requirement;
  let history = useHistory();
  const iconAddButton = useAddIconButtonStyle();
  const iconAddButtonRotated = useRotatedAddIconButtonStyle();
  const iconBackButton = useBackIconButtonStyle();
  const [isNewRequirementModalOpen, setIsNewRequirementModalOpen] = useState(
    false
  );
  const [requirements, setRequirements] = useState([]);

  console.log(params.location);

  const fetchRequirements = async () => {
    const { data } = await api.get(
      `/requirements/${project.id}/${requirement.parent_id}`
    );
    data.forEach((e) => {
      const created = parseISO(e.createdAt);
      e.createdAt = format(created, 'dd/MM/yyyy', {
        timeZone: 'America/Sao_Paulo',
      });
    });
    setRequirements(data);
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  const columns = [
    { field: 'version', headerName: 'Versão', width: 100 },
    {
      field: 'non_functional',
      headerName: 'Tipo',
      width: 100,
      renderCell: ({ row }) => {
        return <>{row?.non_functional ? 'RNF' : 'RF'}</>;
      },
    },
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'description', headerName: 'Descrição', width: 280 },
    {
      field: 'priority.id',
      headerName: 'Prioridade',
      width: 170,
      renderCell: ({ row }) => {
        return (
          <Badge color={row?.priority.color}>
            <span>{row?.priority.name}</span>
          </Badge>
        );
      },
    },
    {
      field: 'complexity.id',
      headerName: 'Complexidade',
      width: 170,
      renderCell: ({ row }) => {
        return (
          <Badge color={row?.complexity.color}>
            <span>{row?.complexity.name}</span>
          </Badge>
        );
      },
    },
    {
      field: 'situation.id',
      headerName: 'Situação',
      width: 170,
      renderCell: ({ row }) => {
        return (
          <Badge color={row?.situation.color}>
            <span>{row?.situation.name}</span>
          </Badge>
        );
      },
    },
  ];

  return (
    <Container>
      <Panel>
        <PanelHeader title={`Versões do Requisito - ${requirement?.name}`}>
        <Zoom in={true}>
            <Fab
              onClick={() => history.goBack()}
              className={iconBackButton.root}
              color="primary"
            >
              <MdArrowBack />
            </Fab>
          </Zoom>
          <Zoom in={!isNewRequirementModalOpen}>
            <Fab
              onClick={() => setIsNewRequirementModalOpen(true)}
              className={
                isNewRequirementModalOpen
                  ? iconAddButtonRotated.root
                  : iconAddButton.root
              }
              color="primary"
            >
              <MdEdit />
            </Fab>
          </Zoom>
        </PanelHeader>
        <Body>
          <EditRequirementModal
            isOpen={isNewRequirementModalOpen}
            onRequestClose={() => setIsNewRequirementModalOpen(false)}
            fetchRequirements={() => fetchRequirements()}
            project={project}
            requirement={requirement}
          />
          <div style={{ height: '100%', width: '100%' }}>
            <ThemeProvider theme={DataGridTheme}>
              <DataGrid
                disableSelectionOnClick={true}
                rows={requirements}
                columns={columns}
                pageSize={9}
              />
            </ThemeProvider>
          </div>
        </Body>
      </Panel>
    </Container>
  );
};

const DataGridTheme = createMuiTheme({}, ptBR);

export default Requirements;
