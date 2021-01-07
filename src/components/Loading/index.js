/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';

import { Container } from './styled';

const Loading = ({ isLoading }) => {
  if (!isLoading) return <></>;
  return (
    <Container>
      <img src="https://api-maxpb7-images.s3.amazonaws.com/loading.gif" />
    </Container>
  );
};

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};

export default Loading;
