/**
 * Arquivo criado para testes de integração de Question
 */
import app from "../../../src/app";
import * as request from "supertest";
import { expect } from "chai";
import { QuestionModel } from "../../../src/models/question";
import * as HttpStatus from "http-status";
import { ObjectId } from "bson";


describe('Routes: Questions', () => {

    const savedQuestion = {
        options: ['Option1', 'Option2'],
        links: ['link1', 'link2'],
        _id: '56cb91bdc3464f14678934ca',
        statement: 'Fake Statement',
        area: 'Fake Area',
        level: 'easy',
        correctOption: 'option1',
        comment: 'anything',
        __v: 0
    };

    const defaultQuestion = {
        _id: '56cb91bdc3464f14678934ca',
        statement: "Fake Statement",
        area: "Fake Area",
        options: ["Option1", "Option2"],
        links: ["link1", "link2"],
        level: "easy",
        correctOption: "option1",
        comment: "anything"
    };


    beforeEach(() => {//Antes de cada teste add o contact
        const question = new QuestionModel(defaultQuestion);
        return QuestionModel.deleteMany({})
            .then(() => question.save());
    });

    afterEach(() => QuestionModel.deleteMany({}));//Depois de cada teste limba o banco

    describe('GET /questions', () => {
        it('should return a list questions and status 200 OK', (done) => {
            request(app)
                .get('/questions')
                .end((err, res) => {
                    expect(res.body).to.eql([savedQuestion]);
                    expect(res.status).to.eql(HttpStatus.OK);
                    done(err);
                });

        });

        context('when an id is specified', () => {
            it('should return one match and status 200 OK', (done) => {
                request(app)
                    .get('/questions/56cb91bdc3464f14678934ca')
                    .end((err, res) => {
                        expect(res.body).to.eql(savedQuestion);
                        expect(res.status).to.eql(HttpStatus.OK);
                        done(err);
                    });
            });
        
            it('should return 400', (done) => {//Requisição com id inexistente
                request(app)
                    .get('/questions/56cb91b12323f14678934ca')
                    .end((err, res) => {
                        expect(res.status).to.eql(HttpStatus.UNPROCESSABLE_ENTITY);
                        done(err);
                    });

            });
        });
    });

    describe('POST /questions', () => {
        it('should return a new question with status 201', (done) => {
            const newQuestion = {
                __v: 0,
                _id: '56cb91bdc3464f14678934cb',
                statement: "Fake Statement2",
                area: "Fake Area2",
                options: ["Option1", "Option2"],
                links: ["link1", "link2"],
                level: "easy",
                correctOption: "option1",
                comment: "anything2"
            };
            request(app)
                .post('/questions')
                .send(newQuestion)
                .end((err, res) => {
                    expect(res.status).to.eql(HttpStatus.CREATED)
                    expect(res.body).to.eql(newQuestion);
                    done(err);
                });

        });

        context('when an error occurs', () => {
            it('should return 422', (done) => {
                const invalidQuestion = {
                    statement: "Fake Statement",
                    comment: 'anything'
                };
                request(app)
                    .post('/questions')
                    .send(invalidQuestion)
                    .end((err, res) => {
                        expect(res.status).to.eql(HttpStatus.UNPROCESSABLE_ENTITY)
                        done(err);
                    });
            });

            it('should return 400', (done) => {
                request(app)
                    .post('/questions')
                    .end((err, res) => {
                        expect(res.status).to.eql(HttpStatus.UNPROCESSABLE_ENTITY)
                        done(err);
                    });
            });
        });

    });

    describe('PUT /questions/:id', () => {
        const updatedQuestion = {
            __v: 0,
            _id: '56cb91bdc3464f14678934ca',
            statement: "Fake Statement2",
            area: "Fake Area2",
            options: ["Option1", "Option2"],
            links: ["link1", "link2"],
            level: "easy",
            correctOption: "option1",
            comment: "anything2"
        };

        it('should return question edited and status 200 OK', (done) => {

            request(app)
                .put(`/questions/${updatedQuestion._id}`)
                .send(updatedQuestion)
                .end((err, res) => {
                    expect(res.body).to.eql(updatedQuestion);
                    expect(res.status).to.eql(HttpStatus.OK);
                    done(err);
                });
        });

        context('when an error occurs', () => {
            it('should return 400', (done) => {
                request(app)
                    .put(`/questions/${1234}`)
                    .end((err, res) => {
                        expect(res.status).to.eql(HttpStatus.UNPROCESSABLE_ENTITY);
                        done(err);
                    });
            });
        });
    });

    describe('DELETE /questions/:id', () => {
        it('should return status 201 NO CONTENT ', (done) => {
            request(app)
                .delete(`/questions/${defaultQuestion._id}`)
                .end((err, res) => {
                    expect(res.status).to.eql(HttpStatus.NO_CONTENT);
                    done(err);
                });
        });
    });
});
