const express = require("express")
const app = express();
const port = 3004;

const mysql=require("./connection").con
//configuration
app.set("view engine","hbs");
app.set("views", "./view");
app.use(express.static(__dirname+"./public"))
//Routing
app.get("/",(req,res)=>{
    res.render("index")
});
app.get("/add", (req, res) => {
    res.render("add")

});
app.get("/search", (req, res) => {
    res.render("search")

});
app.get("/update", (req, res) => {
    res.render("update")

});

app.get("/delete", (req, res) => {
    res.render("delete")

});


app.get("/view", (req, res) => {
    let qry = "select * from spring";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("view", { data: results });
        }

    });

});


app.get("/addemployee", (req, res) => {
    // fetching data from form
    const { id, name, desig, department, location} = req.query

    // Sanitization XSS...
    let qry = "select * from spring  where Emm_id=? or Emp_name=?";
    mysql.query(qry, [id, name], (err, results) => {
        if (err)
            throw err
        else {

            if (results.length > 0) {
                res.render("add", { checkmesg: true })
            } else {

                // insert query
                let qry2 = "insert into spring values(?,?,?,?,?,?)";
                mysql.query(qry2, [id,name,desig,dept,salary,location], (err, results) => {
                    if (results.affectedRows > 0) {
                        res.render("add", { mesg: true })
                    }
                })
            }
        }
    })
});


app.get("/searchemployee", (req, res) => {
    // fetch data from the form


    const { dept } = req.query;

    let qry = "select * from spring where Emm_Department=?";
    mysql.query(qry, [dept], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("search", { mesg1: true, mesg2: false })
            } else {

                res.render("search", { mesg1: false, mesg2: true })

            }

        }
    });
})


app.get("/removeemployee", (req, res) => {

    // fetch data from the form


    const { id } = req.query;

    let qry = "delete from spring where Emp_Department=?";
    mysql.query(qry, [dept], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("delete", { mesg1: true, mesg2: false })
            } else {

                res.render("delete", { mesg1: false, mesg2: true })

            }

        }
    });
});


app.listen(port,(err)=>{
    if(err)
        throw err
    else
        console.group("Server running at %d port",port);
});