const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'zuomeng'
})

const query = (...args) =>
  new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        return reject(error)
      }
      connection.query(...args, (err, results, fields) => {
        connection.release()
        if (err) {
          return reject(err)
        }
        resolve({ results, fields })
      })
    })
  })

module.exports = {
  pool,
  query
}
