const {
  pool
} = require('../db')

/**
 *
 */

function sort () {
  pool.query(
    `UPDATE contests
        SET status = 1
        WHERE  (CURRENT_TIMESTAMP-contest_start_time >0 AND CURRENT_TIMESTAMP-contest-end_time<0)=1;
        UPDATE contests
        SET status = 2
        WHERE  (CURRENT_TIMESTAMP - end_time>0)=1;
        UPDATE contests
        SET status = 0
        WHERE  ((CURRENT_TIMESTAMP - start_time<0)=1;
        ;
              `,
    (error, results) => {
      if (error) {
        return ('Status cant be updated')
      }
      return (results)
    }
  )
}

module.exports = sort
