import React, { useState } from "react";

import { MdAdd } from "react-icons/md";
import { Panel, PanelHeader } from "../../components/Panel";
import NewProjectModal from "../../components/NewProjectModal";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";

import { Body } from "./styles";

const useIconButtonStyle = makeStyles((theme) => ({
  root: {
    position: "absolute",
    left: "-24px",
    top: "15px",
    color: "#fff",
    backgroundColor: "rgba(81,150,255, 1)",
    transition: "transform 250ms linear, filter 250ms linear",
    "&:hover": {
      backgroundColor: "rgba(81,150,255, 0.9)",
    },
  },
}));
const useRotatedIconButtonStyle = makeStyles((theme) => ({
  root: {
    position: "absolute",
    left: "-24px",
    top: "15px",
    color: "#fff",
    backgroundColor: "rgba(81,150,255, 1)",
    transform: "rotate(45deg)",
    transition: "transform 250ms linear, filter 250ms linear",
    "&:hover": {
      backgroundColor: "rgba(81,150,255, 0.9)",
    },
  },
}));

const Projects = () => {
  const iconButton = useIconButtonStyle();
  const iconButtonRotated = useRotatedIconButtonStyle();
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  const handleOpenNewProjectModalOpen = () => {
    setIsNewProjectModalOpen(true);
  };

  const handleCloseNewProjectModalClose = () => {
    setIsNewProjectModalOpen(false);
  };

  return (
    <Panel>
      <PanelHeader title="Projetos">
        <IconButton
          onClick={handleOpenNewProjectModalOpen}
          className={
            isNewProjectModalOpen ? iconButtonRotated.root : iconButton.root
          }
          color="primary"
        >
          <MdAdd />
        </IconButton>
        <NewProjectModal
          isOpen={isNewProjectModalOpen}
          onRequestClose={handleCloseNewProjectModalClose}
        />
      </PanelHeader>
      <Body>Content</Body>
    </Panel>
  );
};

export default Projects;
