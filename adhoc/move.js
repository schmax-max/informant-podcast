const { Snapshot } = require("../model");
module.exports = { move };
const urls = [];

async function move() {
  const find = {};

  const backups = await Snapshot.others.find(find);
  //
  let iterations = backups.length;
  // console.log({iterations})
  // iterations = 1
  for (let i = 0; i < iterations; i++) {
    const item = backups[i];
    try {
      const { source_url } = item;
      const options = { upsert: true, new: true };
      // const source = await Snapshot.photos.findOneAndUpdate({source_url}, item, options)
      // console.log({source})
    } catch (e) {
      console.log({ e });
    }
  }

  // console.log(backups.length)
}
