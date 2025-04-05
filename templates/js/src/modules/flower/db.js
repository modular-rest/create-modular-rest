const {
  defineCollection,
  Schema,
  schemas,
  Permission,
  DatabaseTrigger,
} = require("@modular-rest/server");

module.exports = [
  defineCollection({
    database: "flower",
    collection: "wildflowers",
    schema: new Schema({
      name: String,
      description: String,
      image: schemas.file,
    }),
    permissions: [
      new Permission({
        accessType: "god_access",
        read: true,
        write: true,
      }),
      new Permission({
        accessType: "anonymous_access",
        read: true,
      }),
    ],
    triggers: [
      new DatabaseTrigger("insert-one", ({ query, queryResult }) => {
        console.log("inserted", query);
      }),
    ],
  }),
];
