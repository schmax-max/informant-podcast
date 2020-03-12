const { Podcast } = require("../model");
module.exports = create;
const info = {
  "Road Trippin'": "https://feeds.megaphone.fm/PPY4074071851/",
  "The JJ Redick Podcast": "https://rss.art19.com/the-jj-redick-podcast",
  "Thinking Basketball":
    "https://feeds.soundcloud.com/users/soundcloud:users:494308113/sounds.rss"
};

async function create() {
  for (const name in info) {
    try {
      const source_url = info[name];
      const options = { upsert: true, new: true };
      const item = {
        name,
        source_url
      };
      const source = await Podcast.sports.findOneAndUpdate(
        { source_url },
        item,
        options
      );
      // console.log({source})
    } catch (e) {
      console.log({ e });
    }
  }

  // console.log(backups.length)
}
