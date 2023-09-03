import { gsap } from 'gsap';
import { MutableRefObject, RefObject } from 'react';

// Standard form animations
export const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  const label = e.target.parentNode?.querySelector('label');
  const line = e.target.parentNode?.querySelector('.line');
  if (label && line) {
    gsap.to(label, {
      duration: 0.2,
      color: '#4a65ff',
    });
    gsap.to(line, {
      scaleX: 1,
    });
  }
};

export const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  const label = e.target.parentNode?.querySelector('label');
  const line = e.target.parentNode?.querySelector('.line');

  if (label && line) {
    gsap.to(label, {
      duration: 0.1,
      color: '#999',
    });
    gsap.to(line, {
      scaleX: 0,
    });
  }
};

// Login/register form animations
export const authHandleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  const label = e.target.parentNode?.querySelector('label');
  const line = e.target.parentNode?.querySelector('.line');
  if (label && line) {
    gsap.to(label, {
      duration: 0.2,
      y: -16,
      color: '#4a65ff',
    });
    gsap.to(line, {
      scaleX: 1,
    });
  }
};

export const authHandleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  const label = e.target.parentNode?.querySelector('label');
  const line = e.target.parentNode?.querySelector('.line');

  if (label && line) {
    if (e.target.value === '') {
      gsap.to(label, {
        duration: 0.1,
        y: 0,
        color: '#999',
      });
      gsap.to(line, {
        scaleX: 0,
      });
    }
  }
};

export const appearanceAnimation = (
  ref: RefObject<HTMLFormElement>,
  tlRef: MutableRefObject<gsap.core.Timeline | undefined>
) => {
  const ctx = gsap.context((self) => {
    const loginBox = self.selector('.box');
    const loginElements = self.selector('.box *');
    const labels = self.selector('label');

    tlRef.current = gsap
      .timeline()
      .from(loginBox, {
        delay: 0.4,
        ease: 'ease.Out',
        scale: 0.9,
        duration: 0.4,
        opacity: 0,
        clipPath:
          'polygon(0px 250px, 50px 200px, 300px 200px, 300px 250px, 250px 300px, 0px 300px)',
      })

      .from(loginElements, {
        opacity: 0,
        stagger: 0.01,
      })
      .to(labels, {
        opacity: 1,
        stagger: 0.1,
      });
  }, ref);
  return () => ctx.revert();
};
