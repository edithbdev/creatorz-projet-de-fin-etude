import React from 'react';
import PropTypes from 'prop-types';
import Page from 'src/components/Page';
import CreatorForm from 'src/containers/CreatorForm';
import UserForm from 'src/containers/UserForm';

const Update = ({
  currentUser,
}) => {
  let isCreator = false;
  if (currentUser.roles[0] === 'ROLE_CREATOR') {
    isCreator = true;
  }
  return (
    <Page>
      <h1>Modification du profil</h1>
      {isCreator && (
        <CreatorForm />
      )}
      {!isCreator && (
        <UserForm />
      )}
    </Page>
  );
};
Update.propTypes = {
  currentUser: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};

Update.defaultProps = {
  currentUser: null,
};

export default Update;
