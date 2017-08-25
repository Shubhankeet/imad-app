var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles={
    'article-one' : { 
        
        tilte: 'Article one 1:Shubhankeet Senapati',
        heading: 'Article One',
        date: 'August 24,2016',
        content: `
        <p>
                    This is the content for my first article.Hello Everyone.Myself Shhubhankeet Senapati.I am from Odisha.I was born and brought up in Rourkela,Sundergarh,Odisha.Rourkela is one of the most beautiful place in India;one of the cleanest city filed with greenery everywhere.I completed my high school at Ispat English Medium School,a well recognized school in Odisha.
                </p>
                <p>
                  Every day was like a new day in  Rourkela;filled with enjoyment and fun. 
               </p>
               <p>
                   Whether it was at school or outside school,playing different sports,hanging out with friends,etc was just awesome!!
               </p>
               <p>
                   I like to play football and volleyball out of which i have played volleyball the most.I still play that game whenenver i go home during my vaccations,with my friends.
               </p>`
    },
    'article-two':{
        tilte: 'Article two:Shubhankeet Senapati',
        heading: 'Article Two',
        date: 'August 25,2016',
        content: `
        <p>
                    This is the content for my second article.Hello Everyone.Myself Shhubhankeet Senapati.I am from Odisha.I was born and brought up in Rourkela,Sundergarh,Odisha.Rourkela is one of the most beautiful place in India;one of the cleanest city filed with greenery everywhere.I completed my high school at Ispat English Medium School,a well recognized school in Odisha.
                </p>
                <p>
                  Every day was like a new day in  Rourkela;filled with enjoyment and fun. 
               </p>
               <p>
                   Whether it was at school or outside school,playing different sports,hanging out with friends,etc was just awesome!!
               </p>
               <p>
                   I like to play football and volleyball out of which i have played volleyball the most.I still play that game whenenver i go home during my vaccations,with my friends.
               </p>`
    },
    'article-three':{
        tilte: 'Article three:Shubhankeet Senapati',
        heading: 'Article Three',
        date: 'August 26,2016',
        content: `
        <p>
                    This is the content for my third article.Hello Everyone.Myself Shhubhankeet Senapati.I am from Odisha.I was born and brought up in Rourkela,Sundergarh,Odisha.Rourkela is one of the most beautiful place in India;one of the cleanest city filed with greenery everywhere.I completed my high school at Ispat English Medium School,a well recognized school in Odisha.
                </p>
                <p>
                  Every day was like a new day in  Rourkela;filled with enjoyment and fun. 
               </p>
               <p>
                   Whether it was at school or outside school,playing different sports,hanging out with friends,etc was just awesome!!
               </p>
               <p>
                   I like to play football and volleyball out of which i have played volleyball the most.I still play that game whenenver i go home during my vaccations,with my friends.
               </p>`
    }
};
   
   function createTemplate (data){
       var title=data.title;
       var date=data.date;
       var heading=data.heading;
       var content=data.content;
       
       var htmlTemplate=`
   </style>
    </head>
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>
            S{heading}
        </h3>
        <div>
            S{date}
        </div>
        <div>
           S{content}
        </div>
        </div>
    </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res){
    //articleName==article-one
    //articles[articleName]=={}content object for article one
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
