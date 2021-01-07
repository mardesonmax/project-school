import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form, Section } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../strore/modules/auth/actions';
import Input from '../../components/Input';

export default () => {
  const dispatch = useDispatch();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = useSelector((state) => state.auth.isLoading);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setNome(user.nome);
    setEmail(user.email);
    setPassword('');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

    if (nome.length < 3 || nome.length > 255) {
      errors.push('Nome deve ter entre 3 e 255 caracteres.');
    }

    if (!isEmail(email)) {
      errors.push('E-mail inválido.');
    }

    if (password && (password.length < 6 || password.length > 55)) {
      errors.push('Senha deve ter entre 6 e 55 caracteres.');
    }

    if (errors.length > 0) {
      return errors.map((err) => toast(err, { className: 'msg-error' }));
    }

    dispatch(
      actions.userRequest({
        nome,
        email,
        password: password || undefined,
        id: user.id,
      })
    );
  };

  return (
    <Section>
      <Container className="container">
        <Loading isLoading={isLoading} />
        <h1>Olá, {nome}</h1>
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
