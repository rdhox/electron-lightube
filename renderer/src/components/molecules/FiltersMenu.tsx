import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { apiApp, ReducerEffect, StateRef } from '../../store';
import {
  SortBy,
  Date,
  Duration,
  Type,
  Filters
} from '../../store/apiType';
// import components
import ButtonText from '../atoms/ButtonText';

interface Props {};

type TFilter = "sort_by" | "date" | "duration" | "type";

const FiltersMenu:React.SFC<Props> = props => {

  function handleChange(filter: TFilter, option: any): void {
    if(filter === "sort_by") {
      setSortBy(option);
    }
    if(filter === "date") {
      setDate(option);
    }
    if(filter === "duration") {
      setDuration(option);
    }
    if(filter === "type") {
      setType(option);
    }

    setFilters({
      ...filtersRef.current,
      [filter]: option
    });
  }

  function resetFilters() {
    setSortBy('relevance');
    setDate('');
    setDuration('');
    setType('video');
    setFilters({
      sort_by: '',
      date: '',
      duration: '',
      type: ''
    });
  }

  const filtersRef: StateRef<Filters> = useRef(apiApp.getState().state.filters);
  const setFilters: ReducerEffect<[Filters]> = apiApp.getState().reducers.setFilters;

  const [ t ] = useTranslation();
  const [ sortBy, setSortBy ] = useState<SortBy>(filtersRef.current.sort_by !== '' ? filtersRef.current.sort_by : 'relevance');
  const [ date, setDate ] = useState<Date>(filtersRef.current.date !== '' ? filtersRef.current.date : '');
  const [ duration, setDuration ] = useState<Duration>(filtersRef.current.duration !== '' ? filtersRef.current.duration : '');
  const [ type, setType ] = useState<Type>(filtersRef.current.type !== '' ? filtersRef.current.type : 'video');

  useEffect(() => {
    const unsubFilters = apiApp.subscribe(
      (filters: Filters) => filtersRef.current = filters,
      appState => appState.state.filters
    );
    return () => {
      unsubFilters();
    }
  }, []);

  return (
    <Container>
      <Row align="space-evenly">
        <Column>
          <Title>{t("molecules.Filters.date")}</Title>
          <Separator />
          <Filter onClick={() => handleChange("date", "hour")} selected={date === "hour"}>{t("molecules.Filters.hour")}</Filter>
          <Filter onClick={() => handleChange("date", "today")} selected={date === "today"}>{t("molecules.Filters.today")}</Filter>
          <Filter onClick={() => handleChange("date", "month")} selected={date === "month"}>{t("molecules.Filters.month")}</Filter>
          <Filter onClick={() => handleChange("date", "year")} selected={date === "year"}>{t("molecules.Filters.year")}</Filter>
        </Column>
        <Column>
          <Title>{t("molecules.Filters.type")}</Title>
          <Separator />
          <Filter onClick={() => handleChange("type", "video")} selected={type === "video"}>{t("molecules.Filters.video")}</Filter>
          <Filter onClick={() => handleChange("type", "playlist")} selected={type === "playlist"}>{t("molecules.Filters.playlist")}</Filter>
        </Column>
        <Column>
          <Title>{t("molecules.Filters.duration")}</Title>
          <Separator />
          <Filter onClick={() => handleChange("duration", "short")} selected={duration === "short"}>{t("molecules.Filters.short")}</Filter>
          <Filter onClick={() => handleChange("duration", "long")} selected={duration === "long"}>{t("molecules.Filters.long")}</Filter>
        </Column>
        <Column>
          <Title>{t("molecules.Filters.sort_by")}</Title>
          <Separator />
          <Filter onClick={() => handleChange("sort_by", "relevance")} selected={sortBy === "relevance"}>{t("molecules.Filters.relevance")}</Filter>
          <Filter onClick={() => handleChange("sort_by", "upload_date")} selected={sortBy === "upload_date"}>{t("molecules.Filters.upload_date")}</Filter>
          <Filter onClick={() => handleChange("sort_by", "view_count")} selected={sortBy === "view_count"}>{t("molecules.Filters.view_count")}</Filter>
          <Filter onClick={() => handleChange("sort_by", "rating")} selected={sortBy === "rating"}>{t("molecules.Filters.rating")}</Filter>
        </Column>
      </Row>
      <Row align="flex-end">
        <ButtonText
          onHandleClick={resetFilters}
          height={20}
          width={100}
        >
          {t('molecules.Filters.reset')}
        </ButtonText>
      </Row>
    </Container>
  );
}

const animation = keyframes`
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    height: 170px;
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 390px;
  height: 0px;
  opacity: 0;
  animation-name: ${animation};
  animation-timing-function: ease-out;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  padding: 15px;
`;

const Row = styled.div<{align: string}>`
  display: flex;
  flex-direction: row;
  justify-content: ${({align}) => align};
  margin: 5px 0;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: 600;
  text-transform: capitalize;
`;

const Separator = styled.div`
  width: 100px;
  height: 1px;
  background-color: lightgray;
  margin: 10px 0;
`;

const Filter = styled.span<{selected: boolean}>`
  font-weight: ${({selected}) => selected ? 'bold': 'normal'};
  font-size: 15px;
  margin: 3px 0;
  cursor: pointer;
`;

export default FiltersMenu;