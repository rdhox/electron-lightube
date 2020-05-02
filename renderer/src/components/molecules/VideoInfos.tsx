import React from 'react';
import styled from 'styled-components';

import { getFormatDate } from '../../utils/functions';
import { useTranslation } from 'react-i18next';
// import components
import SmallTitle from '../atoms/SmallTitle';
import Title from '../atoms/Title';
import Picto from '../atoms/Picto';

interface Props {
  title?: string;
  descriptionHtml?: string;
  subCountText?: string;
  viewCount?: number;
  published?: number;
  authorIcon?: string;
  author?: string
};

const VideoInfos: React.SFC<Props> = props => {

  const {
    title = '',
    descriptionHtml = '',
    subCountText = '',
    viewCount = null,
    published = null,
    authorIcon = '',
    author = ''
  } = props;

  const [t] = useTranslation();

  console.log(authorIcon);
  return (
    <Container>
      <Row>
        {title !== '' ? <Title bold>{title}</Title> : <Placeholder width={80} height={20} color="#BDBDBD" />}
      </Row>
      <Row>
        {viewCount !== null ? 
          <span>
            <SmallTitle>{viewCount.toString()}</SmallTitle>
            <SmallText>{t("molecules.VideoInfos.views")}</SmallText>
          </span>
           : <Placeholder width={10} height={15} color="#EEEEEE" />
        }
        <SmallText>•</SmallText>
        {published !== null ?
            <SmallText>{getFormatDate(published)}</SmallText>
            : <Placeholder width={10} height={15} color="#EEEEEE" />
        }
      </Row>
      <Row>
        <Separator />
      </Row>
      <Row align="flex-start" >
        {authorIcon !== '' ?  <Avatar src={authorIcon} /> : 
          <PlaceHolderImage>
            <Picto icon="noimage" width={60} height={60} color="#BDBDBD" />
          </PlaceHolderImage>
        }
        {author !== '' ? <SmallTitle bold>{author}</SmallTitle> : <Placeholder width={10} height={20} color="#BDBDBD" />}
          <SmallText>•</SmallText>
        {subCountText !== '' ? <SmallText>{subCountText}</SmallText> : <Placeholder width={5} height={20} color="#EEEEEE" />}
      </Row>
      <Row>
        <Separator />
      </Row>
      <Row align="flex-start">
        <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
      </Row>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const Row = styled.div<{align?: string}>`
  display: flex;
  justify-content: ${({align}) => align ? align: "center"};
  align-items: center;
`;

const Separator = styled.div`
  width: 90%;
  height: 1px;
  background-color: lightgray;
  margin: 5px 0;
`;

const Placeholder = styled.div<{width: number, height: number, color: string}>`
  box-sizing: border-box;
  margin: 3px 2px ;
  width: ${({width}) => `${width}%`};
  height: ${({height}) => `${height}px`};
  background-color: ${({color}) => color};
`;

const PlaceHolderImage = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border: solid 1px #757575;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SmallText = styled.span`
  font-size: 15px;
  margin-left: 5px;
`;

const Avatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-right: 5px;
`;

export default VideoInfos;