
exports.seed = function(knex) {
  const users = [
    {
      "username": "ajg7",
      "password": "thepassword",
      "department": "admin"
    },
    {
      "username": "penny78",
      "password": "charmeleon98",
      "department": "accountant"
    },
  ];

  return knex("users")
    .insert(users)
    .then(() => console.log("\n== Seed data for roles table added. ==\n"));
};
