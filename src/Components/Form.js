import React from 'react';
import axios from "axios";
import './StyleSheet.css';
import logo from "../logo.svg";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

export default class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fName: '',
            lName: '',
            race: '',
            weight: 134.4,
            height: 244,
            ageOfFirstPeriod: 12,
            HasRelative: false,
            parsed: 0,
            joke: ''
        }
    }


    handleInput = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({
            [nam]: val
        })
    }

    async getJoke() {
        this.setState({parsed: 1})
        const response =
            await axios.get("http://api.icndb.com/jokes/random",
                {
                    params: {
                        firstName: this.state.fName,
                        lastName: this.state.lName,
                    }
                }
            )
        setTimeout(() => {
            this.setState({joke: response.data.value.joke})
            this.setState({parsed: 2})
        }, 1000)

    }

    getBMI = (weight, height) =>{
        let w = parseFloat(weight);
        let h = parseFloat(height);
        return (w/(h*h));
    }


    render() {
        let pre =
            <div className="container">
                <label htmlFor="first">First Name</label>
                <TextField id="first" type="text" name="fName" onChange={this.handleInput}/>
                <label htmlFor="last">Last Name</label>
                <TextField id="last" type="text" name="lName" onChange={this.handleInput}/>
                <label htmlFor="race">Race</label>
                <TextField id="race" type="text" name="race" onChange={this.handleInput}/>
                <label htmlFor="weight">Weight (in Kg)</label>
                <TextField id="weight" type="text" name="weight" onChange={this.handleInput}/>
                <label htmlFor="height">Height (in Meters)</label>
                <TextField id="height" type="text" name="height" onChange={this.handleInput}/>
                <label htmlFor="age">Age of First Period </label>
                <TextField id="age" type="text" name="ageOfFirstPeriod" onChange={this.handleInput}/>
                <label htmlFor="relatives">Relatives with breast cancer </label>
                <Checkbox className="CheckBox" style ={{color: "white",}}/>
                <Button variant="contained" color="primary" type={"submit"} onClick={() => this.getJoke()}>Submit</Button>
            </div>

        let post =
            <div>
                <h2>Hello {this.state.fName} {this.state.lName}</h2>
                <p>{this.state.joke}</p>
            </div>
        let ret;
        if (this.state.parsed === 0) {
            ret = pre;
        } else if (this.state.parsed === 1) {
            ret = <img src={logo} className="App-logo" alt="logo"/>
        } else {
            ret = post
        }
        return (
            ret
        )
    }
}