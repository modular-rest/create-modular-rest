let Router = require("koa-router");

const { reply, getCollection } = require("@modular-rest/server");

const name = "flower";
const route = new Router();

route.get("/", async (ctx) => {
  ctx.body = reply.create("s", {
    message: "Your flower module is working!",
  });
});

route.get("/list", async (ctx) => {
  try {
    let collection = getCollection("flower", "wildflowers");
    let result = await collection.find({}).exec();

    ctx.body = reply.create("s", {
      data: result,
    });
  } catch (err) {
    ctx.throw(500, err || "Something went wrong");
  }
});

module.exports.name = name;
module.exports.main = route;
