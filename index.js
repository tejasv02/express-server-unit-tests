const express = require('express');
const Joi = require('joi');
const _ = require('lodash');
const app = express();

const schema = Joi.object({
    name: Joi.string().min(3).required()
});
app.use(express.json());
app.get('/', (req, res) => {
    res.send('hello world')
});

const port = process.env.port | 3000;

const server = app.listen(port, () => {
    console.log("listening now on ", port)
})

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]
// app.get("/api/courses", (req, res) => {
//     res.send([12, 3, 3, 4, 5]);
// })

// app.get("/api/courses/:id", (req, res) => {
//     const courseNum = req.params.id;
//     res.send(`course ${courseNum}`);
// })

app.get("/api/posts/:year/:id", (req, res) => {
    const id = req.params.id;
    const year = req.params.year;
    res.send(req.params);
})

const coursesNames = ["as", "dc", "ef"];

app.get("/api/courses", (req, res) => {
    if (req.query.sortBy === "name") {
        res.send(_.sortBy(coursesNames));
    }
})


app.get("/api/courses/:id", (req, res) => {
    // console.log('recived get request');
    const foundCourse = courses.find((x) => x.id === parseInt(req.params.id))
    if (!foundCourse) {
        res.sendStatus(404).send('cannot find course with this course id', req.params.id);
    } else {
        res.send(foundCourse);
    }
})


app.post("/api/courses",(req,res)=>{
    const validation = schema.validate(req.body);
    if((!courses.find(x => x.name === req.body.name)) && !validation.error){
    courses.push({id:courses.length+1,name:req.body.name})
    // console.log(courses);
    res.status(201).send({id:courses.length,name:req.body.name});}
    else if (validation.error){
        // console.log(validation.error.details[0].message);
        res.status(400).send(JSON.stringify(validation.error.details[0]));
    }
    else{
        res.status(409).send('Course with same name already exists');
    }
})

module.exports = server
