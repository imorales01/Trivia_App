import { Modal } from 'react-bootstrap';

function Answer(props) {

    return (
        <div>
            <Modal.Dialog>
                <Modal.Body>
                    <p>{props.correctAnswer == props.choice ? 'Correct!' : `Incorrect! The correct answer was: ${props.correctAnswer}`}</p>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
}

export default Answer;