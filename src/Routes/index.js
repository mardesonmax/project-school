import { Switch, Route } from 'react-router-dom';

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
      <MyRoute exact path="/" component={Alunos} />
      <MyRoute exact path="/aluno/:id/edit" component={Aluno} />
      <MyRoute exact path="/aluno" component={Aluno} />
      <MyRoute exact path="/fotos/:id" component={Fotos} />
      <MyRoute exact path="/profile" component={Profile} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route path="*" component={Page404} />
    </Switch>
  );
}
