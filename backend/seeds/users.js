/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
  await knex('users').insert([
    {firstName: 'Joe', lastName: "Average", username: "joeaverage", password: "$2b$10$puuYRZfmMgIx7XU/hz2NSegBecKDWipU8btpqweaJuYypHv6grhYi"},
    {firstName: 'Maria', lastName: "Gonzalez", username: "mgonzalez", password: "$2b$10$puuYRZfmMgIx7XU/hz2NSegBecKDWipU8btpqweaJuYypHv6grhYi"},
    {firstName: 'Wei', lastName: "Chen", username: "wchen", password: "$2b$10$puuYRZfmMgIx7XU/hz2NSegBecKDWipU8btpqweaJuYypHv6grhYi"},
    {firstName: 'Aisha', lastName: "Patel", username: "apatel", password: "$2b$10$puuYRZfmMgIx7XU/hz2NSegBecKDWipU8btpqweaJuYypHv6grhYi"},
    {firstName: 'Liam', lastName: "O'Connor", username: "loconnor", password: "$2b$10$puuYRZfmMgIx7XU/hz2NSegBecKDWipU8btpqweaJuYypHv6grhYi"},
  ]);
};
