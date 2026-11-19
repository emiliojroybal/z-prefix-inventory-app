/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {id: 1, userID: 1, itemName: "NVIDIA RTX 5090", description: "A high-end consumer graphics card", quantity: 5},
    {id: 2, userID: 1, itemName: "NVIDIA RTX 4090", description: "A lesser high-end consumer graphics card", quantity: 10},
    {id: 3, userID: 1, itemName: "NVIDIA RTX 6000 PRO", description: "A high-end AI graphics card for development", quantity: 3},
  ]);
};
