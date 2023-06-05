const Url = require('../models/Url');
const { nanoid } = require("nanoid");

const leerUrls = async (req, res) => {
    try {
        const urls = await Url.find().lean();
        console.log(urls);
        res.render("home", { titulo: "Página de inicio", urls });
    } catch (error) {
        console.log(error);
    }

};


const agregarUrls = async (req, res) => {
    const { origin } = req.body;
    try {
        const url = new Url({ origin, shortURL: nanoid(10) });
        nanoid(10),
            await url.save();
        res.redirect("/")
        console.log(url);
    } catch (error) {
        console.log(`algo fallo ${error}`);
    }
}
const eliminarUrl = async (req, res) => {
    const { id } = req.params;
    try {
        await Url.findByIdAndDelete(id);
        res.redirect("/")
    } catch (error) {
        console.log(`algo fallo ${error}`);
    }
}

const editarUrlForm = async (req, res) => {
    const { id } = req.params;
    try {
        const url = await Url.findById(id).lean();
        res.render("home", { titulo: "Página de inicio", url });
    } catch (error) {
        console.log(`algo fallo ${error}`);
    }
}
const editarUrl = async (req, res) => {
    const { id } = req.params;
    const { origin } = req.body;
    try {
        await Url.findByIdAndUpdate(id, { origin });
        res.redirect("/");
    } catch (error) {
        console.log(`algo fallo ${error}`);
    }
}

const redireccionamiento = async (req, res) => {
    const { shortURL } = req.params;
    try {
        const url = await Url.findOne({ shortURL });
        // console.log(url);
        if (!url?.origin) {
            console.log("no exite");
            return res.send("error no existe el redireccionamiento");
        }
        res.redirect(url.origin);
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    leerUrls,
    agregarUrls,
    eliminarUrl,
    editarUrlForm,
    editarUrl,
    redireccionamiento,
}