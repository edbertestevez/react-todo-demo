import React, { Component } from 'react';


//CREDENTIALS
// galangdj@gmail.com
// test123
class LoginForm extends Component {
    state = {
        identifier: '',
        password: ''
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="login">

                <span>{this.props.loginError && this.props.loginError}</span>
                <form>
                    <p>Username</p>
                    <input type="text" name="identifier" onChange={this.handleInputChange} />
                    <p>Password</p>
                    <input type="password" name="password" onChange={this.handleInputChange} />
                    <br /><br />
                    <button type="button" className="btn-login" onClick={() => this.props.handleLogin(this.state.identifier, this.state.password)}>Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;