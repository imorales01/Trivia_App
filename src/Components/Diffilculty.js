import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import QuestionList from './QuestionList';

function Diffilculty() {
    const [difficulty, setDifficulty] = useState('');


    return (
        <div >
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Pick Difficulty </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setDifficulty('easy')} >Easy</Dropdown.Item>
                    <Dropdown.Item onClick={() => setDifficulty('medium')} > Medium</Dropdown.Item>
                    <Dropdown.Item onClick={() => setDifficulty('hard')} > Hard</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <h1> {difficulty} </h1>

            <QuestionList difficultyType={difficulty}></QuestionList>

        </div>
    );
}

export default Diffilculty;