import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaPowerOff,
  FaPlus,
} from 'react-icons/fa'; // Icones
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import { Nav } from './styled';
import * as actions from '../../strore/modules/auth/actions';
import history from '../../services/history';

export default () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const nomeUser = () => {
    const nomeArray = user.nome.split(' ');
    return nomeArray[0];
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.userLogout());
    history.push('/login');
  };

  return (
    <Nav>
      <Container className="menu">
        <div className="logo">
          <Link to="/">Escola</Link>
        </div>
        <div className="menu-item">
          {isLoggedIn && (
            <NavLink to="/" exact>
              <FaHome /> <small>Home</small>
            </NavLink>
          )}

          {!isLoggedIn && (
            <NavLink to="/register">
              <FaUserAlt /> <small>Register</small>
            </NavLink>
          )}

          {!isLoggedIn && (
            <NavLink to="/login">
              <FaSignInAlt /> <small>Login</small>
            </NavLink>
          )}

          {isLoggedIn && (
            <NavLink to="/aluno" exact>
              <FaPlus /> <small>Novo Aluno</small>
            </NavLink>
          )}

          {isLoggedIn && (
            <NavLink to="/profile">
              <FaUserAlt /> <small>Olá, {nomeUser()}</small>
            </NavLink>
          )}

          {isLoggedIn && (
            <NavLink onClick={handleLogout} to="/logout">
              <FaPowerOff /> <small>Sair</small>
            </NavLink>
          )}
        </div>
      </Container>
    </Nav>
  );
};
