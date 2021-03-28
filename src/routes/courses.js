const express = require('express');
const Router = express.Router();
const {getData, setData} = require('../../src/dataFile');
const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(3).required()
});

Router.route('/:id')
    .get((req, res) => {
        // console.log('recived get request');
        const courses = getData();
        const foundCourse = (Object.keys(courses).find(x => parseInt(x) === parseInt(req.params.id)));
        if (!foundCourse) {
            res.sendStatus(404).send('cannot find course with this course id', req.params.id);
        } else {
            res.send(courses[foundCourse]);
        }
    })


Router.route('')
    .post((req, res) => {
        const validation = schema.validate(req.query);
        const courses = getData();

        if ((!Object.keys(courses).find(x => courses[x] === req.query.name)) && !validation.error) {
            // courses.push({id: courses.length + 1, name: req.body.name})
            setData(Object.keys(courses).length + 1, req.query.name);
            // console.log(courses);
            res.status(201).send({id: courses.length, name: req.body.name});
        } else if (validation.error) {
            // console.log(validation.error.details[0].message);
            res.status(400).send(JSON.stringify(validation.error.details[0]));
        } else {
            res.status(409).send('Course with same name already exists');
        }
    })

module.exports = Router;