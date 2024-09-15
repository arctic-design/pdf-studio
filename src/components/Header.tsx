import { styled } from '@pigment-css/react';
import { ColorSchemeSwitch } from './ColorSchemeSwitch';
import Image from 'next/image';

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
});
export function Header() {
  return (
    <HeaderContainer>
      <LeftPanel>
        <Image
          alt="app logo"
          src={`/icon.svg`}
          width={24}
          height={24}
          priority
        />
        <span>PDF Studio</span>
      </LeftPanel>
      <ColorSchemeSwitch />
    </HeaderContainer>
  );
}
