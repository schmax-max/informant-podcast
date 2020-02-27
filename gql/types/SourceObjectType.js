const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull
} = graphql;

const SourceObjectType = new GraphQLInputObjectType({
  name: "SourceObjectType",
  // description: "User type definition",
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    source_url: {
      type: new GraphQLNonNull(GraphQLString)
    }
    // filtering: {
    //   type: FilteringType
    // }
  })
});

const FilteringType = new GraphQLInputObjectType({
  name: "FilteringType",
  // description: "User type definition",
  fields: () => ({
    link_includer: {
      type: new GraphQLNonNull(GraphQLString)
    },
    link_excluder: {
      type: new GraphQLNonNull(GraphQLString)
    },
    beginning_identifier: {
      type: new GraphQLNonNull(GraphQLString)
    },
    end_identifier: {
      type: new GraphQLNonNull(GraphQLString)
    },
    number_of_links: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
});

module.exports = SourceObjectType;
