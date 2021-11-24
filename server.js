const express = require( 'express' );
const mongoose = require( 'mongoose' );

//if the db doesnt exist this will add it for us
mongoose.connect('mongodb://localhost/message_board_db', {useNewUrlParser: true});

const {MessageModel, CommentModel, CommentSchema, MessageSchema} = require( './models/Models' );
// const {CommentModel} = require( './models/Models' );

// This package is deprecated, use instead the jsonParser integrated within express
// Look at line 12 for the usage
//const bodyParser = require( 'body-parser' );
const app = express();

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

// This code is deprecated, use instead line 10
//app.use( bodyParser.urlencoded({extended:true}) );
app.use( express.urlencoded({extended:true}) );

app.get( '/', function( request, response ){
    MessageModel
        .getMessages()
        .then( data => {
            console.log( data );
            response.render( 'index', { users : data } );
        });
});

app.post( '/newMessage', function( request, response ){
    console.log( request.body );
    const name = request.body.name;
    const message = request.body.message;

    // Run validations to see if the 'id' is not already in the list
    const newMessage = {
        name,
        message
    };
    console.log( newMessage );
    MessageModel
        .createMessage( newMessage )
        .then( result => {
            console.log( result );
        })
        .catch( err => {
            console.log( "Something went wrong!" );
            console.log( err );
        })

    response.redirect( '/' );
});

app.post( '/newComment/', function( request, response ){
    console.log( request.body );
    const id = request.body.MessageId;
    const name = request.body.name;
    const comment = request.body.comment;

    // Run validations to see if the 'id' is not already in the list
    const newComment = {
        name,
        comment
    };
    console.log( newComment );
    MessageModel
        .AddCommentToMessage(id, newComment)
        .then( result => {
            console.log( result );
        })
        .catch( err => {
            console.log( "Something went wrong!" );
            console.log( err );
        })

    response.redirect( '/' );
});



app.listen( 5000, function(){
    console.log( "The users server is running in port 5000." );
});