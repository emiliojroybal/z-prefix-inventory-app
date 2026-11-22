const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const knex = require('knex')(require('./knexfile')[process.env.NODE_ENV || 'development']);
const bcrypt = require('bcryptjs');
const { createToken, validateToken } = require('./JWT');
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());

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

app.post("/users", async (req, res) => {
    const user = req.body
    const hash = await bcrypt.hash(user.password, 10);

    user.password = hash;

    knex("users").insert(user).returning('*')
    .then(data => {
        delete data[0]["password"];
        res.status(200).json(data[0]);
    })
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

app.post("/login", async (req, res) => {
    const userInfo = req.body

    const user = await knex("users").select().where({username: userInfo.username}).first();
    if (!user) {
        res.status(401).json({message: "Incorrect username or password"});
        return;
    }

    bcrypt.compare(userInfo.password, user.password, (err, response) => {
        if (response) {
            const accessToken = createToken(user);
            res.cookie("accessToken", accessToken, {
                maxAge: 60 * 60 * 24 * 30 * 1000,
            })

            const returnUser = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
            };
            res.status(200).json(returnUser)
        } else {
            res.status(401).json({message: "Incorrect username or password"});
        }
    })
});

app.post("/logout", (req, res) => {
    res.clearCookie('accessToken');
    return res.status(200).json({message: "Logged out successfully"});
});

app.get("/auth/me", validateToken, async (req, res) => {
    const id = req.userID;
    console.log("Validated user with ID " + id);

    try {
        const user = await knex("users").select().where({id: id}).first();

        const returnUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
        }

        res.status(200).json(returnUser);
    } catch (err) {res.status(401).json({message: err})}
})

app.get("/items", async (req, res) => {
    const userID = req.query.userID;
    const expandUser = req.query.expandUser;

    try {
        const itemData = await knex("item").select().modify((queryBuilder) => {
            if (userID !== undefined && userID !== null && userID !== '') {
                queryBuilder.where({userID: userID});
            }
        });

        if (expandUser) {
            for (let item of itemData) {
                const userData = await knex("users").select().where({id: item.userID}).first()
                delete item.userID;
                item.user = {
                    id: userData.id,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    username: userData.username,
                }
            }
        }

        res.status(200).json(itemData);
    } catch (err) {res.status(400).json({message: err})};
})

app.get("/items/:itemID", async (req, res) => {
    const itemID = req.params.itemID;
    const expandUser = req.query.expandUser;

    try {
        const itemData = await knex("item").select().where({id: itemID}).first();

        if (expandUser) {
            const userData = await knex("users").select().where({id: itemData.userID}).first()
            delete itemData.userID;
            itemData.user = {
                id: userData.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                username: userData.username,
            }
        }

        res.status(200).json(itemData);
    } catch (err) {res.status(400).json({message: err})};
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