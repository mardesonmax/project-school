import { useState } from 'react';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form, Section } from './styled';
import * as actions from '../../strore/modules/auth/actions';
import Loading from '../../components/Loading';
import Input from '../../components/Input';

export default (props) => {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');
  const history = get(props, 'history');
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast('E-mail inválido.', {
        className: 'msg-error',
      });
    }

    if (password.length < 6 || password.length > 55) {
      formErrors = true;
      toast('Senha inválido.', {
        className: 'msg-error',
      });
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath, history }));
  };
  return (
    <Section>
      <Container className="container">
        <Loading isLoading={isLoading} />
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            name="E-mail"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Seu email"
          />

          <Input
            name="Senha"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Sua senha"
          />

          <button type="submit">Login</button>
        </Form>
      </Container>
    </Section>
  );
};
