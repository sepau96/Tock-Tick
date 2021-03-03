const { Comment, Image } = require("../models");

//Contador de imagenes
async function imageCounter() {
  return await Image.countDocuments();
}

//Contador de comentarios
async function commentsCounter() {
  return await Comment.countDocuments();
}

//contador de vistas totales a las imagenes
async function imageTotalViewsCounter() {

  const result = await Image.aggregate([{$group: {
        _id: '1',
        viewsTotal: {$sum: '$views'} 
    }}]);
  return result[0].viewsTotal;
}

async function likesTotalCounter() {
   const result = await Image.aggregate([{$group:{
        _id: '1',
        likesTotal: {$sum: '$likes'}
    }}])
    return result[0].likesTotal;
}

//Exporto el modelo
module.exports = async() => {

        //Con el promise le digo que me ejecute todas funciones a la vez
        const results = await Promise.all([
                        imageCounter(),
                        commentsCounter(),
                        imageTotalViewsCounter(),
                        likesTotalCounter() 
        ])
        //Retorno los valores en un array para usarlo mas facilmente
        return {
            images: results[0],
            comments: results[1],
            views: results[2],
            likes: results[3],
        }

};
