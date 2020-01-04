/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import PropTypes from 'prop-types';
import { Media, Input } from 'reactstrap';

function UserInfo(props) {
  const { user } = props;
  const { isAdmin, isCreator, name, pic, username } = user;
  console.log(user);

  return (
    <Media tag='li'>
      <Media left middle>
        <img src={pic} alt={name} height='150px' width='150px' />
      </Media>
      <Media body style={{ marginLeft: '15px' }}>
        <Media heading>{name}</Media>
        <h5 className='text-muted'>{username}</h5>
        {isCreator ? <h4>Creator</h4> : ''}
        {!isCreator ? (
          <>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Input type='checkbox' checked={isAdmin} />
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
  }).isRequired
};

export default UserInfo;
