const express = require('express');
const _ = require('lodash');
const app = express();
const courseRoutes = require('./src/routes/courses');
const {getData, setData} = require('./src/dataFile');

app.use(express.json());
app.get('/', (req, res) => {
    res.send(getData())
});

app.use('/api/courses', courseRoutes);

const port = process.env.port | 3000;

const server = app.listen(port, () => {
    console.log("listening now on ", port)
})

setData('1','course1');

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

module.exports = server
