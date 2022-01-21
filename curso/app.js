const express = require("express");
const Joi = require('joi');
const app = express();
app.use(express.json())

const usuarios = [
    { id: 1, nombre: "miztli" },
    { id: 2, nombre: "nancy" },
    { id: 3, nombre: "david" }
];

app.get("/", (req, res) => {
    res.send("hola mundo con express")
});
app.get("/usuarios", (req, res) => {
    res.send(usuarios)
});
app.get("/usuarios/:id", (req, res) => {
    let usuario = encontrarUsuario(req.params.id)
    if (!usuario) res.status(404).send("usuario no encontrado")
    res.send(usuario)
});
app.post("/usuarios", (req, res) => {
    const schema = Joi.object({
        nombre: Joi.string().min(3).max(10).required(),
    })
    const { error, value } = validarUsuario(req.body.nombre)
    if (!error) {
        const usuario = {
            id: usuarios.length + 1,
            nombre: value.nombre
        }
        usuarios.push(usuario)
        res.send(usuario)
    }
    else {
        const mensagge = error.details[0].message
        res.status(400).send(mensagge)
        return
    }
});
app.put("/usuarios/:id",(req, res)=>{
    let usuario = encontrarUsuario(req.params.id)
    if (!usuario) res.status(404).send("usuario no encontrado")
    const { error, value } = validarUsuario(req.body.nombre)
    if (error) {
        const mensagge = error.details[0].message
        res.status(400).send(mensagge)
        return
    }
    usuario.nombre = value.nombre;
    res.send(usuario)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`escuchando desde el puerto ${port}`);
})

function encontrarUsuario(id){
    return usuarios.find(u => u.id === parseInt(id))
}

function validarUsuario(nombre){
    const schema = Joi.object({
        nombre: Joi.string().min(3).max(10).required(),
    })
    return schema.validate({ nombre:nombre });
}