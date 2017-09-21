var express = require("express"),
    request = require("request"),
    bodyParser      = require("body-parser"),
    app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

    
app.get("/", function(req, res){
    res.render("search");    
});

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data: data, query: query, page: 1}); 
        }
    });
});

app.get("/results/:query/:page", function(req, res){
    var page = req.params.page,
        query = req.params.query;
        
   console.log("page is: " + page);
    var url = "http://www.omdbapi.com/?s=" + query + "&page=" + page + "&apikey=thewdb";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data: data, query: query, page: page}); 
        }
    });
});


app.get("/info", function(req, res){
    var query = req.query.info,
        list = JSON.parse(req.query.list);
    
    var url = "http://www.omdbapi.com/?i=" + query + "&apikey=thewdb";
        // url2 = "http://www.omdbapi.com/?s=" + similar + "&apikey=thewdb";
    
    
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
                var data = JSON.parse(body);
                //console.log("list is: " + list["Search"]["Title"]);
                res.render("info", {data: data, list: list});
        }
    });
    // console.log("related movie is: " + relatedMovie);
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie API App has started");
});