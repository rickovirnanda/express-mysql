// import library
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors')

// set port
const port = process.env.PORT || 3000;
// make object to use express 
const app = express();
// menggunakan body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// setting koneksi database
const conn = mysql.createConnection({
    host     : '35.198.192.80',
    user     : 'indi',
    password : 'indistore',
    database : 'indistore'
});

// routing untuk /api method get, (Get all data)
app.route("/api").get((req, res)=>{
    // query
    const query = "select * from guestbook"; 

    // eksekusi query
    conn.query(query, function(error, rows){
        if(error){
            console.log(error);
        }
        else
        {
            // const data = {
            //     'status':200,
            //     'data' : rows
            // };
            res.json(rows);
            res.end();
        }
    })
});

app.route("/api/:id").get((req, res)=>{
    const id = req.params.id;
    // query
    const query = "select * from guestbook where ID='"+id+"'"; 

    // eksekusi query
    conn.query(query, function(error, rows){
        if(error){
            console.log(error);
        }
        else
        {
            // const data = {
            //     'status':200,
            //     'data' : rows
            // };
            res.json(rows[0]);
            res.end();
        }
    })
});

// routing untuk /api method post, (insert data)
app.route("/api").post((req, res)=>{
    // ambil data body
    let body = req.body;

    // query
    const query = `insert into guestbook set 
                    name='${body.name}', 
                    title='${body.title}', 
                    date='${body.date}', 
                    description='${body.description}'`;

    // eksekusi query
    conn.query(query, function(error, rows){
        if(error){
            console.log(error);
        }
        else
        {
            // const data = {
            //     'status':200,
            //     'data' : rows
            // };
            res.json(rows);
            res.end();
        }
    })
});

// routing untuk /api method put, (update data)
app.route("/api/:id").put((req, res)=>{
    // ambil data body
    const body = req.body;
    // ambil parameter
    const id = req.params.id;

    // query
    const query =`update guestbook set 
                    name='${body.name}', 
                    title='${body.title}', 
                    date='${body.date}', 
                    description='${body.description}' 
                    where ID='${id}'`;
                    
    // eksekusi query
    conn.query(query, function(error, rows){
        if(error){
            console.log(error);
        }
        else
        {
            // const data = {
            //     'status':200,
            //     'data' : rows
            // };
            res.json(rows);
            res.end();
        }
    })
});

// routing untuk /api method put, (update data)
app.route("/api/:id").delete((req, res)=>{
    // ambil parameter
    const id = req.params.id;

    // query
    const query =`delete from guestbook where ID='${id}'`;
                    
    // eksekusi query
    conn.query(query, function(error, rows){
        if(error){
            console.log(error);
        }
        else
        {
            // const data = {
            //     'status':200,
            //     'data' : rows
            // };
            res.json(rows);
            res.end();
        }
    })
});

// listen port 3000
app.listen(port, () => console.log(`listening on port ${port}..`));