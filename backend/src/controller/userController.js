const User = require("../Model/user");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
const LocationModel = require("../Model/locations");
require("dotenv").config();

class UserController {
  static async register(req, res) {
    const bytes = CryptoJS.AES.decrypt(req.body.jsonCrypt, process.env.SECRET);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    const json = JSON.parse(decrypted);

    if (!decrypted) {
      return res.status(400).json({ message: "Erro ao descriptografar os dados." });
    }

    const { name, email, password } = json;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Nome, email ou senha ausentes nos dados descriptografados." });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ message: "Usuário já existe, tente novamente." });
    }

    const passwordCrypt = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET
    ).toString();

    const user = new User({
      name: name,
      email: email,
      password: passwordCrypt,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      deletedAt: null,
    });

    try {
      await User.create(user);
      return res.status(201).json({ message: "Usuário cadastrado com sucesso." });
    } catch (error) {
      return res.status(500).json({ message: "Algo falhou.", error: error.message });
    }
  }

  static async login(req, res) {
    var bytes = CryptoJS.AES.decrypt(req.body.jsonCrypt, process.env.SECRET);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    const json = JSON.parse(decrypted);

    const { email, password } = json;

    if (!email)
      return res
        .status(422)
        .json({ message: "É necessário fornecer um email." });

    if (!password)
      return res.status(422).json({ message: "É necessário usar uma senha." });

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(422)
        .send({ message: "Nenhum usuário encontrado." });
    }

    var bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (decryptedPassword != password)
      return res
        .status(422)
        .send({ message: "Email ou senha estão incorretos." });

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user.id
        },
        secret,
        {
          expiresIn: "1 day",
        }
      );

      return res.status(200).send({ token: token });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Something failed", data: error.message });
    }
  }

  static async delete(req, res) {
    var params = req.params;
    const { id } = params;

    if (!id)
      return res.status(422).send({ message: "É necessário fornecer o ID." });

    try {
      const user = await User.findByIdAndDelete(id);

      if (!user)
        return res.status(404).send({ message: "Usuário não encontrado." });

      res.status(201).send({ message: "Usuário removido com sucesso." });
    } catch (error) {
      res.status(500).send({ message: "Algo falhou,", data: error.message });
    }
  }

  static async findUser(req, res) {
    const users = await User.find();
    return res.status(200).send(users);
  }

  static async createLocation(req, res) {
    const { id } = req.params;
    const { city, country, lat, long } = req.body.data;

    if (!city || !country || !lat || !long || !id)
      return res.status(422).send({ message: "É necessário fornecer as informações." });

    const newLocation = new LocationModel({
      city: city,
      country: country,
      lat: lat,
      long: long,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      deletedAt: null
    });

    try {
      const user = await User.findById(id);

      if (!user)
        return res.status(404).send({ message: "Usuário não encontrado." });

      user.locations.push(newLocation);

      await user.save();

      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send({ message: "Algo falhou.", data: error.message });
    }
  }
}

module.exports = UserController;
