import React, { useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

import Question from './Question';
import Answer from './Answer';

function QuestionList() {
    const [questions, setQuestions] = useState([]);
    const [counter, setCounter] = useState(0);

    const [difficulty, setDifficulty] = useState('');
    const [userChoice, setUserChoice] = useState('');

    const [showQuestion, setShowQuestion] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [answer, setAnswer] = useState('');

    const fetchData = () => {
        reset();
        axios.get(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`)
            .then(res => {
                setQuestions(res.data.results);
                setShowQuestion(true);
            });
    };

    const reset = () => {
        setShowQuestion(false);
        setShowAnswer(false);
        setCounter(0);
        setQuestions([]);
    };

    const progressToNextQuestion = () => {
        setCounter(counter + 1);
    };

    const onDifficultyClick = (difficulty) => {
        setDifficulty(difficulty);
        fetchData();
    };

    const onChoiceClick = (choice) => {
        setShowQuestion(false);
        renderAnswer();
        if (isLastQuestion()) {
            setShowQuestion(false);
        }
        setUserChoice(choice);
        setAnswer(questions[counter].correct_answer);
        setShowAnswer(true);
        progressToNextQuestion();
    };

    const renderAnswer = () => {
        setTimeout(() => {
            setShowAnswer(false);
            if (isLastQuestion()) {
                setShowQuestion(false);
                fetchData();
            } else {
                setShowQuestion(true);
            }
        }, 2000);
    };

    const isLastQuestion = () => {
        return counter >= questions.length - 1;
    };

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {difficulty ? 'Difficulty:' : 'Select Difficulty'} {difficulty} </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => onDifficultyClick('easy')} >Easy</Dropdown.Item>
                    <Dropdown.Item onClick={() => onDifficultyClick('medium')} > Medium</Dropdown.Item>
                    <Dropdown.Item onClick={() => onDifficultyClick('hard')} > Hard</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div>
                {showQuestion && (
                    <Question callbackFromParent={onChoiceClick} data={questions[counter]}></Question>
                )}
                {showAnswer && (
                    <Answer correctAnswer={answer} choice={userChoice}></Answer>
                )}
            </div>
        </div >
    );
}

export default QuestionList;