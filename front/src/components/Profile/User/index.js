import React from 'react';
import PropTypes from 'prop-types';
import { List, Image } from 'semantic-ui-react';

import './style.scss';

const User = ({ pseudo, email, avatar }) => (
  <List>
    <List.Item>
      <Image id="userAvatar" src={`http://ec2-54-80-48-178.compute-1.amazonaws.com/images/${avatar}`} alt="avatar" avatar fluid />
    </List.Item>
    <List.Item>
      <List.Content>Pseudo : {pseudo}</List.Content>
    </List.Item>
    <List.Item>
      <List.Content>Email : {email}</List.Content>
    </List.Item>
  </List>
);

User.propTypes = {
  pseudo: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default User;
