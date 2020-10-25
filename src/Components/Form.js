import React from 'react';
import axios from "axios";
import './StyleSheet.css';
import logo from "../logo.svg";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fName: '',
            lName: '',
            race: '',
            weight: 134.4,
            feet: 0,
            inches: 0,
            ageOfFirstPeriod: 12,
            HasRelative: false,
            parsed: 0,
            joke: '',
            prob: 0,
            menopause: 0
        }
    }


    handleInput = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({
            [nam]: val
        })
    }

    getFunny = () => {
        this.setState({parsed: 1})
        axios.get("http://api.icndb.com/jokes/random", {
            params: {
                firstName: this.state.fName,
                lastName: this.state.lName,
            }
        })
            .then(response => this.setState({joke: response.data.value.joke, parsed: 2}))
            .catch(error => {
                //this.setState({ errorMessage: error.message });
                alert(error);
                //console.error('There was an error!', error);
            });
    }
    getFunny1 = () => {
        this.setState({parsed: 1});
        let url = "https://api.icndb.com/jokes/random?firstName=" + this.state.fName + "&lastName=" + this.state.lName + "&escape=javascript";
        fetch(url)
            .then(response => {
                response.json().then(data => {
                    //alert(data);
                    this.setState({joke: data.value.joke, parsed: 2});
                })
            }).catch(function (err) {
            alert("ERRORORR " + err);
        });

    }

    getPrediction = () => {
        let accessToken = "oo7OxHdS3oUsjPtSL7OKUIEnxRRBH0OAhmpZ0DNs0gEyjR9a6giz1RETpFRXvXwQ";
        alert(parseInt(this.state.weight) + " "+ this.getFeet(this.state.feet, this.state.inches) + " " +
            this.state.ageOfFirstPeriod + " "  + this.state.menopause)

        this.setState({parsed: 1})
        axios.post("https://try.dominodatalab.com:443/models/5f950a4bdfc02d36825b27f0/latest/model", {
                data: {
                    lb: parseInt(this.state.weight),
                    ft: parseInt(this.getFeet(this.state.feet, this.state.inches)),
                    history: 1,
                    age: this.state.ageOfFirstPeriod,
                    menopaus: this.state.menopause
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Authorization": "Basic " + btoa(accessToken + ":" + accessToken)
                }
            })
            .then(response => {
                alert(JSON.stringify(response.data));
                alert(JSON.stringify(response.data.result.prob));
                this.setState({
                    prob: response.data.result.prob,
                    parsed: 2
                });
            })
            .catch(error => {
                //this.setState({ errorMessage: error.message });
                alert(error);
                //console.error('There was an error!', error);
            });
    }


    getBMI = (weight, height) => {
        let w = parseFloat(weight);
        let h = parseFloat(height);
        return (w / (h * h));
    }

    getFeet = (feet, inches) => {
        if (inches > 0) {
            return feet + inches / 12;
        } else {
            return feet;
        }
    }

    // <label htmlFor="race">Race</label>
    // <TextField id="race" type="text" name="race" onChange={this.handleInput}/>

    render() {
        let pre =
            <div className="container">
                <label htmlFor="first">First Name</label>
                <TextField id="first" type="text" name="fName" onChange={this.handleInput}/>
                <label htmlFor="last">Last Name</label>
                <TextField id="last" type="text" name="lName" onChange={this.handleInput}/>
                <label htmlFor="weight">Weight (in lb)</label>
                <TextField id="weight" type="text" name="weight" onChange={this.handleInput}/>
                <div>
                    <label htmlFor="feet">Height</label>

                </div>
                <div>
                    <TextField InputLabelProps={{
                        style: {color: '#fff'},
                    }} id="feet" type="text" name="feet" onChange={this.handleInput} label="Feet"/>
                    <TextField InputLabelProps={{
                        style: {color: '#fff'},
                    }} id="inches" type="text" name="inches" onChange={this.handleInput} label="Inches"/></div>
                <label htmlFor="age">Age of First Period </label>
                <TextField id="age" type="text" name="ageOfFirstPeriod" onChange={this.handleInput}/>
                <label htmlFor="Select">Menopause Status</label>
                <Select
                    labelId="demo-simple-select-label"
                    id="Select"
                    name="menopause"
                    onChange={this.handleInput}
                    className="Select"
                    style={{color: "white"}}
                >
                    <MenuItem value={1}>Pre- or peri-menopausal</MenuItem>
                    <MenuItem value={2}>Post-menopausal</MenuItem>
                    <MenuItem value={3}>Surgical menopause</MenuItem>
                </Select>

                <label htmlFor="relatives">Relatives with breast cancer </label>
                <Checkbox className="CheckBox" style={{color: "white"}}/>
                <Button variant="contained" color="primary" type={"submit"}
                        onClick={() => this.getPrediction()}>Submit</Button>
            </div>

        let post =
            <div>
                <h2>Hello {this.state.fName} {this.state.lName}</h2>
                <p>you have a {this.state.prob} chance of getting breast cancer</p>
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