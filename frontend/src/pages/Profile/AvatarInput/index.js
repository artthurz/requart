import React, { useState } from 'react';
import { useAuth } from "../../../contexts/auth";
import api from '../../../services/api';

import { Container } from './styles';

export default function AvatarInput() {
  const { user, ReloadAvatar } = useAuth();

  const [preview, setPreview] = useState(user.avatar.url);

  async function handleChange(e) {
    let data = new FormData();

    data.append('file', e.target.files[0]);

    const file = await api.post('files', data);

    const {id, path, url } = file.data;

    setPreview(url);
    ReloadAvatar({id, path, url});
  }
  return (
    <Container>
      <label htmlFor="avatar_id">
        <img src={preview} alt="Profile" />
        <input
          type="file"
          id="avatar_id"
          name="avatar"
          accept="image/*"
          onChange={e => handleChange(e)}
        />
      </label>
    </Container>
  );
}
