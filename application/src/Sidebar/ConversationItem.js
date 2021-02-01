import React, { Component } from 'react'


class ConversationItem extends Component{
    constructor(){
        super();
        this.id = Math.floor((Math.random() * 100) + 1);
    }

    conversationClick = (e) => {
        this.props.conversationClick();
    }

    render(){
        return(
            <li id={this.id} onClick={this.conversationClick}>{this.props.text}</li>
        );
    };
}

export default ConversationItem