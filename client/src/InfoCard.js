import React, { Component } from 'react';
import './App.css';

class InfoCard extends Component {

    render() {
        const message = this.props.message;
        const pinnedClass = "close Card-Buttons" + (message.pinned ? " Blue-Button" : "");
        const dislikedClass = "close Card-Buttons" + (message.disliked ? " Red-Button" : "");
        return (
            <div className="card Info-Card" key={message.guid}>
                <div className="card-header">
                    {message.payload.intent}
                    <button type="button" className="close" onClick={() => this.props.onClose(message.guid)}>
                        <span role="img" aria-label="close">&#9747;</span>
                    </button>
                    <button type="button" className={pinnedClass} onClick={() => this.props.onPin(message.guid)}>
                        <span role="img" aria-label="pin">&#128204;</span>
                    </button>
                    <button type="button" className={dislikedClass} onClick={() => this.props.onDisliked(message.guid)}>
                        <span role="img" aria-label="dislike">&#128078;</span>
                    </button>
                </div>
                <div className="card-body">
                    <ul className="card-text">
                        {
                            message.payload.response.map((resp, id) =>
                                <li key={id}>
                                    <a target="_blank" href={resp.url} rel="noopener noreferrer" className="App-link">
                                        {resp.title}
                                    </a>
                                </li>)
                        }
                    </ul>
                </div>
                <div className="card-footer text-muted">
                    {message.payload.tags.map((tag) =>
                        <span key={tag} className="badge badge-pill badge-dark">{tag}</span>)}
                </div>
            </div>
        );
    }

}

export default InfoCard;