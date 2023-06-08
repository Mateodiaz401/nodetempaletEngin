const Url = require('../models/Url');
const { nanoid } = require("nanoid");

const leerUrls = async (req, res) => {
    try {
        const urls = await Url.find({ user: req.user.id }).lean();
        res.render("home", { titulo: "Página de inicio", urls });
    } catch (error) {
        req.flash('mensajes', [{ msg: error.message }]);
        return res.redirect("/");
    }

};


const agregarUrls = async (req, res) => {
    const { origin } = req.body;
    try {
        const url = new Url({ origin, shortURL: nanoid(10), user: req.user.id });
        nanoid(10),
            await url.save();
        req.flash('mensajes', [{ msg: "url Agregada" }]);
        res.redirect("/")
    } catch (error) {
        req.flash('mensajes', [{ msg: error.message }]);
        return res.redirect("/");
    }
}
const eliminarUrl = async (req, res) => {
    // console.log(req.user.id);
    const { id } = req.params;
    try {
        // await Url.findByIdAndDelete(id);
        const url = await Url.findById(id);
        if (!url.user.equals(req.user.id)) {
            throw new Error("No es tu url payaso");
        }
        await url.deleteOne();
        req.flash("mensajes", [{ msg: "Url eliminada" }]);
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        req.flash("mensajes", [{ msg: error.message }]);
        return res.redirect("/");
    }
};

const editarUrlForm = async (req, res) => {
    const { id } = req.params;
    try {
        const url = await Url.findById(id).lean();

        if (!url.user.equals(req.user.id)) {
            throw new Error("No es tu url payaso");
        }
        res.render("home", { titulo: "Página de inicio", url });
    } catch (error) {
        req.flash('mensajes', [{ msg: error.message }]);
        return res.redirect("/");
    }
}
const editarUrl = async (req, res) => {
    const { id } = req.params;
    const { origin } = req.body;
    try {
        const url = await Url.findById(id);
        if (!url.user.equals(req.user.id)) {
            throw new Error("No es tu url payaso");
        }
        // await Url.findByIdAndUpdate(id, { origin });
        await url.updateOne({ origin });
        req.flash("mensajes", [{ msg: "Url editada" }]);
        res.redirect("/");
    } catch (error) {
        req.flash('mensajes', [{ msg: error.message }]);
        return res.redirect("/");
    }
}

const redireccionamiento = async (req, res) => {
    const { shortURL } = req.params;
    try {
        const url = await Url.findOne({ shortURL });
        if (!url?.origin) {
            return res.send("error no existe el redireccionamiento");
        }
        res.redirect(url.origin);
    } catch (error) {
        req.flash('mensajes', [{ msg: "No Existe la Url configurada" }]);
        return res.redirect("/auth/login");
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