import { isNull } from 'lodash';
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useKey, useMount } from 'react-use';
import { useStyletron } from 'styletron-react';
import { OverrideObject } from '../style/component.types';
import { getOverrideStyle, isBrowserContext } from '../helper/common';
import { StyledWithPortalBackgroundHolder } from './withPortal.styled';

type WithPortalOverrides = {
  Root?: Omit<OverrideObject<WithPortalProps>, 'component'>;
};

interface WithPortalProps {
  node?: Element | null;
  targetId?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isDimBlocked?: boolean;
  children: ReactNode;
  overrides?: WithPortalOverrides;
}

const WithPortal = ({
  targetId = 'LayersContainer',
  children,
  node,
  isOpen,
  setIsOpen,
  isDimBlocked = false,
  overrides,
}: WithPortalProps) => {
  const [css] = useStyletron();
  const [didMounted, setDidMounted] = useState(false);
  useKey('Escape', () => {
    setIsOpen(false);
  });

  useMount(() => {
    setDidMounted(true);
  });

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isBrowserContext() || !isOpen) {
    return null;
  }

  const detectedTargetNode = node ?? document.getElementById(targetId);

  if (isNull(detectedTargetNode)) {
    return null;
  }

  return didMounted
    ? createPortal(
        <StyledWithPortalBackgroundHolder
          id="backgroundHolder"
          className={css(getOverrideStyle<WithPortalProps>(overrides))}
          onClick={(event) => {
            if (!isDimBlocked && (event.target as HTMLDivElement).id === 'backgroundHolder') {
              setIsOpen(false);
            }
          }}
        >
          {children}
        </StyledWithPortalBackgroundHolder>,
        detectedTargetNode,
      )
    : null;
};

export { WithPortal };
export type { WithPortalProps };
