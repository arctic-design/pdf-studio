import { styled } from '@pigment-css/react';
import { ColorSchemeSwitch } from './ColorSchemeSwitch';
import { Logo } from './Logo';

const HeaderContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  height: 'var(--header-height)',
  backgroundColor: 'var(--snow-colors-grey-50)',
  color: 'var(--snow-colors-neutral-1000)',
  alignItems: 'center',
  padding: '8px 16px',
});
const LeftPanel = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 12,

  '.title': {
    fontWeight: 700,
    fontSize: 18,
  },

  svg: {
    width: 24,
  },
});
export function Header() {
  return (
    <HeaderContainer>
      <LeftPanel>
        <Logo width={32} height={32} />
        <span className="title">PDF Studio</span>
      </LeftPanel>
      <ColorSchemeSwitch />
    </HeaderContainer>
  );
}
