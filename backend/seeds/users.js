/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, firstName: 'Joe', lastName: "Average", username: "joeaverage", password: "$2b$10$puuYRZfmMgIx7XU/hz2NSegBecKDWipU8btpqweaJuYypHv6grhYi"},
  ]);
};
