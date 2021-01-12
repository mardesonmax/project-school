import { get } from 'lodash';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { isEmail, isInt, isFloat } from 'validator';
import { FaUserCircle, FaCamera } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from '../../components/Input';
import { Container } from '../../styles/GlobalStyles';
import { Form, Section } from './styled';
import axios from '../../services/axios';
import Loading from '../../components/Loading';
import * as actions from '../../strore/modules/auth/actions';

const Aluno = ({ match, history }) => {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUser() {
      if (id) {
        try {
          setLoading(true);
          const { data } = await axios.get(`/alunos/show/${id}`);
          setNome(data.nome);
          setSobrenome(data.sobrenome);
          setIdade(data.idade);
          setPeso(data.peso);
          setAltura(data.altura);
          setEmail(data.email);
          setImage(get(data, 'Fotos[0].url', ''));
          setLoading(false);
        } catch (err) {
          setLoading(false);
          const errors = get(err, 'response.data.errors', []);
          errors.map((erro) => toast(erro, { className: 'msg-warning' }));
          return history.push('/');
        }
      } else {
        setNome('');
        setSobrenome('');
        setIdade('');
        setPeso('');
        setAltura('');
        setEmail('');
        setImage('');
      }
    }

    getUser();
  }, [id, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = [];
    if (nome.length < 3 || nome.length > 55) {
      formErrors.push('Nome deve estar entre 3 a 55 caracteres.');
    }

    if (sobrenome.length < 3 || sobrenome.length > 55) {
      formErrors.push('Sobrenome deve estar entre 3 a 55 caracteres');
    }

    if (!isEmail(email)) {
      formErrors.push('E-mail inválido');
    }

    if (!isInt(String(idade))) {
      formErrors.push('Idade inválido');
    }

    if (!isFloat(String(peso))) {
      formErrors.push('Peso inválido');
    }

    if (!isFloat(String(altura))) {
      formErrors.push('Altura inválido');
    }

    if (formErrors.length > 0) {
      return formErrors.map((err) => toast(err, { className: 'msg-error' }));
    }

    try {
      setLoading(true);
      if (!id) {
        const { data } = await axios.post('/alunos/store', {
          nome,
          sobrenome,
          idade,
          peso,
          altura,
          email,
        });
        setLoading(false);
        toast('Aluno cadastrado com sucesso.', {
          className: 'msg-success',
        });
        return history.push(`aluno/${data.id}/edit`);
      }

      await axios.put(`/alunos/update/${id}`, {
        nome,
        sobrenome,
        idade,
        peso,
        altura,
        email,
      });
      setLoading(false);
      toast('Dados alterados com sucesso.', {
        className: 'msg-success',
      });
    } catch (err) {
      setLoading(false);
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.errors', []);
      if (status === 401) {
        toast('Faça login para continuar', { className: 'msg-error' });
        return dispatch(actions.userLogout());
      }
      errors.map((erro) => toast(erro, { className: 'msg-error' }));
    }
  };

  return (
    <Section>
      <Loading isLoading={loading} />
      <Container className="container">
        <h1>{id ? 'Editar Aluno' : 'Adicionar Aluno'}</h1>

        {id && (
          <div className="foto-perfil">
            <div className="foto-item">
              {image ? <img src={image} /> : <FaUserCircle className="img" />}
              <Link to={`/fotos/${id}`} className="foto-edit">
                <FaCamera />
              </Link>
            </div>
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Input
            name="Nome"
            type="text"
            value={nome}
            onChange={setNome}
            placeholder="Nome"
          />

          <Input
            name="Sobrenome"
            type="text"
            value={sobrenome}
            onChange={setSobrenome}
            placeholder="Sobrenome"
          />

          <Input
            name="E-mail"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="E-mail"
          />

          <Input
            name="Idade"
            type="number"
            value={idade}
            onChange={setIdade}
            placeholder="18"
            min={0}
            max={80}
          />

          <Input
            name="Peso"
            type="number"
            value={peso}
            onChange={setPeso}
            placeholder="55.50"
            min={0}
            max={120}
            step={0.01}
          />

          <Input
            name="Altura"
            type="number"
            value={altura}
            onChange={setAltura}
            placeholder="1.70"
            min={1}
            max={3}
            step={0.01}
          />

          <button type="submit">Enviar</button>
        </Form>
      </Container>
    </Section>
  );
};

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};

export default Aluno;
