function Answer(props) {

    return (
        <div>
            <p>{props.correctAnswer == props.choice ? 'Correct!' : `Incorrect! The correct answer was: ${props.correctAnswer}`}</p>
        </div>
    );
}

export default Answer;