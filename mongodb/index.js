const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/demo")
    .then(() => console.log("conectado"))
    .catch(err =>console.log("no se pudo conectar",err));

const cursoShema = new mongoose.Schema({
    nombre      : String,
    autor       : String,
    etiquetas   : [String],
    fecha       : {type: Date, default: Date.now},
    publicado   : Boolean
})

const Curso = mongoose.model("Curso", cursoShema)
async function crearCurso(){
    const curso = new Curso ({
        nombre: "cursoNode.js",
        autor:"david",
        etiquetas:["desarrollo web", "back end"],
        publicado: true
    });
const resultado = await curso.save()
console.log(resultado)
}

crearCurso()
