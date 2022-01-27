const express = require("express");
const ruta = express();

ruta.get("/usuarios", (req, res) => {
    res.send(usuarios)
});
ruta.get("/usuarios/:id", (req, res) => {
    let usuario = encontrarUsuario(req.params.id)
    if (!usuario) {
        res.status(404).send("usuario no encontrado")
        return
    }
    res.send(usuario)
});
ruta.post("/usuarios", (req, res) => {
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
ruta.put("/usuarios/:id", (req, res) => {
    let usuario = encontrarUsuario(req.params.id)
    if (!usuario) {
        res.status(404).send("usuario no encontrado")
        return
    }
    const { error, value } = validarUsuario(req.body.nombre)
    if (error) {
        const mensagge = error.details[0].message
        res.status(400).send(mensagge)
        return
    }
    usuario.nombre = value.nombre;
    res.send(usuario)
})

ruta.delete("/usuarios/:id", (req, res) => {
    let usuario = encontrarUsuario(req.params.id)
    if (!usuario) {
        res.status(404).send("usuario no encontrado")
        return
    }
    const index = usuarios.indexOf(usuario)
    usuarios.splice(index, 1)
    res.send(usuarios)
})