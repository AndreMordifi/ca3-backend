var mysql = require("mysql");
var connector = {};
connector.getConnection = ()=>{
    return mysql.createConnection(
        {
        host: 'us-cdbr-east-04.cleardb.com',
        user: 'bc1ffceb381cf4',
        password: 'ac9a1772',
        database: 'heroku_cda4495d0682802'
    }
    );
}
module.exports = connector;