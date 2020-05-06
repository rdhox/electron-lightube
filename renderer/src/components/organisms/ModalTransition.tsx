import React from 'react';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';

interface Props {
  show: boolean;
  duration: number;
  WrapperComponent: React.SFC<{transitionState: string}>;
  exit?: boolean;
  alwaysVisible?: boolean;
};

const ModalTransition: React.SFC<Props> = props => {
  const {
    show,
    duration,
    WrapperComponent,
    exit = false,
    alwaysVisible =false,
  } = props;

  return ReactDOM.createPortal(
    <Transition
      in={show}
      timeout={duration}
      mountOnEnter={!alwaysVisible}
      unmountOnExit={!alwaysVisible}
      exit={exit}
    >
      {(transitionState: string) => {
        if (alwaysVisible)
          return React.createElement(WrapperComponent, { ...props, transitionState }, null);
        return exit
          ? React.createElement(WrapperComponent, { ...props, transitionState }, null)
          : show && React.createElement(WrapperComponent, { ...props, transitionState }, null);
      }}
    </Transition>,
    document.getElementById('root')
  );
};

export default ModalTransition;
