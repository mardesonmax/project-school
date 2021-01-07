import { get, sortedLastIndex } from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Section, Label, ContainerProfile, ContainerAlbum } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';
import Confirm from '../../components/Confirm';
import * as actions from '../../strore/modules/auth/actions';

const Fotos = ({ match }) => {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');
  const [fotos, setFotos] = useState([]);
  const [fotoUrl, setFotoUtl] = useState('');
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(false);
  const [index, setIndex] = useState('');

  useEffect(() => {
    async function getFotos() {
      setLoading(true);
      try {
        const { data } = await axios.get(`/alunos/show/${id}`);
        const arrayFotos = get(data, 'Fotos', []);

        setFotos(arrayFotos);
        if (arrayFotos.length > 0) {
          setFotoUtl(arrayFotos[0].url);
        }

        setLoading(false);
      } catch (e) {
        const status = get(e, 'response.status', 0);
        setLoading(false);
        if (status === 404) {
          return history.push('/');
        }
      }
    }

    getFotos();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const idFoto = fotos[index].id;
      await axios.delete(`/fotos/delete/${idFoto}`);

      const newFotos = [...fotos];
      newFotos.splice(index, 1);

      if (newFotos.length > 0) {
        setFotoUtl(newFotos[0].url);
      } else {
        setFotoUtl('');
      }
      setLoading(false);
      setFotos(newFotos);
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

  const handleClick = (i) => {
    setClick(true);
    setIndex(i);
  };

  const handleConfirm = (confirm) => {
    if (confirm) {
      handleDelete();
    }

    setClick(false);
    setIndex('');
  };

  const handleChange = async (e) => {
    const foto = e.target.files[0];
    const url = URL.createObjectURL(foto);

    const types = ['image/png', 'image/git', 'image/jpeg'];

    if (types.includes(foto.type)) {
      setFotoUtl(url);
    }

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', foto);

    try {
      setLoading(true);
      const { data } = await axios.post('/fotos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFotoUtl(data.url);
      setFotos([data, ...fotos]);
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);

      errors.map((erro) => {
        if (erro === 'LIMIT_FILE_SIZE') {
          if (fotos.length > 0) {
            setFotoUtl(fotos[0].url);
          }
          return toast('Imagens permitidas ate 2MB', {
            className: 'msg-error',
          });
        }
        return toast(erro, { className: 'msg-error' });
      });
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  return (
    <Section>
      <Loading isLoading={loading} />
      {click && <Confirm handleConfirm={handleConfirm} click={click} />}
      <Container className="container">
        <h1>Perfil</h1>

        <ContainerProfile>
          <Label>
            {fotoUrl ? <img src={fotoUrl} /> : <span>Adicionar Foto</span>}
            <input
              type="file"
              onChange={(e) => handleChange(e)}
              accept="image/png, image/gif, image/jpeg"
            />
          </Label>
        </ContainerProfile>

        {fotos.length > 0 && (
          <ContainerAlbum>
            <h1>Todas as fotos</h1>
            {fotos.map((foto, i) => (
              <div key={foto.id} className="img-item">
                <img src={foto.url} />
                <button type="button" onClick={(e) => handleClick(i)}>
                  <FaWindowClose />
                </button>
              </div>
            ))}
          </ContainerAlbum>
        )}
      </Container>
    </Section>
  );
};

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default Fotos;
