import { Fragment, memo } from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'
import Backdrop from './Backdrop';
import './Modal.css'

const Modal = props => {
    return (
        <CSSTransition
            in={props.show}
            timeout={{
                enter: 400,
                exit: 300
            }}
            mountOnEnter
            unmountOnExit
            classNames={{
                enter: '',
                enterActive: 'ModalOpen',
                exit: '',
                exitActive: 'ModalClosed'
            }}>
            <Fragment>
                <div className='Modal'>
                    {props.children}
                </div>

                <Backdrop show={props.show} backdropClicked={props.backdropClicked} />
            </Fragment>
        </CSSTransition>
    )
}

export default memo(
    Modal,
    (prevProps, nextProps) =>
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children
);