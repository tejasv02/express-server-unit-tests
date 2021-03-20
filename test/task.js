let chai = require('chai');
let chaiHttp = require('chai-http');
const server = require('../index');

chai.should();
chai.use(chaiHttp);
describe('Tasks API', () => {
    it("To test get API for courses by id", (done) => {
        const id = 1;
        chai.request(server)
            .get("/api/courses/" + id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('id');
                res.body.should.have.property('id').eq(1);
                res.body.should.have.property('name');
                done();
            })
    })

    it("Post new course", (done) => {
        const newCourse = {name: 'eng'};
        chai.request(server)
            .post("/api/courses")
            .send(newCourse)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                done();
            })
    })

    it("Post course which already exists", (done) => {
        const newCourse = {name: 'course1'}
        chai.request(server).post("/api/courses")
            .send(newCourse)
            .end((err, res) => {
                res.should.have.status('409');
                res.error.should.property('text').eq('Course with same name already exists');
                done();
            })


    })
    //
    // it("Post new course with missing required parameter name", (done) => {
    //
    // })
})