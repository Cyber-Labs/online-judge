import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function ContestNavPills(props) {
  const { activeTab, contestId } = props;
  return (
    <Nav>
      <NavItem>
        <Link
          to={`/manage-contests/${contestId}/basic-info`}
          style={{ color: 'black' }}
        >
          <h5>
            <Badge
              className="option pill"
              color={activeTab === 'Basic Info' ? 'dark' : ''}
              size="xl"
              pill
            >
              Basic Info
            </Badge>
          </h5>
        </Link>
      </NavItem>
      <NavItem>
        <Link
          to={`/manage-contests/${contestId}/questions`}
          style={{ color: 'black' }}
        >
          <h5>
            <Badge
              className="option pill"
              color={activeTab === 'Questions' ? 'dark' : ''}
              size="xl"
              pill
            >
              Questions
            </Badge>
          </h5>
        </Link>
      </NavItem>
      <NavItem>
        <Link
          to={`/manage-contests/${contestId}/admins`}
          style={{ color: 'black' }}
        >
          <h5>
            <Badge
              className="option pill"
              color={activeTab === 'Administrator' ? 'dark' : ''}
              size="xl"
              pill
            >
              Administrator
            </Badge>
          </h5>
        </Link>
      </NavItem>
      <NavItem>
        <Link
          to={`/manage-contests/${contestId}/participants`}
          style={{ color: 'black' }}
        >
          <h5>
            <Badge
              className="option pill"
              color={activeTab === 'Participants' ? 'dark' : ''}
              size="xl"
              pill
            >
              Participants
            </Badge>
          </h5>
        </Link>
      </NavItem>
    </Nav>
  );
}

ContestNavPills.propTypes = {
  activeTab: PropTypes.string.isRequired,
  contestId: PropTypes.number.isRequired
};

export default ContestNavPills;
