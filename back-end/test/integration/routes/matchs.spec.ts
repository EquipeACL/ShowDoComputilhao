/**
 * Arquivo criado para testes de integração de Matchs
 */
import "mocha";
import * as request from "supertest";
import {expect} from "chai";
import * as HttpStatus from "http-status";
import app from "../../../src/app";
import { MatchModel } from "../../../src/models/match";

describe('Routes: Matchs',()=>{
    const defaultId = '56cb91bdc3464f14678934ca';
    
    const saveMatch = {
        __v:0,
        player: "Fake player",
        score: "1000",
        data: "2018-09-12T09:17:47.861Z",
        hits: 10,
        skips: 2,
        universitaries: 1,
        cards: 1,
        plates: 1,
        performance: {
            hits: "10%"
        }
    };

    const defaultMatch = {
        player: "Fake player",
        score: "1000",
        data: "2018-09-12T09:17:47.861Z",
        hits: 10,
        skips: 2,
        universitaries: 1,
        cards: 1,
        plates: 1,
        performance: {
            hits: "10%"
        }
    };


    const expectedMatch = {
        __v:0,
        _id:defaultId,
        player: "Fake player",
        score: "1000",
        data: "2018-09-12T09:17:47.861Z",
        hits: 10,
        skips: 2,
        universitaries: 1,
        cards: 1,
        plates: 1,
        performance: {
            hits: "10%"
        }
    };

    beforeEach(()=>{//Antes de cada teste add o contact
        const match = new MatchModel(defaultMatch);
        match._id = defaultId;
        return MatchModel.deleteMany({})
            .then(()=>match.save());
    });

    afterEach(()=>MatchModel.deleteMany({}));//Depois de cada teste limba o banco

    describe('GET /matchs',()=>{
        it('should return a list matchs and status 200 OK',(done)=>{
            request(app)
            .get('/matchs')
            .end((err,res)=>{
                expect(res.body).to.eql([expectedMatch]);
                expect(res.status).to.eql(HttpStatus.OK);
                done(err);
            });    
                
        });

        context('when an id is specified',()=>{
            it('should return one match and status 200 OK',(done)=>{
                request(app)
                .get('/matchs/56cb91bdc3464f14678934ca')
                .end((err,res)=>{
                    expect(res.body).to.eql(expectedMatch);
                    expect(res.status).to.eql(HttpStatus.OK);
                    done(err);
                });    
                    
            });

            it('should return 400',(done)=>{//Requisição com id inexistente
                request(app)
                .get('/matchs/56cb91b12323f14678934ca')
                .end((err,res)=>{
                    expect(res.status).to.eql(400);
                    done(err);
                });    
                    
            });
        });


    });

    describe('POST /matchs',()=>{
        it('should return a new match with status 201',(done)=>{
            const newMatch = {
                __v : 0,
                _id:"5b991223d9edc50d98bf9498",
                player: "New player",
                score: "1000",
                data: "2018-09-12T09:17:47.861Z",
                hits: 10,
                skips: 2,
                universitaries: 1,
                cards: 1,
                plates: 1,
                performance: {
                    hits: "10%"
                }
            };
            request(app)
            .post('/matchs')
            .send(newMatch)
            .end((err,res)=>{
                expect(res.status).to.eql(HttpStatus.CREATED)
                expect(res.body).to.eql(newMatch);
                done(err);
            });

        });

        context('when an error occurs',()=>{
            it('should return 422',(done)=>{
                const invalidMatchSave = {
                    player: "FirstName",
                    score: 100
                };
                request(app)
                .post('/matchs')
                .send(invalidMatchSave)
                .end((err,res)=>{
                    expect(res.status).to.eql(HttpStatus.UNPROCESSABLE_ENTITY)
                    done(err);
                });    
            });

            it('should return 400',(done)=>{                
                request(app)
                .post('/matchs')
                .end((err,res)=>{
                    expect(res.status).to.eql(HttpStatus.BAD_REQUEST)
                    done(err);
                });    
            });
        });        

    });

    describe('PUT /contact',()=>{
        const updatedMatch = {
            __v:0,
            _id:defaultId,
            player: "Fake player",
            score: "1000",
            data: "2018-09-12T09:17:47.861Z",
            hits: 10,
            skips: 2,
            universitaries: 1,
            cards: 1,
            plates: 1,
            performance: {
                hits: "10%"
            }
        };

        it('should return contact edited and status 200 OK',(done)=>{
            
            request(app)
            .put('/matchs/'+updatedMatch._id)
            .send(updatedMatch)
            .end((err,res)=>{
                expect(res.body).to.eql(updatedMatch);
                expect(res.status).to.eql(HttpStatus.OK);
                done(err);
            });
        });

        context('when an error occurs',()=>{
            it('should return 400',(done)=>{
                updatedMatch._id = "sdjfsjfskdjfoifo"//Id inexistente para causar o erro
                request(app)
                .put('/matchs/'+updatedMatch._id)
                .end((err,res)=>{
                    expect(res.status).to.eql(HttpStatus.BAD_REQUEST);
                    done(err);
                });
            });
        });
    });

    describe('DELETE /contact',()=>{
        it('should return status 201 NO CONTENT ',(done)=>{            
            request(app)
            .delete('/matchs/'+expectedMatch._id)
            .end((err,res)=>{
                expect(res.status).to.eql(HttpStatus.NO_CONTENT);
                done(err);
            });
        });

        context('when an error occurs',()=>{
            it('should return 400',(done)=>{
                let idInexistente = "5b8d8c73bdf4280c98ea18c";
                request(app)
                .delete('/matchs/'+idInexistente)
                .end((err,res)=>{
                    expect(res.status).to.eql(HttpStatus.BAD_REQUEST);
                    done(err);
                });
            });
        });
    });
});
