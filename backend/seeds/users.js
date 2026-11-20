/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, firstName: 'Joe', lastName: "Average", username: "joeaverage", password: "$2b$10$puuYRZfmMgIx7XU/hz2NSegBecKDWipU8btpqweaJuYypHv6grhYi"},
    {id: 2, firstName: 'Maria', lastName: "Gonzalez", username: "mgonzalez", password: "$2b$10$puuYRZfmMgIx7XU/hz2NSegBecKDWipU8btpqweaJuYypHv6grhYi"},
    {id: 3, firstName: 'Wei', lastName: "Chen", username: "wchen", password: "$2b$10$puuYRZfmMgIx7XU/hz2NSegBecKDWipU8btpqweaJuYypHv6grhYi"},
    {id: 4, firstName: 'Aisha', lastName: "Patel", username: "apatel", password: "$2b$10$puuYRZfmMgIx7XU/hz2NSegBecKDWipU8btpqweaJuYypHv6grhYi"},
    {id: 5, firstName: 'Liam', lastName: "O'Connor", username: "loconnor", password: "$2b$10$puuYRZfmMgIx7XU/hz2NSegBecKDWipU8btpqweaJuYypHv6grhYi"},
  ]);
};
