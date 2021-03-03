
//Archivos requeridos para poder hacer funcionar las funciones
const path = require("path");
const { randomNumber } = require("../helpers/lib");
const fs = require("fs-extra");
const { Image, Comment } = require("../models");
const sidebar = require('../helpers/sidebar');
const md5 = require("md5");
const ctrl = {};

//Controlador del index
ctrl.index = async (req, res) => {
    let viewModel = {image:{}, comments:{}}
    const image = await Image.findOne({
    filename: { $regex: req.params.image_id },
  });
    //si hay un imagen me la renderiza sino se va al index
  if (image) {

    image.views = image.views + 1;
    viewModel.image = image;
    await image.save();

    const comments = await Comment.find({ image_id: image._id });
    viewModel.comments = comments;
    viewModel = await sidebar(viewModel)
    res.render('image', viewModel);
  } else {
      res.redirect('/')
  }
};

//Controlador de crear imagen
ctrl.create = (req, res) => {
  const saveImage = async () => {

    //Le damos un nombre aleatorio 
    const imgUrl = randomNumber();

    //Comprobamos que el nombre no existe con una funcion recursiva
    const images = await Image.find({ filename: imgUrl });
    if (images.length > 0) {
      saveImage();
    } else {
      const imageTempPath = req.file.path;
      const ext = path.extname(req.file.originalname).toLowerCase();
      const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

      //Extensiones de archivos permitidos: 
      //Si esta permitida la crea y te manda a la pagina de la imagen
      //Sino te manda un error 500 de fallo al crear la imagen
      if (
        ext === ".png" ||
        ext === ".jpg" ||
        ext === ".jpeg"||
        ext === ".gif"
      ) {
        await fs.rename(imageTempPath, targetPath);

        //creamos en objeto imagen para mostrarla en el body
        const newImg = new Image({
          title: req.body.title,
          filename: imgUrl + ext,
          description: req.body.description,
        });

        //Guardamos la imagen en la base de datos
        const imageSave = await newImg.save();
        res.redirect("/images/" + imgUrl);
      } else {
        await fs.unlink(imageTempPath);
        res.status(500).render('500')
      }
    }
  };
  saveImage();
};

//Controlador de los likes de las imagenes
ctrl.like = async(req, res) => {
  //Buscamos la imagen
  const image = await Image.findOne({filename: {$regex: req.params.image_id}})

  //Si existe la imagen le incrementamos los likes , sino salta un error 500
  if (image) {
    image.likes = image.likes +1;
    await image.save();
    res.json({likes: image.likes})
  } else {
    res.status(500).render('500')
  }
};

//controlador de los comentatios de las imagenes
ctrl.comment = async (req, res) => {
  const image = await Image.findOne({
    filename: { $regex: req.params.image_id },
  });

  if (image) {
    const newComment = new Comment(req.body);
    newComment.gravatar = md5(newComment.email);
    newComment.image_id = image._id;
    console.log(newComment);
    await newComment.save();
    res.redirect("/images/" + image.uniqueId);
  } else {
      res.redirect('/')
  }
};

//Controlador de eliminar una imagen
ctrl.remove = async(req, res) => {
  
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if (image) {
      await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
      await Comment.deleteOne({image_id: image._id})
      await image.remove();
    }
}

//Exportacion del controlador
module.exports = ctrl;