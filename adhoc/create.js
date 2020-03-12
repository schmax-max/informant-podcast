const { Youtube } = require("../model");
module.exports = create;
const info = {
  // "thinking basketball": "UC3HPbvB6f58X_7SMIp6OPYw",
  // "the dime drop": "UCdf5X8hXBKnkVTfxuxkLiOQ",
  // "nate duncan": "channel/UC_fs6bgkAF9UgWNmJCvl8Pw",
  // "coach daniel": "channel/UCo7ttcxRQH9WrDGxxB-QAew",
  // mdj: "channel/UCo_m_bofb8c77kS8-zE2Jtw",
  // hoopvision68: "channel/UCWjDw4A6654SyA3ryTy00Uw",
  // "inside the nba": "channel/UCAaBdSUIGriXF0Vr1InqZ9Q",
  // "nba on tnt": "channel/UCU7iRrk3xfpUk0R6VdyC1Ow",
  // "nba on espn": "user/TheNBAonESPN",
  // "the ringer": "channel/UCT83YP07yVuaH9J19YABhlw",
  // "bleacher report": "user/BleacherReport",
  // "vice sports": "channel/UC8C8WuWSsFjWFaTHcUQeQxA",
  // "tifo football": "channel/UCGYYNGmyhZ_kwBF_lqqXdAQ",
  // "tifo basketball": "channel/UCdZfXBg9LrIfOrcBAOS_WOw",
  // "sb nation": "channel/UCDRmGMSgrtZkOsh_NQl4_xw",
  // "mma fighting on sbn": "channel/UC4f1JueVgo5t9HSmobCRPug",
  // "nfl throwback": "channel/UCJdl3Paao2f3ha5JXMYUCIA",
  // "jr sport brief": "channel/UCJRMOYY6Tf_w2yQ_6jGZXmg",
  "sports illustrated": "channel/UCPAt6z5uX_c5Eo_cSNROzYw"
};

async function create() {
  for (const name in info) {
    const code = info[name];
    try {
      const source_url = `https://www.youtube.com/${code}/videos`;
      const options = { upsert: true, new: true };
      const item = {
        name,
        source_url
      };
      const source = await Youtube.sports.findOneAndUpdate(
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
