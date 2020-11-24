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
  return (
    <div className="container">
      <TransitionGroup>
        <CSSTransition
          key={location?.key}
          timeout={500}
          classNames="frame"
        >
          {children}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default MainAnimation;