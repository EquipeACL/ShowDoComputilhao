import { QuestionController } from "../controllers/question";
import { MatchController } from "../controllers/match";


export class Routes {

    public questionController: QuestionController
    public matchController: MatchController

    constructor() {
        this.questionController = new QuestionController();
        this.matchController = new MatchController();
    }
    public routes(app): void {
        app.route('/questions')
            .get(this.questionController.getQuestionAll)
            .post(this.questionController.addNewQuestion);

        app.route('/questions/:questionId')
            .get(this.questionController.getQuestionId)
            .delete(this.questionController.deleteQuestion)
            .put(this.questionController.updateQuestion)


        app.route('/matchs')
            .get(this.matchController.getMatchsAll)
            .post(this.matchController.addNewMatch);

        app.route('/matchs/:matchId')
            .get(this.matchController.getMatchId)
            .delete(this.matchController.deleteMatch)
            .put(this.matchController.updateMatch)

    }

}