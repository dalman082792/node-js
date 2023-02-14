const debug = require("debug")("app:inicio");
//const debugdb = require("debug")("app:db");
const express = require("express");
//import { Sequelize, Model, DataTypes } from 'sequelize';
const Sequelize = require("sequelize");
const Joi = require("joi");
//const logger = require("./logger");
const config = require("config");
const morgan = require("morgan");
const app = express();
app.use(Sequelize);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.listen('4000')
//app.use(logger);
//configuracion de entornos o ambientes
console.log("aplicacion: " + config.get("nombre"));
//console.log("base de datos: " + config.get("configdb.host"));

//usando midelware de terceros nota: en la paguina de express podemos encontrar los midelwere de terceros
if (app.get("env") === "develpmen") {
  app.use(morgan("dev"));
  //console.log("morgan ablitado..")
  debug("morgan esta abilitado..");
}
//definimos los parametros de conexion a la base de datos
const sequelize = new Sequelize("node", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

//definimos el modelo
const usuario = sequelize.define(
  "usuarios",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombres: { type: Sequelize.DataTypes.STRING, llowNull: false },
    apeidos: { type: Sequelize.DataTypes.STRING, llowNull: false },
    email: { type: Sequelize.DataTypes.STRING, llowNull: false },
    imagen: { type: Sequelize.DataTypes.STRING, llowNull: false },
    password: { type: Sequelize.DataTypes.STRING, llowNull: false },
  },
  { timestamps: false }
);

//conexion a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("conexion exitosa a la base de datos");
  })
  .catch((error) => {
    console.log("error en la conexion" + error);
  });
//trabajando con la BD
debug("conectando a la bd");

const getUsuarios = async (req, res) => {
  const usuarios = await usuario.findAll({
    attributes: ["id", "nombres", "apeidos", "email", "imagen", "password"],
  });
  res.json(usuarios);
};

const getUsuario = async (req, res) => {
  const {id} = req.params;
  const usuarioById = await usuario.findByPk(id);
  res.json(usuarioById);
};
const postUsuario = async (req, res) => {
  const { nombres, apeidos, email, imagen, password } = req.body;
  const newUsuario = await usuario.create({
    nombres,
    apeidos,
    email,
    imagen,
    password,
  });
  res.json(newUsuario);
};

const putUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombres, apeidos, email, imagen, password } = req.body;
  const usuarioById = await usuario.findByPk(id)
    usuarioById.nombres = nombres;
    usuarioById.apeidos = apeidos;
    usuarioById.email = email;
    usuarioById.imagen = imagen;
    usuarioById.password = password;
    await usuarioById.save()
  res.json(usuarioById);
};

const deleteUsuario = async (req, res) => {
  console.log(req.params)
  const { id } = req.params;
  await usuario.destroy({
    where: {
      id,
    },
  });
  res.sendStatus(204);
};
app.get("/", (req, res) => {
    res.send("hola mundo con express");
  });
app.get("/usuarios", getUsuarios);
app.post("/usuario", postUsuario);
app.put("/usuario/:id", putUsuario);
app.delete("/usuario/:id", deleteUsuario);
app.get("/usuario/:id", getUsuario);
  //let usuario = encontrarUsuario(req.params.id);
  //if (!usuario) {
    //res.status(404).send("usuario no encontrado");
    //return;
  //}
  //res.send(usuario);
//});

//function validarUsuario(nombre) {
  //const schema = Joi.object({
    //nombre: Joi.string().min(3).max(10).required(),
  //});
  //return schema.validate({ nombre: nombre });
