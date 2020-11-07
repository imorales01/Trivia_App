import React from 'react';

function Question(props) {
    const onClickHandler = (choice) => {
        props.callbackFromParent(choice);
    };

    const renderOptions = () => {
        return (
            props?.data?.incorrect_answers?.map(incorrectAnswer => {
                return (
                    <button onClick={() => { onClickHandler(incorrectAnswer); }}>{incorrectAnswer}</button>
                );
            })
        );
    };

    return (
        <div>
            <h1>{props?.data?.question} </h1>
            {renderOptions()}
            <button onClick={() => { onClickHandler(props?.data?.correct_answer); }}>{props?.data?.correct_answer}</button>
        </div >
    );
}

export default Question;