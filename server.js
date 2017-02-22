var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');


app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts',express.static(path.join(__dirname,'/node_modules/')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

/*MySql connection*/
var connection  = require('express-myconnection'),
    mysql = require('mysql');

app.use(

    connection(mysql,{
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'adp',
        debug    : false //set true if you wanna see debug logger
    },'request')

);

app.get('/',function(req,res){
    res.send('Welcome');
});


//RESTful route
var router = express.Router();

router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});



var kings=router.route('/kings');
kings.get(function(req,res,next){

    req.getConnection(function(err,conn){
            if(err) return next("Cannot Connect");
            var sqlString="SELECT DISTINCT attacker_king as name FROM `battles` UNION SELECT DISTINCT defender_king  FROM `battles`"
            var query=conn.query(sqlString,function(err,rows){
                if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.json({title:"Kings in Battles",data:rows});
            });
    });

});


var king=router.route('/king/:king_name*');

//get data to update
king.get(function(req,res,next){

    var user_id = req.params.king_name+req.params[0];
    console.log(req.params.king_name+req.params[0]);

    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = 
        conn.query('SELECT COUNT(*) as wins,(SELECT COUNT(*) FROM `battles` WHERE (attacker_king=? OR defender_king=?) AND attacker_outcome="loss") as losts FROM `battles` WHERE (attacker_king=? OR defender_king=?) AND attacker_outcome="win"',[user_id,user_id,user_id,user_id],function(err,rows){
  
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("User Not found");

            res.json({title:user_id+" Info",data:rows});
        });

    });

});

var kinginfo=router.route('/kinginfo/:king_name*');


//get data to update
kinginfo.get(function(req,res,next){

    var user_id = req.params.king_name+req.params[0];
    console.log(req.params.king_name+req.params[0]);

    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = 
        conn.query('SELECT * FROM `battles` WHERE (attacker_king=? OR defender_king= ?)',[user_id,user_id],function(err,rows){
  
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("User Not found");

            res.json({title:user_id+" Info",data:rows});
        });

    });

});



//now we need to apply our router here
app.use('/api', router);

//start Server
var server = app.listen(3000,function(){

   console.log("Listening to port %s",server.address().port);

});
