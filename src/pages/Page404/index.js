import { Container } from '../../styles/GlobalStyles';
import { Section, Title } from './styled';

export default function Login() {
  return (
    <Section>
      <Container className="container">
        <Title isRed>
          erro <small>404</small>
        </Title>
        <p>Página não encontrada</p>
      </Container>
    </Section>
  );
}
