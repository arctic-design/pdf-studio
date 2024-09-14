import { keyframes, styled } from '@pigment-css/react';
import { motion } from 'framer-motion';

const spinIn = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Container = styled.div({
  display: 'flex',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: 24,
  zIndex: 1000,
  gap: 16,
});

const Spinner = styled.div({
  border: '4px solid rgba(0, 0, 0, 0.1)',
  width: 40,
  height: 40,
  borderRadius: '50%',
  borderLeftColor: '#09f',
  animation: `${spinIn} 1s linear infinite`,
});

export function LoadingOverlay(props: { children?: React.ReactNode }) {
  return (
    <Container>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Spinner />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, yoyo: Infinity }}
      >
        {props.children}
      </motion.div>
    </Container>
  );
}
