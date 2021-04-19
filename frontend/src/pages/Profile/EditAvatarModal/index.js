import React, { useState } from 'react';
import api from '../../../services/api';
import Modal from 'react-modal';
import { Container } from './styles';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '@material-ui/core/Button';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';

function EditAvatarModal({ isOpen, onRequestClose }) {
  const { user, handleReloadAvatar } = useAuth();

  const [preview, setPreview] = useState({ url: user.avatar.url });

  async function handleUploadFile(e) {
    try {
      let data = new FormData();
      data.append('file', e.target.files[0]);
      const file = await api.post('files', data);
      const { id, path, url } = file.data;
      setPreview({ id, path, url });
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar a foto, tente novamente.');
    }
  }

  async function handleDeleteFile() {
    console.log(preview);
    if (!(preview.id === undefined)) {
      await api.delete(`files/${preview.id}`);
    }
    onRequestClose();
    setPreview({url: user.avatar.url});
  }

  async function handleConfirmFileChange() {
    try {
      if (!(preview.id === undefined)) {
        await api.put(`files/${preview.id}`);
        toast.success('Foto atualizada com sucesso!');
        handleReloadAvatar(preview);
      }
      onRequestClose();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao editar a foto, tente novamente.');
    }
  }

  return (
    <div className="wrapper">
      <Modal
        closeTimeoutMS={500}
        isOpen={isOpen}
        onRequestClose={() => handleDeleteFile()}
        className="react-modal-content"
        overlayClassName="react-modal-overlay"
        ariaHideApp={false}
      >
        <h2>Editar Foto</h2>
        <button
          type="button"
          onClick={() => handleDeleteFile()}
          className="react-modal-close"
        >
          <MdClose />
        </button>
        <Container>
          <label htmlFor="avatar_id">
            <img src={preview.url} alt="Profile" />
            <input
              type="file"
              id="avatar_id"
              name="avatar"
              accept="image/*"
              onChange={(e) => handleUploadFile(e)}
            />
          </label>
          <Button
            className="edit-avatar-modal-submit-button"
            onClick={() => handleConfirmFileChange()}
          >
            Confirmar Alterações
          </Button>
        </Container>
      </Modal>
    </div>
  );
}

export default EditAvatarModal;
