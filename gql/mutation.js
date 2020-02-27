const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} = require("graphql");
const { Snapshot } = require("../model");
const { SnapshotType } = require("./types");

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    fetchSources: {
      type: GraphQLList(SnapshotType),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        // return Snapshot[args][type].find();
      }
    }
  })
});

function processAllocation(action) {
  // console.log("in processAllcoation");
  const keys = ["allocation_name", "parent_category"];
  return processItem(action, AllocationType, Allocation, keys);
}

function processIdentifier(action) {
  const keys = ["identifier_name", "identifier_type", "parent_allocation"];
  return processItem(action, IdentifierType, Identifier, keys);
}

function processItem(action, type, model, keys) {
  // console.log("in processItem");
  const args = {};
  keys.forEach(key => {
    // console.log({ key });
    args[key] = { type: new GraphQLNonNull(GraphQLString) };
  });
  return {
    type,
    args,
    resolve(parentValue, args) {
      const find = {};
      // console.log({ args });
      keys.forEach(key => {
        if (key === "parent_category" && args[key] === "orphaned") {
          // find[key] = args[key];
        } else if (key !== "identifier_type") {
          find[key] = args[key];
        } else if (key === "identifier_type") {
          const identifier_type = args[key];
          model = model[identifier_type];
        }
      });
      // console.log({ find });
      if (action === "create") {
        // console.log(`goes to create`);
        const update = {};
        update["$set"] = find;
        const options = { upsert: true, new: true };
        return model.findOneAndUpdate(find, update, options);
      } else if (action === "delete") {
        // console.log(`goes to delete`);
        return model.deleteOne(find);
      }
    }
  };
}

async function updateCategoryFunction(
  model,
  key,
  { old_category_name, new_category_name }
) {
  const find = {};
  find[key] = old_category_name;
  const updateSet = {};
  updateSet[key] = new_category_name;
  const update = {};
  update["$set"] = updateSet;
  const options = { upsert: false, new: true };
  return await model.updateMany(find, update, options);
}

module.exports = Mutation;
