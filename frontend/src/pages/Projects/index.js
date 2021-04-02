import React, { useState, useEffect } from "react";

import api from "../../services/api";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { Panel, PanelHeader } from "../../components/Panel";
import NewProjectModal from "../../components/NewProjectModal";
import EditProjectModal from "../../components/EditProjectModal";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import { DataGrid, ptBR, GridToolbar } from "@material-ui/data-grid";
import { format, parseISO } from "date-fns";
import Fab from "@material-ui/core/Fab";
import { Dropdown } from "../../components/Dropdown";
import OpConfirmation from "../../components/OpConfirmation";

import { Body } from "./styles";

const useIconButtonStyle = makeStyles(() => ({
  root: {
    position: "absolute",
    left: "-30px",
    top: "10px",
    fontSize: "25px",
    color: "#fff !important",
    backgroundColor: "rgba(81,150,255, 1) !important",
    transition: "transform 250ms linear, filter 250ms linear",
    "&:hover": {
      backgroundColor: "rgba(81,150,255, 0.9) !important",
    },
  },
}));

const useRotatedIconButtonStyle = makeStyles(() => ({
  root: {
    position: "absolute",
    left: "-30px",
    top: "10px",
    fontSize: "25px",
    color: "#fff !important",
    backgroundColor: "rgba(81,150,255, 1) !important",
    transform: "rotate(45deg)",
    transition: "transform 250ms linear, filter 250ms linear",
    "&:hover": {
      backgroundColor: "rgba(81,150,255, 0.9) !important",
    },
  },
}));

const DataGridTheme = createMuiTheme({}, ptBR);

const Projects = () => {
  const iconButton = useIconButtonStyle();
  const iconButtonRotated = useRotatedIconButtonStyle();
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();

  const fetchProjects = async () => {
    const { data } = await api.get("projects");
    data.forEach((e) => {
      const delivery = parseISO(e.delivery_date);
      const created = parseISO(e.createdAt);
      e.fromattedDeliveryDate = format(delivery, "dd/MM/yyyy", {
        timeZone: "America/Sao_Paulo",
      });
      e.createdAt = format(created, "dd/MM/yyyy", {
        timeZone: "America/Sao_Paulo",
      });
    });
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectDelete = async (id) => {
    console.log(id);
    try {
      await api.delete(`projects/${id}`);
      await fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: "id", headerName: "Código", width: 100 },
    { field: "name", headerName: "Nome", width: 320 },
    {
      field: "owner",
      headerName: "Responsável",
      width: 250,
      renderCell: (params) => <span>{params.value.name}</span>,
    },
    {
      field: "createdAt",
      headerName: "Data de Criação",
      type: "date",
      width: 200,
    },
    {
      field: "fromattedDeliveryDate",
      headerName: "Previsão de Entrega",
      type: "date",
      width: 200,
    },
    {
      field: "updatedAt",
      headerName: " ",
      width: 70,
      renderCell: ({ row }) => {
        return (
          <>
            <Dropdown
              popperOpts={{ placement: "bottom-end" }}
              className="project-dropdown"
              options={[
                {
                  label: "Editar",
                  icon: <MdEdit />,
                  onClick: () => {
                    setSelectedProject(row);
                    setIsEditProjectModalOpen(true);
                  },
                },
                {
                  label: "Deletar",
                  icon: <MdDelete />,
                  onClick: () => {
                    OpConfirmation({
                      title: "Atenção",
                      message: "Voce realmente deseja deletar este projeto?",
                      onConfirm: () => {
                        handleProjectDelete(row.id);
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
    <Panel>
      <PanelHeader title="Projetos">
        <Zoom in={!isNewProjectModalOpen}>
          <Fab
            onClick={() => setIsNewProjectModalOpen(true)}
            className={
              isNewProjectModalOpen ? iconButtonRotated.root : iconButton.root
            }
            color="primary"
          >
            <MdAdd />
          </Fab>
        </Zoom>
      </PanelHeader>
      <Body>
        <NewProjectModal
          isOpen={isNewProjectModalOpen}
          onRequestClose={() => setIsNewProjectModalOpen(false)}
          fetchProjects={() => fetchProjects()}
        />
        {isEditProjectModalOpen && (
          <EditProjectModal
            isOpen={isEditProjectModalOpen}
            onRequestClose={() => setIsEditProjectModalOpen(false)}
            fetchProjects={() => fetchProjects()}
            project={selectedProject}
          />
        )}

        <div style={{ height: "100%", width: "100%" }}>
          <ThemeProvider theme={DataGridTheme}>
            <DataGrid
              rows={projects}
              columns={columns}
              pageSize={10}
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </ThemeProvider>
        </div>
      </Body>
    </Panel>
  );
};

export default Projects;
