import React from 'react';
import Board from './Board';
import './style.css';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "#000000",
            size: "5"
        }
    }

    changeColor = (event) => {
        this.setState({
            color: event.target.value
        })
    }

    changeSize = (event) => {
        this.setState({
            size: event.target.value
        })
    }

    render() {
        return (
            <div className="container" style={{ zIndex: 10000 }}> {/* Set highest possible z-index */}
                <button className="close-button" onClick={this.props.onClose} style={{backgroundColor:"black"}}>❌</button> {/* Close button */}
                <div className="tools-section">
                    <div className="color-picker-container">
                        Select Brush Color : &nbsp; 
                        <input type="color" value={this.state.color} onChange={this.changeColor}/>
                    </div>

                    <div className="brushsize-container">
                        Select Brush Size : &nbsp; 
                        <select value={this.state.size} onChange={this.changeSize}>
                            <option> 5 </option>
                            <option> 10 </option>
                            <option> 15 </option>
                            <option> 20 </option>
                            <option> 25 </option>
                            <option> 30 </option>
                        </select>
                    </div>
                </div>

                <div className="board-container">
                    <Board color={this.state.color} size={this.state.size}/>
                </div>
            </div>
        )
    }
}

export default Container;
