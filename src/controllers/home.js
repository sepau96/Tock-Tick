const ctrl = {};
const { Image } = require('../models');
const sidebar = require('../helpers/sidebar');

//Controlador del index
ctrl.index = async(req,res) =>{
    //busca la imgaen y la ordena de mayor a menor
    const images = await Image.find().sort({timestamp: -1 });
    let viewModel = {images:[]};
    viewModel.images = images;
    viewModel = await sidebar(viewModel);
    
    //le respondo un una renderizacion del index
    res.render('index', viewModel);
};



module.exports = ctrl;