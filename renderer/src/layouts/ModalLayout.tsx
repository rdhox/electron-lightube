import React from 'react';

import { useApp } from '../store';
// import components
import Modal from '../components/organisms/Modal';
import ModalTransition from '../components/organisms/ModalTransition';
import AlertWindow from '../components/molecules/AlertWindow';
import SearchModal from '../components/organisms/SearchModal';
import Settings from '../components/organisms/Settings';

interface Props {

};

const ModalLayout: React.SFC<Props> = props => {

  const isDeleteThemeDisplayed = useApp(appState => appState.state.isDeleteThemeDisplayed);
  const isSearchModalDisplayed = useApp(appState => appState.state.isSearchModalDisplayed);
  const isSettingsModalDisplayed = useApp(appState => appState.state.isSettingsModalDisplayed);

  return (
    <>
      <ModalTransition
        show={isSettingsModalDisplayed}
        duration={150}
        WrapperComponent={Settings}
        exit
      />
      
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