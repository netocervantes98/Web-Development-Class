const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()

const PORT = 3000
const pokemonsSaved = {}

app.use(express.json())
app.use(cors())

app.get('/get/:id', async (req, res) => {
    let id = 0;
    id = parseInt(req.params.id);

    if (id in pokemonsSaved) {
        console.log("Info is in cache.")
    } else {
        console.log("Info is not in cache. Asking pokeapi...")

        await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(({ data }) => {
                pokemonsSaved[data.id] = data
            })
            .catch((err) => {
                console.error(err.response)
                return res.sendStatus(err.response.status)
            })
    }
    res.send(pokemonsSaved[id])
    console.log("Sent.")
})

app.get('/getAll', async (req, res) => {
    console.log("Sending all... ")
    res.send(pokemonsSaved)
    console.log("completed.")
})

app.post('/create', async (req, res) => {
    console.log("Saving... ")
    const { id, ...info } = req.body;
    pokemonsSaved[id] = info;
    res.send(pokemonsSaved[id])
    console.log("completed.")
})

app.put('/update/:id', async (req, res) => {
    id = parseInt(req.params.id);
    
    if (id in pokemonsSaved) {
        console.log("Updating... ")
        pokemonsSaved[id] = {...pokemonsSaved[id] , ...req.body}
        res.send()
        console.log("completed.")
    } else {
        console.error("Info is NOT in cache.")
        res.status(400).send()
    }
})

app.delete('/delete/:id', async (req, res) => {
    id = parseInt(req.params.id);

    if (id in pokemonsSaved) {
        console.log("Info is in cache... ")
        delete pokemonsSaved[id]
        res.send()
        console.log("deleted.")
    } else {
        console.error("Info is NOT in cache.")
        res.status(400).send()
    }
})

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})