import React, { Component } from 'react';

class InsertCoin extends Component {
    InsertCoin = () => {
        this.props.insertCoin(this.props.col)
    }
    render() {
        return (
            <div onClick={this.InsertCoin} className={this.props.class}>
                <i class="large material-icons">arrow_downward</i>
            </div>
        )
    }
}

export default InsertCoin