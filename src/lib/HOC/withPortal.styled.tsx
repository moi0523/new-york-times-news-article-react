import { position } from 'polished';
import { styled } from 'styletron-react';

export const StyledWithPortalBackgroundHolder = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  ...position('0', '0', '0', '0'),
  zIndex: 10,
});
