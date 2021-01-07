import { Section } from './styled';
import GlobalStyles from '../../styles/GlobalStyles';

const confirm = (props) => {
  const { handleConfirm, click } = props;
  return (
    <Section>
      <GlobalStyles overflow={click} />
      <div className="container">
        <h3>Deseja realmente apagar o item?</h3>
        <div className="btn-confirm">
          <button
            onClick={(e) => handleConfirm(true)}
            type="button"
            className="yes"
          >
            Sim
          </button>
          <button
            onClick={(e) => handleConfirm(false)}
            type="button"
            className="no"
          >
            Não
          </button>
        </div>
      </div>
    </Section>
  );
};

export default confirm;
