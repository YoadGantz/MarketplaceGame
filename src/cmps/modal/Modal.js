import React from 'react'
import ReactDOM from 'react-dom'

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
    
    componentDidMount() {
        const modalRoot = document.getElementById('modal');
        modalRoot.appendChild(this.el);
    }
    
    componentWillUnmount() {
        const modalRoot = document.getElementById('modal');
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}