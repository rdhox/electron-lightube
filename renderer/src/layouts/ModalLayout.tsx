import React from 'react';

import { useApp } from '../store';
// import components
import Modal from '../components/organisms/Modal';
import AlertWindow from '../components/molecules/AlertWindow';

interface Props {

};

const ModalLayout: React.SFC<Props> = props => {
  const isDeleteThemeDisplayed = useApp(appState => appState.state.isDeleteThemeDisplayed);
  return (
    <>
      {isDeleteThemeDisplayed && (
        <Modal>
          <AlertWindow />
        </Modal>
      )}
    </>
  );
}

export default ModalLayout;