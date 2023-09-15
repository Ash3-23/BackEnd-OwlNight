const ProManager = require("../models/proManager");
const bcrypt = require('bcrypt');

const createDefaultProManager = async () => {
  try {
    const existingUser = await ProManager.findOne({ proName: "El Direc" });

    if (existingUser) {
      console.log("El usuario predeterminado ya existe en la base de datos.");
      return;
    }
    const defaultProManager = new ProManager({
      proName: "El Direc",
      password: 'pepe',
    });
    await defaultProManager.save();
    console.log("Usuario predeterminado creado:", defaultProManager);
  } catch (error) {
    console.error("Error al crear el usuario predeterminado:", error);
  }
};

const loginProManager = async (req, res) => {
  try {
    const { proName, password } = req.body;
    const proManager = await ProManager.findOne({ proName: proName, password: password });
    if (!proManager) {
      return res.status(404).json({ message: "Credenciales inválidas" });
    }
    res.status(200).json({ message: "Inicio de sesión exitoso", proManager });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

const getProManger = async (req, res) => {
  try {
    const proManager = await ProManager.findOne({ proName: "El Direc" });
    if (!proManager) {
      res.status(404).json({ message: "ProManager no encontrado" })
    }
    res.status(200).json({ message: "ProManager encontrado", proManager })
  } catch (error) {
    res.status(500).json({ message: "Error al encontrar el proManager", error });
  }
};

module.exports = {
  createDefaultProManager,
  loginProManager,
  getProManger
};