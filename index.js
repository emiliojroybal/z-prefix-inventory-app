const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const knex = require('knex')(require('./knexfile')[process.env.NODE_ENV || 'development']);

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).json({message: "Connected successfully!"});
})

app.get("/users", (req, res) => {
    knex("users").select()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({message: err}));
})

app.get("/users/:userID", (req, res) => {
    const userID = req.params.userID

    knex("users").select().where({id: userID}).first()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({message: err}))
})

app.post("/users", (req, res) => {
    const user = req.body

    knex("users").insert(user).returning('*')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({message: err}))
})

app.patch("/users/:userID", (req, res) => {
    const userID = req.params.userID
    const userChanges = req.body

    knex("users").update(userChanges).where({id: userID}).returning('*')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({message: err}))
})

app.delete("/users/:userID", (req, res) => {
    const userID = req.params.userID

    knex("users").delete().where({id: userID})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({message: err}))
})

app.get("/items", (req, res) => {
    knex("item").select()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({message: err}));
})

app.get("/items/:itemID", (req, res) => {
    const itemID = req.params.itemID

    knex("item").select().where({id: itemID}).first()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({message: err}))
})

app.post("/items", (req, res) => {
    const item = req.body

    knex("item").insert(item).returning('*')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({message: err}))
})

app.patch("/items/:itemID", (req, res) => {
    const itemID = req.params.itemID
    const itemChanges = req.body

    knex("item").update(itemChanges).where({id: itemID}).returning('*')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({message: err}))
})

app.delete("/items/:itemID", (req, res) => {
    const itemID = req.params.itemID

    knex("item").delete().where({id: itemID})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({message: err}))
})

app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})