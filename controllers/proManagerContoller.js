const ProManager = require("../models/proManager");
//webtokes, secret(.env) (ENCRYPT)

ProManager.findOne({ proName: "El Direc" })
    .then(existingUser => {
        if (existingUser) {
            console.log("El usuario predeterminado ya existe en la base de datos.");
        } else {
            const defaultProManager = new ProManager({
                proName: "El Direc",
                password: "123123",
            });
            defaultProManager.save()
                .then(savedProManager => {
                    console.log("Usuario predeterminado creado:", savedProManager);
                })
                .catch(error => {
                    console.error("Error al crear el usuario predeterminado:", error);
                });
        }
    })
    .catch(error => {
        console.error("Error al verificar la existencia del usuario:", error);
    });

const loginProManager = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const proManager = await ProManager.findOne({ proName: username, password: password });
        if (!proManager) {
            return res.status(404).json({ message: "Credenciales inválidas" });
        }
        res.status(200).json({ message: "Inicio de sesión exitoso", proManager });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

module.exports = {
    loginProManager
}