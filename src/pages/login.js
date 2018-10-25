import React from 'react'
import H1 from 'Component/H1/H1'
import {login} from '../adapters/auth'
import styled from 'styled-components'
import {Form, Input, SubmitBtn, RedirectLink} from 'Component/Form'
import {withRouter} from "react-router-dom";

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

class Login extends React.Component {
    state = {
        email: this.props.match.params && this.props.match.params.email || '',
        password: ''
    }

    stateChange (key, value) {
        this.setState({
            [key]: value
        })
    }

    canBeSubmitted () {
        const {email, password} = this.state;
        return (
            email &&
            password
        );
    }

    login = (event) => {
        if (this.canBeSubmitted()) {
            login(this.state.email, this.state.password,
                (data) => {
                    console.log(data);
                    this.props.history.push('/restricted', {data})
                },
                console.error
            )
            event.preventDefault()
        }
    }

    render () {
        return (
            <LoginWrapper>
                <H1 title={'Log in'} color={'#E72335'}/>
                <Form>
                    <Input type="email" value={this.state.email}
                           placeholder="Email"
                           onChange={(e) => this.stateChange('email', e.target.value)}/>

                    <Input type="password" value={this.state.password}
                           placeholder="Password"
                           onChange={(e) => this.stateChange('password', e.target.value)}/>

                    <SubmitBtn onClick={this.login} disabled={!this.canBeSubmitted()}>Log In</SubmitBtn>
                </Form>
                <RedirectLink href={'/register'}>Register</RedirectLink>
            </LoginWrapper>
        )
    }
}

export default withRouter(Login)