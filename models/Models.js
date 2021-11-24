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
    getMessageById : function( userId ){
        return User.findOne({ id : userId });
    },
    AddCommentToMessage : function(MessageId, newComment) {
        return CommentModel.createComment(newComment)
        .then( result => {
            return Message.findByIdAndUpdate({_id: MessageId}, {$push: {comments: result}});
        });
    }
}

const CommentModel = {
    createComment : function( newComment ){
        return Comment.create( newComment );
    }
};

module.exports = {MessageModel,
    CommentModel,
    CommentSchema,
MessageSchema};
