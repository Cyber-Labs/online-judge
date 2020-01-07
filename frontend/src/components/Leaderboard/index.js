import React, { Component } from 'react';
import Table from 'react-responsive-data-table';
import PropTypes from 'prop-types';
import participants from '../../shared/contest-participants';
import ContestNav from './ContestNav';
import PractiseNav from './PractiseNav';

class Leaderboard extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { isPractise } = this.props;
    return (
      <>
        {isPractise ? <PractiseNav /> : <ContestNav />}
        <div className='container mt-4'>
          <Table
            style={{
              opacity: 0.8,
              backgroundColor: 'blue',
              color: '#ffffff',
              textAlign: 'center'
            }}
            tableStyle='table table-hover table-striped table-bordered table-borderless table-responsive'
            pages
            pagination
            onRowClick={() => {}} // if You Want Table Row Data OnClick then assign this {row => console.log(row)}
            page
            errormsg='Error. . .'
            loadingmsg='Loading. . .'
            isLoading={false}
            sort
            title='LeaderBoard'
            search
            size={5}
            data={{
              head: {
                rank: 'Rank',
                username: 'Username',
                question1: 'Queston 1 Score',
                question2: 'Queston 2 Score',
                question3: 'Queston 3 Score',
                question4: 'Queston 4 Score',
                total: 'Total score'
              },
              data: participants
            }}
          />
          <br />
        </div>
      </>
    );
  }
}

Leaderboard.propTypes = {
  isPractise: PropTypes.bool.isRequired
};

export default Leaderboard;
