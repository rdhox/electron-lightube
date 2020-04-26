import React from 'react';

import { useApp } from '../store';
// import components
import Modal from '../components/organisms/Modal';
import AlertWindow from '../components/molecules/AlertWindow';
import SearchModal from '../components/organisms/SearchModal';

interface Props {

};

const ModalLayout: React.SFC<Props> = props => {

  const isDeleteThemeDisplayed = useApp(appState => appState.state.isDeleteThemeDisplayed);
  const isSearchModalDisplayed = useApp(appState => appState.state.isSearchModalDisplayed);

  return (
    <>
      {isDeleteThemeDisplayed && (
        <Modal>
          <AlertWindow />
        </Modal>
      )}
      {isSearchModalDisplayed && (
        <Modal header>
          <SearchModal />
        </Modal>
      )}
    </>
  );
}

export default ModalLayout;