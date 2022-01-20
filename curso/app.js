const express = require("express");
const app = express();
app.use(express.json())

const usuarios = [
    {id:1, nombre:"miztli"},
    {id:2, nombre:"nancy"},
    {id:3, nombre:"david"}
];

app.get("/",(req, res)=>{
    res.send("hola mundo con express")
});
app.get("/usuarios",(req, res)=>{
    res.send(usuarios)
});
app.get("/usuarios/:id",(req, res)=>{
    let usuario=usuarios.find(u=> u.id === parseInt(req.params.id))
    if(!usuario) res.status(404).send("usuario no encontrado")
    res.send(usuario)
});
app.post("/usuarios",(req, res)=>{
    const usuario ={
        id: usuarios.length + 1,
        nombre: req.body.nombre
    }
    usuario.push(usuario)
});

const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log(`escuchando desde el puerto ${port}`);
})