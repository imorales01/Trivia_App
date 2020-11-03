import React, { useState } from 'react';
import axios from 'axios';
import Question from './Question';
import Dropdown from 'react-bootstrap/Dropdown';
import Answer from './Answer';

function QuestionList() {
    const [difficulty, setDifficulty] = useState('');
    const [questions, setQuestions] = useState([]);
    const [counter, setCounter] = useState(0);
    const [showQuestion, setShowQuestion] = useState(false);
    const [showRestart, setShowRestart] = useState(false);
    const [dropDownName, setDropDownName] = useState('Pick Difficulty');
    const [showAnswer, setShowAnswer] = useState(false);
    const [userChoice, setUserChoice] = useState('');
    const [answer, setAnswer] = useState('');

    const fetchAPIdata = () => {
        axios.get(`https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=multiple`)
            .then(res => {
                setQuestions(res.data.results);
                setShowQuestion(true);
            });
    };

    const handleQuestionAnswered = () => {
        setCounter(counter + 1);
    };

    const difficultyChosen = (diffChosen) => {
        setDropDownName(`Difficulty: ${diffChosen}`);
        setDifficulty(diffChosen);
        fetchAPIdata();
    };

    const myCallBack = (choice) => {
        setUserChoice(choice);
        setAnswer(questions[counter].correct_answer);
        setShowAnswer(true);
        if (counter >= questions.length) {
            fetchAPIdata();
            setCounter(0);
        }
        else {
            setCounter(counter + 1);
            if (counter >= questions.length - 1) {
                setShowQuestion(false);
                setShowRestart(true);
            }
        }

    };

    const restart = () => {
        setShowRestart(false);
        setDifficulty(difficulty);
        setCounter(0);
        setQuestions([]);
        setShowQuestion(false);
        difficultyChosen(difficulty);
    };

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {dropDownName} </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => difficultyChosen('easy')} >Easy</Dropdown.Item>
                    <Dropdown.Item onClick={() => difficultyChosen('medium')} > Medium</Dropdown.Item>
                    <Dropdown.Item onClick={() => difficultyChosen('hard')} > Hard</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div>
                {showQuestion && !showRestart && (
                    <Question callbackFromParent={myCallBack} data={questions[counter]} onQuestionAnswered={handleQuestionAnswered}></Question>
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