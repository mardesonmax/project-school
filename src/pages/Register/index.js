import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';

import { get } from 'lodash';
import { Container } from '../../styles/GlobalStyles';
import { Form, Section } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../strore/modules/auth/actions';
import Input from '../../components/Input';

export default (props) => {
  const dispatch = useDispatch();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = get(props, 'history');

  const isLoading = useSelector((state) => state.auth.isLoading);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = [];

    if (nome.length < 3 || nome.length > 255) {
      errors.push('Nome deve ter entre 3 e 255 caracteres.');
    }

    if (!isEmail(email)) {
      errors.push('E-mail inválido.');
    }

    if (password.length < 6 || password.length > 55) {
      errors.push('Senha deve ter entre 6 e 55 caracteres.');
    }

    if (errors.length > 0) {
      return errors.map((err) => toast(err, { className: 'msg-error' }));
    }

    dispatch(actions.userRequest({ nome, email, password, history }));
  };

  return (
    <Section>
      <Container className="container">
        <Loading isLoading={isLoading} />
        <h1>Crie sua conta</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            name="Nome"
            type="text"
            value={nome}
            onChange={setNome}
            placeholder="Seu nome"
          />

          <Input
            name="E-mail"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Seu e-mail"
          />

          <Input
            name="Senha"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Sua senha"
          />

          <button type="submit">Concluir</button>
        </Form>
      </Container>
    </Section>
  );
};
