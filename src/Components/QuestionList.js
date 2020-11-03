import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

import Question from './Question';
import Answer from './Answer';

function QuestionList() {
    const [questions, setQuestions] = useState([]);
    const [counter, setCounter] = useState(0);

    const [dropDownName, setDropDownName] = useState('Pick Difficulty');

    const [difficulty, setDifficulty] = useState('');
    const [userChoice, setUserChoice] = useState('');

    const [showQuestion, setShowQuestion] = useState(false);

    const [showAnswer, setShowAnswer] = useState(false);
    const [answer, setAnswer] = useState('');

    const [showRestart, setShowRestart] = useState(false);

    const fetchData = () => {
        setShowQuestion(false);
        setShowAnswer(false);
        setShowRestart(false);
        setCounter(0);
        setQuestions([]);

        axios.get(`https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=multiple`)
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

    const onChoiceClick = (choice) => {
        setShowQuestion(false);
        renderAnswer();
        if (isLastQuestion()) {
            setShowQuestion(false);
            setShowRestart(true);
        }
        setUserChoice(choice);
        setAnswer(questions[counter].correct_answer);
        setShowAnswer(true);
        setCounter(counter + 1);
    };

    const renderAnswer = () => {
        setTimeout(() => {
            setShowAnswer(false);
            if (isLastQuestion()) {
                setShowQuestion(false);
                setShowRestart(true);
            } else {
                setShowQuestion(true);
            }
        }, 2000);
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
            <div>
                {showQuestion && (
                    <Question callbackFromParent={onChoiceClick} data={questions[counter]} onQuestionAnswered={progressToNextQuestion}></Question>
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