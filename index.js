const {app, ports, service} = require('./config');
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : ports[service];
app.listen(port, () => {
    console.log(`${service} server listening on port ${port}`);
});