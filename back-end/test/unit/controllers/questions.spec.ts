import { assert } from 'chai'
import { QuestionController } from '../../../src/controllers/question'
import { MockRequest, MockResponse, createMocks } from 'node-mocks-http';

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

const questionController: any = new QuestionController()
describe('save()', () => {
    context('when request is sucessfull', () => {
        it('should return a saved question', () => {
            console.log(this.questionController.addNewQuestion)


        })
    })
})

