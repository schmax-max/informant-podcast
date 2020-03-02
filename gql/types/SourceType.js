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

const SourceType = new GraphQLObjectType({
  name: "SourceType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    source_url: { type: GraphQLString },
    source_domain: { type: GraphQLString },
    filtering: { type: FilteringType },
    previous_pull: { type: PreviousPullType },
    nuzzel: { type: NuzzelType }
  })
});

const NuzzelType = new GraphQLObjectType({
  name: "NuzzelType",
  fields: () => ({
    nuzzel_user_name: { type: GraphQLString },
    nuzzel_user_id: { type: GraphQLString },
    nuzzel_user_password: { type: GraphQLString }
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

module.exports = SourceType;
