import React, { useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

import Question from './Question';
import Answer from './Answer';

function QuestionList() {
    const [difficulty, setDifficulty] = useState('');
    const [questions, setQuestions] = useState([]);
    const [counter, setCounter] = useState(0);

    const [showQuestion, setShowQuestion] = useState(false);

    const [dropDownName, setDropDownName] = useState('Pick Difficulty');
    const [questionAmount, setQuestionAmount] = useState('Pick Amount (defaults to five)');

    const [userChoice, setUserChoice] = useState('');

    const [showAnswer, setShowAnswer] = useState(false);
    const [answer, setAnswer] = useState('');

    const [showRestart, setShowRestart] = useState(false);

    const fetchData = () => {
        setShowQuestion(false);
        setShowAnswer(false);
        setShowRestart(false);
        setCounter(0);
        setQuestions([]);

        axios.get(`https://opentdb.com/api.php?amount=${questionAmount}&difficulty=${difficulty}&type=multiple`)
            .then(res => {
                setQuestions(res.data.results);
                setShowQuestion(true);
            });
    };

    const progressToNextQuestion = () => {
        setCounter(counter + 1);
    };

    const onDifficultyClick = (difficulty) => {
        if (isLastQuestion()) {
            setShowRestart(false);
        }
        setDropDownName(`Difficulty: ${difficulty}`);
        setDifficulty(difficulty);
        fetchData();
    };

    const onQuestionAmountClick = (amount) => {
        console.log('amount', amount);
        if (parseInt(amount) < 5) {
            setQuestionAmount('5');
        }
        setQuestionAmount(amount);
    };

    const myCallBack = (choice) => {
        setUserChoice(choice);
        setAnswer(questions[counter].correct_answer);
        setShowAnswer(true);
        setCounter(counter + 1);

        if (isLastQuestion()) {
            setShowQuestion(false);
            setShowRestart(true);
        }
    };

    const isLastQuestion = () => {
        return counter >= questions.length - 1;
    };

    const restart = () => {
        setShowRestart(false);
        fetchData();
    };

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {dropDownName} </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => onDifficultyClick('easy')} >Easy</Dropdown.Item>
                    <Dropdown.Item onClick={() => onDifficultyClick('medium')} > Medium</Dropdown.Item>
                    <Dropdown.Item onClick={() => onDifficultyClick('hard')} > Hard</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Amount </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => onQuestionAmountClick('5')} >5</Dropdown.Item>
                    <Dropdown.Item onClick={() => onQuestionAmountClick('10')} > 10</Dropdown.Item>
                    <Dropdown.Item onClick={() => onQuestionAmountClick('15')} > 15</Dropdown.Item>
                    <Dropdown.Item onClick={() => onQuestionAmountClick('20')} > 20</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>
            <div>
                {showQuestion && (
                    <Question callbackFromParent={myCallBack} data={questions[counter]} onQuestionAnswered={progressToNextQuestion}></Question>
                )}
                {showRestart && (
                    <button onClick={() => restart()}>Restart</button>
                )}
                {showAnswer && (
                    <Answer correctAnswer={answer} choice={userChoice}></Answer>
                )
                }
            </div>
        </div >
    );

}

export default QuestionList;