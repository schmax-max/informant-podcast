require("./config/connection");
const { create } = require("./adhoc");

create();

const { params } = require("./tests/data");
const { commander } = require("./svc");
// commander(params).then(res => {
//   console.log({ res });
// });
