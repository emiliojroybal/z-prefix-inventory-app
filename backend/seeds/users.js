/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, firstName: 'Joe', lastName: "Average", username: "joeaverage", password: "$2b$10$/k1Mzl/Hy9IA1qc2jnTN3u.AehDsGuMMGHIa4S0RJd7lOnMRaPZ7e"},
  ]);
};
