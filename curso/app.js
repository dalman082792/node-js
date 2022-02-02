const debug = require("debug")("app:inicio");
//const debugdb = require("debug")("app:db");
const express = require("express");
const usuarios = require("./routes/usuarios");
//const logger = require("./logger");
const config = require("config")
const morgan = require("morgan")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/usuarios", usuarios)
//app.use(logger);
//configuracion de entornos o ambientes
console.log("aplicacion: " + config.get("nombre"));
console.log("base de datos: " + config.get("configdb.host"));

//usando midelware de terceros nota: en la paguina de express podemos encontrar los midelwere de terceros
if (app.get("env") === "develpmen") {
    app.use(morgan("dev"));
    //console.log("morgan ablitado..")
    debug("morgan esta abilitado..")
}

//trabajando con la BD
debug("conectando a la bd")


app.get("/", (req, res) => {
    res.send("hola mundo con express")
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`escuchando desde el puerto ${port}`);
})

