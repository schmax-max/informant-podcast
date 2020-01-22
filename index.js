require('./config/connection')
const {app} = require('./config/server')
const {ports} = require('./config/ports')
const service = 'links-generic'

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : ports[service];
app.listen(port, () => {
    console.log(`${service} server listening on port ${port}`);
});

