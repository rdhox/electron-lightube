import React from 'react';
import styled from 'styled-components';
import { useApp } from '../../store';
import { ModalAlert } from '../../store/modelApp';
// import components
import ButtonText from '../atoms/ButtonText';

interface Props {};

const AlertWindow: React.SFC = props => {

  function handleClick(choice: string): void {
    if (actionDefault) {
      actionDefault();
    }

    if (choice === 'no') {
      if (actionNo) {
        actionNo();
      }
    } else if (choice === 'yes') {
      actionYes();
    }
  }
  const displayModalAlert: ModalAlert = useApp(appState => appState.state.displayModalAlert);

  const {
    title,
    text,
    yes,
    no,
    actionYes,
    actionNo,
    actionDefault,
    singleButton
  } = displayModalAlert;

  return (
    <Window>
      <h5 >{title}</h5>
      <p>{text}</p>
      <WrapperButton>
        {singleButton ? (
          <ButtonText onHandleClick={() => handleClick('OK')}>OK</ButtonText>
        ) : (
          <>
            <ButtonText onHandleClick={() => handleClick('no')}>{no}</ButtonText>
            <ButtonText onHandleClick={() => handleClick('yes')}>{yes}</ButtonText>
          </>
        )}
      </WrapperButton>
    </Window>
  );
};

const Window = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  margin-top: 15%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
`;

const WrapperButton = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`;

export default AlertWindow;
