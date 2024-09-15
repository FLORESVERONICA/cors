const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));


app.get('/characters',async (req, res) => {
    
   try{
    const response = await axios.get("https://rickandmortyapi.com/api/character/")
    const data = response.data.results
    res.json(data);
  } catch (err) {
   
     res.status(404).json({error: 'personaje no encontrado'})
    }
})
app.get('/characters/:name',async(req, res) => {
    const nombre = req.params.name
    try{
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${nombre}`);
    const data = response.data.results

const characterData = data.map(character =>{
    const {name, status, species,gender, image, origin:{name: origin}} = character
    return {name, status, species,gender, image, origin}
})


res.json(characterData)

    } catch (err) {
        res.status(404).json({error: 'personaje no encontrado'}) 
    }
})
    
const PORT = 4000
app.listen(PORT, ()  => {
    console.log(`express esta escuchando en el puerto http://localhost:${PORT}`)
})