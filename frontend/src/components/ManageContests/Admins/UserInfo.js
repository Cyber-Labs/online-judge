/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import PropTypes from 'prop-types';
import { Media, Input } from 'reactstrap';

function UserInfo(props) {
  const { user, toggleAdmin } = props;
  const { isAdmin, isCreator, id, name, pic, username } = user;

  return (
    <Media tag='li'>
      <Media left middle>
        <img src={pic} alt={name} height='90px' width='90px' />
      </Media>
      <Media body style={{ marginLeft: '10px' }}>
        <Media heading>{name}</Media>
        <h5 className='text-muted'>{username}</h5>
        {isCreator ? <h5>Creator</h5> : ''}
        {!isCreator ? (
          <>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Input
              type='checkbox'
              checked={isAdmin}
              onClick={() => {
                toggleAdmin(id);
              }}
            />
            Is admin
          </>
        ) : (
          ''
        )}
      </Media>
    </Media>
  );
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
    isCreator: PropTypes.bool,
    isAdmin: PropTypes.bool,
    pic: PropTypes.string
  }).isRequired,
  toggleAdmin: PropTypes.func.isRequired
};

export default UserInfo;
