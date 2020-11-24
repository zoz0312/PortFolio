import React from 'react';
import { RouteProps, RouteComponentProps, match } from 'react-router-dom';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';

import './main.animation.scss';

type Props = {
  location: { key?: string } | undefined;
};

const MainAnimation: React.FC<Props> = (
  { children, location }
): JSX.Element => {
  console.log('location', location)
  return (
    <TransitionGroup>
      <CSSTransition
        key={location?.key}
        // timeout={{ enter: 300, exit: 300 }}
        // classNames="page"
        timeout={1000}
        classNames="frame"
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
}

export default MainAnimation;