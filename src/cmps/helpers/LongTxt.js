import React,{ Component } from "react";




export default class LongTxt extends Component {

    state = {
        isLongTxtShown: this.props.isLongTxtShown
    }

    getText = () => {
        return (this.state.isLongTxtShown) ? this.props.text : this.props.text.substring(0, this.props.shortLength);
    }

    handleReadMore = () => {
        this.setState(prevstate => ({ isLongTxtShown: !prevstate.isLongTxtShown }))
    }

    getButtonTxt() {
        return this.state.isLongTxtShown ? '': '...'
    }


    render() {
        return (
            <span className="read-more" onClick={this.handleReadMore}>       
                {this.getText()}
                {this.props.text.length >= this.props.shortLength &&
                    <span className="read-more-button">
                    {this.getButtonTxt()}
                    </span>}
            </span>
        )
    }
}