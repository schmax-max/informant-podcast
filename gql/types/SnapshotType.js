const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean
} = graphql;
const { Snapshot } = require("../../model");

const SnapshotType = new GraphQLObjectType({
  name: "SnapshotType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    source_url: { type: GraphQLString },
    source_domain: { type: GraphQLString },
    filtering: { type: FilteringType },
    previous_pull: { type: PreviousPullType }
  })
});

const FilteringType = new GraphQLObjectType({
  name: "FilteringType",
  fields: () => ({
    end_identifier: { type: GraphQLString },
    beginning_identifier: { type: GraphQLString },
    link_includer: { type: GraphQLString },
    link_excluder: { type: GraphQLString }
  })
});

const PreviousPullType = new GraphQLObjectType({
  name: "PreviousPullType",
  fields: () => ({
    date: { type: GraphQLString },
    links_count: { type: GraphQLInt },
    error: { type: GraphQLBoolean },
    links: { type: GraphQLList(GraphQLString) }
  })
});

module.exports = SnapshotType;
