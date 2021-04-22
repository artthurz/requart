import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useHistory } from 'react-router-dom';
import { Panel, PanelHeader } from '../../../components/Panel';
import Zoom from '@material-ui/core/Zoom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
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
  Badge,
  RequirementsHeader,
  useRotatedAddIconButtonStyle,
  useAddIconButtonStyle,
  useBackIconButtonStyle,
  useEnterIconButtonStyle,
  Container,
} from './styles';
import { MdAdd, MdDelete, MdEdit, MdDirections } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import { Fab } from '@material-ui/core';
import { Dropdown } from '../../../components/Dropdown';
import OpConfirmation from '../../../components/OpConfirmation';
import { DataGrid, ptBR } from '@material-ui/data-grid';
import Skeleton from '@material-ui/lab/Skeleton';
import NewRequirementModal from '../../Requirements/NewRequirementModal';
import EditRequirementModal from '../../Requirements/EditRequirementModal';
import ProjectToPdf from '../../../documents/Project.pdf.jsx';

const ProjectDetails = (params) => {
  const [project, setProject] = useState(params.location.state);
  const history = useHistory();
  const backIconButton = useBackIconButtonStyle();
  const addIconButton = useAddIconButtonStyle();
  const enterIconButton = useEnterIconButtonStyle();
  const addIconButtonRotated = useRotatedAddIconButtonStyle();
  const [isNewRequirementModalOpen, setIsNewRequirementModalOpen] = useState(
    false
  );
  const [isEditRequirementModalOpen, setIsEditRequirementModalOpen] = useState(
    false
  );
  const [loading, setLoading] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(false);

  const [requirements, setRequirements] = useState([]);

  const fetchRequirements = async (proj) => {
    try {
      const { data } = await api.get(`requirements/${proj.id}`);
      data.forEach((e) => {
        const created = parseISO(e.createdAt);
        e.createdAt = format(created, 'dd/MM/yyyy', {
          timeZone: 'America/Sao_Paulo',
        });
      });
      setRequirements(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (project) {
        return fetchRequirements(project);
      } else {
        try {
          const { data } = await api.get(
            `projects/${params.computedMatch.params.project}`
          );
          const delivery = parseISO(data.delivery_date);
          const created = parseISO(data.createdAt);
          data.fromattedDeliveryDate = format(delivery, 'dd/MM/yyyy', {
            timeZone: 'America/Sao_Paulo',
          });
          data.createdAt = format(created, 'dd/MM/yyyy', {
            timeZone: 'America/Sao_Paulo',
          });
          setProject(data);
          fetchRequirements(data);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, []);

  const handleRequirementDelete = async (id) => {
    try {
      await api.delete(`requirements/${id}`);
      await fetchRequirements(project);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenEditRequirementModal = (req) => {
    setSelectedRequirement(req);
    setIsEditRequirementModalOpen(true);
  };

  const columns = [
    {
      field: 'details',
      headerName: ' ',
      width: 70,
      renderCell: ({ row }) => {
        const data = { requirement: row, project: project };
        return (
          <Fab
            onClick={() => history.push('/requirements', data)}
            className={enterIconButton.root}
            color="primary"
          >
            <MdDirections />
          </Fab>
        );
      },
    },
    { field: 'requirement_id', headerName: 'Código', width: 100 },
    {
      field: 'non_functional',
      headerName: 'Tipo',
      width: 100,
      renderCell: ({ row }) => {
        return <>{row?.non_functional ? 'RNF' : 'RF'}</>;
      },
    },
    { field: 'name', headerName: 'Nome', width: 280 },
    {
      field: 'priority.id',
      headerName: 'Prioridade',
      width: 185,
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
      width: 185,
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
      width: 185,
      renderCell: ({ row }) => {
        return (
          <Badge color={row?.situation.color}>
            <span>{row?.situation.name}</span>
          </Badge>
        );
      },
    },
    {
      field: 'options',
      headerName: ' ',
      width: 70,
      renderCell: ({ row }) => {
        return (
          <Dropdown
            popperOpts={{ placement: 'bottom-end' }}
            className="project-dropdown"
            options={[
              {
                label: 'Criar nova Versão',
                icon: <MdEdit />,
                onClick: () => {
                  handleOpenEditRequirementModal(row);
                },
              },
              {
                label: 'Deletar',
                icon: <MdDelete />,
                onClick: () => {
                  OpConfirmation({
                    title: 'Atenção',
                    message: 'Voce realmente deseja deletar este projeto?',
                    onConfirm: () => {
                      handleRequirementDelete(row?.id);
                    },
                  });
                },
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <Container>
      <Panel styles={{ margin: '5.55rem' }}>
        <PanelHeader title="Detalhes">
          <Zoom in={true}>
            <Fab
              onClick={() => history.goBack()}
              className={backIconButton.root}
              color="primary"
            >
              <MdArrowBack />
            </Fab>
          </Zoom>
          <ProjectToPdf projectDetails={{project: project, requirements: requirements}} />
        </PanelHeader>
        <Body>
          <Details>
            <DetailsTitle>
              {loading ? (
                <Skeleton animation="wave" width={250} />
              ) : (
                project?.name
              )}
            </DetailsTitle>
            <DetailsCards>
              <Card>
                <CardTitle>Data de Criação</CardTitle>
                <CardDescription>
                  {loading ? (
                    <>
                      <Skeleton
                        animation="wave"
                        width={250}
                        height={10}
                        style={{ marginBottom: 6 }}
                      />
                      <Skeleton
                        animation="wave"
                        width={250}
                        height={10}
                        width="80%"
                      />
                    </>
                  ) : (
                    project?.createdAt
                  )}
                </CardDescription>
              </Card>
              <Card>
                <CardTitle>Responsável</CardTitle>
                <CardDescription>
                  {loading ? (
                    <>
                      {' '}
                      <Skeleton
                        animation="wave"
                        width={250}
                        height={10}
                        style={{ marginBottom: 6 }}
                      />
                      <Skeleton
                        animation="wave"
                        width={250}
                        height={10}
                        width="80%"
                      />{' '}
                    </>
                  ) : (
                    project?.owner.name
                  )}
                </CardDescription>
              </Card>
              <Card>
                <CardTitle>Previsão de Entrega</CardTitle>
                <CardDescription>
                  {loading ? (
                    <>
                      {' '}
                      <Skeleton
                        animation="wave"
                        width={250}
                        height={10}
                        style={{ marginBottom: 6 }}
                      />
                      <Skeleton
                        animation="wave"
                        width={250}
                        height={10}
                        width="80%"
                      />
                    </>
                  ) : (
                    project?.fromattedDeliveryDate
                  )}
                </CardDescription>
              </Card>
            </DetailsCards>

            <Sparetor />
            <DetailsSubTitle>Descrição</DetailsSubTitle>
            <DetailsDescription>
              {loading ? (
                <>
                  <Skeleton animation="wave" width={'100%'} />
                  <Skeleton animation="wave" width={'100%'} />
                  <Skeleton animation="wave" width={'100%'} />
                  <Skeleton animation="wave" width={'70%'} />
                </>
              ) : (
                project?.description
              )}
            </DetailsDescription>
          </Details>
          <section style={{ height: '605px', width: '100%' }}>
            <Sparetor />
            <RequirementsHeader>
              <Zoom in={!isNewRequirementModalOpen}>
                <Fab
                  onClick={() => setIsNewRequirementModalOpen(true)}
                  className={
                    isNewRequirementModalOpen
                      ? addIconButtonRotated.root
                      : addIconButton.root
                  }
                  color="primary"
                >
                  <MdAdd />
                </Fab>
              </Zoom>
              <DetailsSubTitle>Requisitos</DetailsSubTitle>
            </RequirementsHeader>
            <div style={{ height: '605px', width: '100%' }}>
              <ThemeProvider theme={DataGridTheme}>
                <DataGrid
                  disableSelectionOnClick={true}
                  rows={requirements}
                  columns={columns}
                  pageSize={10}
                />
              </ThemeProvider>
            </div>
          </section>
          <NewRequirementModal
            isOpen={isNewRequirementModalOpen}
            onRequestClose={() => setIsNewRequirementModalOpen(false)}
            fetchRequirements={() => fetchRequirements(project)}
            projectId={project?.id}
          />
          {isEditRequirementModalOpen ? (
            <EditRequirementModal
              isOpen={isEditRequirementModalOpen}
              onRequestClose={() => setIsEditRequirementModalOpen(false)}
              fetchRequirements={() => fetchRequirements(project)}
              project={project}
              requirement={selectedRequirement}
            />
          ) : (
            ''
          )}
        </Body>
      </Panel>
    </Container>
  );
};

const DataGridTheme = createMuiTheme({}, ptBR);

export default ProjectDetails;
