const { Schema, model } = require('mongoose')
const { ObjectId } = Schema;

//modelo de entrada de comentarios a la base de datos
const CommentSchema = new Schema({
    image_id:{ type:ObjectId},
    email:{type:String},
    name:{type:String},
    gravatar:{type:String},
    comment:{type:String},
    timestamp:{type:Date, default:Date.now}
})

//creamos una memoria virtual
CommentSchema.virtual('image').set(function(image){
    this._image = image;
})
.get(function () {
    return this._image;
})

module.exports = model('comment', CommentSchema)