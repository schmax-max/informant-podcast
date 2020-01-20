const {connection} = require('./connection')
connection()

const {create} = require('./svc/create')
create('mbfc')