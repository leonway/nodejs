(async ()=>{
  const mysql = require('mysql2/promise')
  
  const cfg = {
    host:'localhost',
    user:'root',
    password:'zxc77256',
    database:'kkb'
  }

  const conn = await mysql.createConnection(cfg)

  let ret = await conn.execute(`
        CREATE TABLE IF NOT EXISTS test (
          id INT NOT NULL AUTO_INCREMENT,
          message VARCHAR(45) NULL,
        PRIMARY KEY (id))
  `)
  console.log('create',ret);
  
  ret = await conn.execute(`
      INSERT INTO test(message)
      VALUES(?)
    `, ['ABC'])
    console.log('insert:', ret)


    ret = await conn.execute(`
      SELECT * FROM test
    `)
    console.log(JSON.stringify(ret[0]))
    // console.log(ret[1])

    conn.end()
})()
