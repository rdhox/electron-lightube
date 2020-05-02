import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { apiApp, useApp } from '../../store';
import { IComments } from '../../store/apiType';
// import components
import Comment from './Comment';
import '../atoms/Spinner';
import Spinner from '../atoms/Spinner';

interface Props {
  video: string;
};

const Comments: React.SFC<Props> = props => {
  const { video } = props;

  const fetchComments = apiApp.getState().effects.fetchComments;
  const commentsCollection: IComments = useApp(appState => appState.state.commentsCollection);

  const [ idVideo, setIdVideo ] = useState<string>(video);

  useEffect(() => {
    if(video !== idVideo) {
      setIdVideo(video);
    } else if (video === idVideo) {
      fetchComments(video);
    }
  }, [video, idVideo, setIdVideo, fetchComments, commentsCollection]);

  if(Object.keys(commentsCollection).length < 1) {
    return <Spinner />
  }

  return (
    <Container>
      {commentsCollection.comments.map((comment, i) => {
        const {
          author,
          authorThumbnails,
          contentHtml,
          publishedText,
        } = comment;

        return (
          <Comment
            key={`${author}-${i}-${publishedText}`}
            index={i}
            author={author}
            authorThumbnails={authorThumbnails[2].url}
            contentHtml={contentHtml}
            publishedText={publishedText}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export default Comments;