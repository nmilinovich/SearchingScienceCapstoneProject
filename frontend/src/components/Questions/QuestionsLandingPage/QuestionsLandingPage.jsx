import { useEffect } from 'react';
import { getQuestions } from '../../../store/questions';
import { useDispatch, useSelector } from "react-redux";
import QuestionTile from '../QuestionTile/QuestionTile';

function QuestionsLandingPage() {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions)
    useEffect(() => {
        dispatch(getQuestions())
    }, [dispatch])
    if (!questions) {
        return <div>Loading...</div>
    }
    return (
        <div className='landingPageDiv'>
            <div className='questions-grid-container'>
                {Object.values(questions)?.map((question) => {
                    return (
                        <QuestionTile key={question.id} question={question}/>
                    )
                })}
            </div>
        </div>
    );
}
export default QuestionsLandingPage
