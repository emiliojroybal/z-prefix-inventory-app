/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {id: 1, userID: 1, itemName: "NVIDIA RTX 5090", description: "A high-end consumer graphics card built for 4K and 8K gaming, real-time ray tracing, and demanding creative workloads, featuring 32GB of fast GDDR7 memory and a substantial cooling solution.", quantity: 5},
    {id: 2, userID: 1, itemName: "NVIDIA RTX 4090", description: "A lesser high-end consumer graphics card that still delivers excellent 4K gaming and content creation performance with 24GB of GDDR6X memory, at a lower price than the newest flagship model.", quantity: 10},
    {id: 3, userID: 1, itemName: "NVIDIA RTX 6000 PRO", description: "A high-end AI graphics card for development, offering a very large pool of VRAM, certified professional drivers, and the compute throughput needed for training and running large machine learning models.", quantity: 3},
    {id: 4, userID: 2, itemName: "AMD Ryzen 9 9950X", description: "A 16-core, 32-thread desktop processor for the AM5 platform, delivering outstanding multithreaded performance for video editing, 3D rendering, software compilation, and high-refresh-rate gaming.", quantity: 12},
    {id: 5, userID: 2, itemName: "Intel Core Ultra 9 285K", description: "A flagship 24-core desktop processor for the LGA1851 socket that blends performance and efficiency cores, providing strong gaming results, fast productivity speeds, and integrated AI acceleration.", quantity: 8},
    {id: 6, userID: 3, itemName: "Corsair Vengeance 64GB DDR5-6000", description: "A 64GB (2x32GB) DDR5-6000 memory kit with low-latency timings, an aluminum heat spreader, and Intel XMP and AMD EXPO profiles for easy overclocking on modern desktop motherboards.", quantity: 25},
    {id: 7, userID: 3, itemName: "Samsung 990 PRO 2TB NVMe SSD", description: "A 2TB PCIe 4.0 NVMe solid state drive with sequential read speeds up to 7,450 MB/s, ideal for fast boot times, quick game loading, and heavy file transfers in workstations and gaming PCs.", quantity: 30},
    {id: 8, userID: 4, itemName: "ASUS ROG Strix X870E-E Motherboard", description: "A premium AM5 ATX motherboard with a robust power delivery design, PCIe 5.0 slots, DDR5 support, WiFi 7, multiple M.2 slots, and extensive cooling for high-end Ryzen processors.", quantity: 7},
    {id: 9, userID: 4, itemName: "Corsair RM1000x 1000W Power Supply", description: "A fully modular 1000W 80 Plus Gold power supply with a quiet, zero-RPM fan mode and native 12V-2x6 connector, providing stable power for demanding systems with high-end graphics cards.", quantity: 15},
    {id: 10, userID: 5, itemName: "Noctua NH-D15 G2 CPU Cooler", description: "A dual-tower air cooler with large fans and excellent heat dissipation, offering near-liquid-cooler performance at very low noise levels, with broad support for current Intel and AMD sockets.", quantity: 18},
  ]);
};
