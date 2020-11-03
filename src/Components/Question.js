import React from 'react';

function Question(props) {
    const onClickHandler = (choice) => {
        props.callbackFromParent(choice);
    };

    return (
        <div>
            <h1>{props?.data?.question} </h1>
            <button onClick={() => { onClickHandler(props?.data?.incorrect_answers[0]); }} >{props?.data?.incorrect_answers[0]}</button>
            <button onClick={() => { onClickHandler(props?.data?.incorrect_answers[1]); }}>{props?.data?.incorrect_answers[1]}</button>
            <button onClick={() => { onClickHandler(props?.data?.incorrect_answers[2]); }}>{props?.data?.incorrect_answers[2]}</button>
            <button onClick={() => { onClickHandler(props?.data?.correct_answer); }}>{props?.data?.correct_answer}</button>
        </div >
    );
}

export default Question;