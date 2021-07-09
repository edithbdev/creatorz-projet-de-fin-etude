import React from 'react';
import PropTypes from 'prop-types';
import {
  Comment,
} from 'semantic-ui-react';
import { formatDate } from 'src/selectors';

const Comments = ({ user, publishedAt, body }) => {
  const publishedDate = new Date(publishedAt);
  const date = formatDate(publishedDate);
  return (
    <Comment>
      <Comment.Avatar src={`http://ec2-54-80-48-178.compute-1.amazonaws.com/images/${user.avatar}`} />
      <Comment.Content className="comments-content">
        <div className="comments-content-author-date">
          <Comment.Author>{user.pseudo}</Comment.Author>
          <Comment.Metadata>
            <div>{date}</div>
          </Comment.Metadata>
        </div>
        <Comment.Text>{body}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

Comments.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    pseudo: PropTypes.string.isRequired,
  }).isRequired,
  publishedAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default Comments;
