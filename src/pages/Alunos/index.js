import { useEffect, useState } from 'react';
import { get } from 'lodash';
import { FaEdit, FaUserCircle, FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import { Section } from './styled';
import axios from '../../services/axios';
import Loading from '../../components/Loading';
import Confirm from '../../components/Confirm';

export default () => {
  const [loading, setLoading] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [click, setClick] = useState(false);
  const [index, setIndex] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getAlunos() {
      setLoading(true);
      const res = await axios.get('/alunos');
      setAlunos(res.data);
      setLoading(false);
    }

    getAlunos();
  }, []);

  const handleClick = (i) => {
    setClick(true);
    setIndex(i);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const alunoId = alunos[index].id;

      const { data } = await axios.get(`/alunos/show/${alunoId}`);

      if (data) {
        await axios.delete(`/alunos/delete/${data.id}`);

        const alunoFoto = get(data, 'Fotos', []);
        alunoFoto.map(async (foto) => {
          await axios.delete(`/fotos/delete/${foto.id}`);
        });
      }

      const newAlunos = [...alunos];
      newAlunos.splice(index, 1);
      setAlunos(newAlunos);

      toast('Item deletado com sucesso.', {
        className: 'msg-success',
      });
    } catch (err) {
      const status = get(err, 'response.status', []);
      toast(`Item não encontrado.`, {
        className: 'msg-error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = (confirm) => {
    if (confirm) {
      handleDelete();
    }

    setClick(false);
    setIndex('');
  };

  return (
    <Section>
      {click && <Confirm handleConfirm={handleConfirm} click={click} />}
      <Container className="container">
        <Loading isLoading={loading || isLoading} />

        <h1>Alunos</h1>
        <table>
          <tbody>
            {alunos.map((aluno, i) => (
              <tr key={aluno.id}>
                <td className="foto">
                  {get(aluno, 'Fotos[0].url', false) ? (
                    <img src={aluno.Fotos[0].url} />
                  ) : (
                    <FaUserCircle size={60} />
                  )}
                </td>
                <td className="nome">{aluno.nome}</td>
                <td className="sobrenome">{aluno.sobrenome}</td>
                <td className="idade">{aluno.idade} Anos</td>
                <td className="email">{aluno.email}</td>
                <td className="btn edit">
                  <Link to={`aluno/${aluno.id}/edit`}>
                    <FaEdit />
                  </Link>
                </td>
                <td className="btn delete">
                  <button type="button" onClick={() => handleClick(i)}>
                    <FaWindowClose />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </Section>
  );
};
