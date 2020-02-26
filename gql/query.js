const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} = require("graphql");
const { Snapshot } = require("../model");
const { SnapshotType } = require("./types");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    fetchSnapshotSources: {
      type: GraphQLList(SnapshotType),
      args: {
        type: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { type }) {
        return Snapshot[type].find();
      }
    }
  })
});

module.exports = RootQuery;
