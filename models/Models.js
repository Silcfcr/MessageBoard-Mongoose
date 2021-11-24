const mongoose = require( 'mongoose' );


const CommentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },
    comment : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 200
    },
});

const MessageSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },
    message : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 200
    },
    comments : [CommentSchema] 
});

// creates the collection
const Message = mongoose.model( 'Message', MessageSchema );
const Comment = mongoose.model( 'Comment', CommentSchema );

const MessageModel = {
    createMessage : function( newMessage ){
        return Message.create( newMessage );
    },
    getMessages : function(){
        return Message.find();
    },
    // getUserById : function( userId ){
    //     return User.findOne({ id : userId });
    // },
    // removeAnimal : function(userId) {
    //     console.log(userId);
    //     return User.deleteOne({ id : userId })
        
    // },
    // updateAnimal : function(userId) {
    //     return User.updateOne({id: userId})
    // }
}

const CommentModel = {
    createMessage : function( newComment ){
        return Comment.create( newComment );
    },
    // getUsers : function(){
    //     return User.find();
    // },
    // getUserById : function( userId ){
    //     return User.findOne({ id : userId });
    // },
    // removeAnimal : function(userId) {
    //     console.log(userId);
    //     return User.deleteOne({ id : userId })
        
    // },
    // updateAnimal : function(userId) {
    //     return User.updateOne({id: userId})
    // }


};

module.exports = {MessageModel, CommentModel};
