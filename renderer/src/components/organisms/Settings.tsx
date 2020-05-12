import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { transitionSettings, isoCountries, locales } from '../../config/hardData';
import { apiSettings, StateRef, ReducerEffect } from '../../store';
import { apiInstance } from '../../services/apiService';
// import components

interface Props {
  transitionState: string;
};

const Settings: React.SFC<Props> = props => {

  function handleLocales(e: React.ChangeEvent<HTMLSelectElement>) {
    const { currentTarget: { value } } = e;
    setLocale(value);
    setLocaleLocal(value);
    i18n.changeLanguage(value);
  }
  function handleCodeRegion(e: React.ChangeEvent<HTMLSelectElement>) {
    const { currentTarget: { value } } = e;
    setCodeRegionLocal(value);
    setCodeRegion(value);
  }
  function handleChangeInstance(e: React.ChangeEvent<HTMLInputElement>) {
    const { currentTarget: { value } } = e;
    setInstance(value);
  }
  function handleInstance() {
    setApiUrl(instance);
    apiInstance.setUrl(instance);
  }
  function handleAutoplay(e: React.ChangeEvent<HTMLInputElement>) {
    setAutoPlayLocal(!autoplayRef.current);
    setAutoPlay(!autoplayRef.current);
  }
  function handleShowComments(e: React.ChangeEvent<HTMLInputElement>) {
    setShowCommentsLocal(!showCommentsRef.current);
    setShowComments(!showCommentsRef.current);
  }
  function handleShowRecommended(e: React.ChangeEvent<HTMLInputElement>) {
    setShowRecommendedLocal(!showRecommendedRef.current);
    setShowRecommended(!showRecommendedRef.current);
  }
  
  const {
    transitionState
  } = props;
  const { defaultStyle, transitionStyles } = transitionSettings;

  const { t, i18n } = useTranslation();

  const localeRef: StateRef<string> = useRef(apiSettings.getState().state.locale);
  const apiUrlRef: StateRef<string> = useRef(apiSettings.getState().state.apiUrl);
  const autoplayRef: StateRef<boolean> = useRef(apiSettings.getState().state.autoplay);
  const showRecommendedRef: StateRef<boolean> = useRef(apiSettings.getState().state.showRecommended);
  const showCommentsRef: StateRef<boolean> = useRef(apiSettings.getState().state.showComments);
  const codeRegionRef: StateRef<string> = useRef(apiSettings.getState().state.codeRegion);

  const setLocale: ReducerEffect = apiSettings.getState().reducers.setLocale;
  const setApiUrl: ReducerEffect = apiSettings.getState().reducers.setApiUrl;
  const setAutoPlay: ReducerEffect = apiSettings.getState().reducers.setAutoPlay;
  const setShowRecommended: ReducerEffect = apiSettings.getState().reducers.setShowRecommended;
  const setShowComments: ReducerEffect = apiSettings.getState().reducers.setShowComments;
  const setCodeRegion: ReducerEffect = apiSettings.getState().reducers.setCodeRegion;

  const [ localeLocal, setLocaleLocal ] = useState<string>(localeRef.current);
  const [ codeRegionLocal, setCodeRegionLocal ] = useState<string>(codeRegionRef.current);
  const [ instance, setInstance ] = useState<string>(apiUrlRef.current);
  const [ autoPlayLocal, setAutoPlayLocal ] = useState<boolean>(autoplayRef.current);
  const [ showCommentsLocal, setShowCommentsLocal ] = useState<boolean>(showCommentsRef.current);
  const [ showRecommendedLocal, setShowRecommendedLocal ] = useState<boolean>(showRecommendedRef.current);

  useEffect(() => {
    const unsubLocale = apiSettings.subscribe(
      (locale: string) => localeRef.current = locale,
      settingsState => settingsState.state.locale
    );
    const unsubApiUrl = apiSettings.subscribe(
      (apiUrl: string) => apiUrlRef.current = apiUrl,
      settingsState => settingsState.state.apiUrl
    );
    const unsubAutoPlay = apiSettings.subscribe(
      (autoplay: boolean) => autoplayRef.current = autoplay,
      settingsState => settingsState.state.autoplay
    );
    const unsubShowRecommended = apiSettings.subscribe(
      (showRecommended: boolean) => showRecommendedRef.current = showRecommended,
      settingsState => settingsState.state.showRecommended
    );
    const unsubShowComments = apiSettings.subscribe(
      (showComments: boolean) => showCommentsRef.current = showComments,
      settingsState => settingsState.state.showComments
    );
    const unsubCodeRegion = apiSettings.subscribe(
      (codeRegion: string) => codeRegionRef.current = codeRegion,
      settingsState => settingsState.state.codeRegion
    );

    return () => {
      unsubLocale();
      unsubApiUrl();
      unsubAutoPlay();
      unsubShowRecommended();
      unsubShowComments();
      unsubCodeRegion();
    }

  }, []);

  return (
    <Container
      style={{
        ...defaultStyle,
        ...transitionStyles[transitionState],
      }}
    >
      <Row>
        <Label htmlFor="locale" >{t('organisms.Settings.locale')}</Label>
        <select style={{ appearance: "none", outline: "none"}} id="locale" name="locale" value={localeLocal} onChange={handleLocales}>
          {locales.map((l, i) => <option key={`${l}-${i}`} value={l}>{l}</option>)}
        </select>
      </Row>
      <Separator />
      <Row>
        <Label htmlFor="codeRegion" >{t('organisms.Settings.codeRegion')}</Label>
        <select style={{ appearance: "none", outline: "none", width: '100px'}} id="codeRegion" name="codeRegion" value={codeRegionLocal} onChange={handleCodeRegion}>
          {Object.keys(isoCountries).map((code, i) => <option key={`${code}-${i}`} value={code}>{isoCountries[code]}</option>)}
        </select>
      </Row>
      <Separator />
      <Column>
        <Row>
          <Label htmlFor="instance" >
            <LinkAction href="https://github.com/omarroth/invidious/wiki/Invidious-Instances" >
              {t('organisms.Settings.instance')}
            </LinkAction>
          </Label>
          <input
            style={{ appearance: "none", outline: "none", width: '150px'}}
            id="instance"
            name="instance"
            type="text"
            value={instance}
            onChange={handleChangeInstance}
          />
        </Row>
        <Row align="flex-end">
          <button onClick={handleInstance}>{t('organisms.Settings.confirmInstance')}</button>
        </Row>
      </Column>
      <Separator />
      <Row>
        <Label htmlFor="autoplay" >{t('organisms.Settings.autoplay')}</Label>
        <input
          style={{ appearance: "none", outline: "none"}}
          id="autoplay"
          name="autoplay"
          type="checkbox"
          checked={autoPlayLocal}
          onChange={handleAutoplay}
        />
      </Row>
      <Separator />
      <Row>
        <Label htmlFor="showComments" >{t('organisms.Settings.showComments')}</Label>
        <input
          style={{ appearance: "none", outline: "none"}}
          id="showComments"
          name="showComments"
          type="checkbox"
          checked={showCommentsLocal}
          onChange={handleShowComments}
        />
      </Row>
      <Separator />
      <Row>
        <Label htmlFor="showRecommended" >{t('organisms.Settings.showRecommended')}</Label>
        <input
          style={{ appearance: "none", outline: "none"}}
          id="showRecommended"
          name="showRecommended"
          type="checkbox"
          checked={showRecommendedLocal}
          onChange={handleShowRecommended}
        />
      </Row>
      <Separator />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0px;
  left: 5px;
  width: 300px;
  min-height: 600px;
  border: 1px solid lightGrey;
  box-shadow: 0px 6px 12px lightGrey;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;
  background-color: white;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: lightgrey;
  margin: 5px 0;
`;

const Row = styled.div<{align?: string}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${({align}) => align ? align : "space-between"};
  align-items: center;
  margin: 5px 0;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 5px 0;
`;

const Label = styled.label`
  font-size: 12px;
  color: grey;
  margin-right: 10px;
`;

const LinkAction = styled.a`
  color: grey;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;


export default Settings;