import React, { Component } from 'react';
import PieChart from 'react-minimal-pie-chart';

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: 'images/profile.png',
      course: 'QWERTY',
      dept: 'ASDFGH',
      success: '12',
      failed: '7',
      pending: '2'
    };
  }

  render() {
    const { picture } = this.state;
    const { username } = this.state;
    const { course } = this.state;
    const { dept } = this.state;
    const { success } = this.state;
    const { failed } = this.state;
    const { pending } = this.state;
    return (
      <div className='container mb-5 pb-5'>
        <div className='row mt-5 '>
          <div className='col'>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <img alt='User face' width='250px' height='250px' src={picture} />
          </div>
          <div className='col'>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
              <h5>
                Course:
                {course}
              </h5>
              <h5>
                Dept:
                {dept}
              </h5>
              <br />
              <h6>
                qwertyuiopasdfghjklzxcvbnmqwertyuio qwertyuioasdfghjkxcvb
                sdfghvdch hveuy iqvlwl h3wyi cucobca kbcu CK ackbcCBC
                Kcbuabcubacbc na cabcabc qwertyuiopasdfghjklzxcvbnmqwertyuio
                qwertyuioasdfghjkxcvb sdfghvdch hveuy iqvlwl h3wyi cucobca kbcu
                CK ackbcCBC Kcbuabcubacbc na cabcabc
                qwertyuiopasdfghjklzxcvbnmqwertyuio qwertyuioasdfghjkxcvb
                sdfghvdch hveuy iqvlwl h3wyi cucobca kbcu CK ackbcCBC
                Kcbuabcubacbc na cabcabc qwertyuiopasdfghjklzxcvbnmqwertyuio
                qwertyuioasdfghjkxcvb sdfghvdch hveuy iqvlwl h3wyi cucobca kbcu
                CK ackbcCBC Kcbuabcubacbc na cabcabc
              </h6>
            </div>
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col'>
            <a href='/homepage'>
              <h4>Username</h4>
              <a href='/#'>{username}</a>
              <i className='fa fa-trophy' aria-hidden='true' />
              {0}
              <i className='fa fa-trophy ml-2' aria-hidden='true' />
              {0}
              <i className='fa fa-trophy ml-2' aria-hidden='true' />
              {0}
            </a>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <hr />
            <br />
            <br />
            <h3>No. of questions __</h3>
            <br />
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <h4>
              {' '}
              Successful Submissions:
              {success}
            </h4>
          </div>
          <div className='col-4'>
            <h4>
              {' '}
              Failed Submissions:
              {failed}
            </h4>
          </div>
          <div className='col-4'>
            <h4>
              {' '}
              Pending Submissions:
              {pending}
            </h4>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <br />
            <br />
            <PieChart
              style={{ width: '200px', margin: 'auto' }}
              data={[
                {
                  title: 'Success',
                  value: 7,
                  color: '#C13C37'
                },
                { title: 'Failed', value: 2, color: '#6A2135' }
              ]}
            />
            <br />
            <br />
          </div>
        </div>
        <hr />
        <br />
        <br />
        <div className='row'>
          <div className='col-6'>
            <h4> Links to recent contest given or participated: </h4>
            <br />
            <a href='/#'>contests one</a>
            <br />
            <a href='/#'>contests two</a>
            <br />
            <a href='/#'>contests three</a>
            <br />
            <a href='/#'>contests four</a>
            <br />
            <a href='/#'>contests five</a>
          </div>
          <div className='col-6'>
            <h4>Tips or tutorials links:</h4>
            <br />
            <a href='/#'>contests one</a>
            <br />
            <a href='/#'>contests two</a>
            <br />
            <a href='/#'>contests three</a>
            <br />
            <a href='/#'>contests four</a>
            <br />
            <a href='/#'>contests five</a>
          </div>
        </div>

        <br />
        <br />
        <div className='row'>
          <div className='col-6'>
            <h4> Links to recent questions:</h4>
            <br />
            <a href='/#'>contests one</a>
            <br />
            <a href='/#'>contests two</a>
            <br />
            <a href='/#'>contests three</a>
            <br />
            <a href='/#'>contests four</a>
            <br />
            <a href='/#'>contests five</a>
          </div>
          <div className='col-6'>
            <h4>Activity on Q/A section links:</h4>
            <br />
            <a href='/#'>contests one</a>
            <br />
            <a href='/#'>contests two</a>
            <br />
            <a href='/#'>contests three</a>
            <br />
            <a href='/#'>contests four</a>
            <br />
            <a href='/#'>contests five</a>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewProfile;
