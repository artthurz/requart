import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import Modal from 'react-modal';
import { Container } from './styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';

const validationSchema = yup.object({
  name: yup.string('Nome do projeto').required('O nome é obrigatório'),
  description: yup
    .string('Descrição')
    .required('A descrição do projeto é obrigatória'),
});

function NewRequirementModal({
  isOpen,
  onRequestClose,
  fetchRequirements,
  projectId,
}) {
  const classes = useStyles();
  const [priorities, setPriorities] = useState([]);
  const [complexities, setComplexities] = useState([]);
  const [situations, setSituations] = useState([]);
  const [priority_id, setPriority_id] = useState(3);
  const [complexity_id, setComplexity_id] = useState(3);
  const [situation_id, setSituation_id] = useState(3);
  const [non_functional, setNon_functional] = useState(false);

  useEffect(() => {
    (async () => {
      let prioritiesResponse = await api.get('priorities');
      setPriorities(prioritiesResponse.data);
      let complexitiesResponse = await api.get('complexities');
      setComplexities(complexitiesResponse.data);
      let situationsResponse = await api.get('situations');
      setSituations(situationsResponse.data);
    })();
  }, []);

  const handleCreateRequirement = async (values, resetForm) => {
    console.log('entrou')
    try {
      await api.post('requirements', {
        ...values,
        project_id: projectId,
        priority_id,
        complexity_id,
        situation_id,
        non_functional
      });
      resetForm({});
      if (fetchRequirements) fetchRequirements();
      toast.success('Requisito criado com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar o requisito, revise seus dados.');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleCreateRequirement(values, resetForm);
    },
  });

  return (
    <Modal
      closeTimeoutMS={500}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      ariaHideApp={false}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <MdClose />
      </button>
      <Container onSubmit={formik.handleSubmit}>
        <h2>Cadastrar Requisito</h2>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          id="name"
          name="name"
          style={{ marginTop: '20px', marginBottom: '20px' }}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          label="Descrição"
          variant="outlined"
          multiline
          fullWidth
          id="description"
          name="description"
          style={{ marginBottom: '20px' }}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <FormControl
          variant="outlined"
          required
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Tipo de Requisito
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={non_functional}
            onChange={(v) => setNon_functional(v.target.value)}
            label="Tipo de Requisito"
          >
            <MenuItem value={false}>Funcional</MenuItem>
            <MenuItem value={true}>Não Funcional</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          required
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Prioridade
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={priority_id}
            onChange={(v) => setPriority_id(v.target.value)}
            label="Prioridade"
          >
            {priorities.map((priority) => (
              <MenuItem key={priority.id} value={priority.id}>{priority.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          required
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Complexidade
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={complexity_id}
            onChange={(v) => setComplexity_id(v.target.value)}
            label="Complexidade"
          >
            {complexities.map((complexity) => (
              <MenuItem key={complexity.id} value={complexity.id}>{complexity.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          required
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Situação
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={situation_id}
            onChange={(v) => setSituation_id(v.target.value)}
            label="Situação"
          >
            {situations.map((situation) => (
              <MenuItem key={situation.id} value={situation.id}>{situation.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          className="new-project-modal-submit-button"
          fullWidth
          variant="contained"
        >
          Cadastrar
        </Button>
      </Container>
    </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
    marginBottom: 15,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default NewRequirementModal;
