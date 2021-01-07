import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';

import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Fotos from '../pages/Fotos';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute path="/" component={Alunos} exact isClosed />
      <MyRoute path="/aluno/:id/edit" component={Aluno} isClosed />
      <MyRoute path="/aluno" component={Aluno} isClosed />
      <MyRoute path="/fotos/:id" component={Fotos} isClosed />
      <MyRoute path="/profile" component={Profile} isClosed />
      <MyRoute path="/register" component={Register} isLog />
      <MyRoute path="/login" component={Login} isLog />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
