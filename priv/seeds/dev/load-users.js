
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('urls').del()
    .then(function () {
      // Inserts seed entries
      return knex('urls').insert([
      ])
    })
}
