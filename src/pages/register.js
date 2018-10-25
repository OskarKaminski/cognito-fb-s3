import React from 'react'
import {register} from '../adapters/auth'
import styled from 'styled-components'
import H1 from "Component/H1/H1"
import {Form, Input, SubmitBtn, Warning, RedirectLink} from 'Component/Form'
import {withRouter} from "react-router-dom";

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

class Register extends React.Component {
    state = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    stateChange (key, value) {
        this.setState({
            [key]: value
        })
    }

    canBeSubmitted () {
        const {email, password, confirmPassword} = this.state;
        return (
            email &&
            password &&
            password === confirmPassword &&
            password.length > 6
        );
    }

    warning = () => {
        const {password, confirmPassword} = this.state;
        let re = /(?=.*\d).{6,}/;
        if (password && !password.match(re)) {
            return (<Warning>Password must have min. 6 characters (with at least 1 number)</Warning>)
        }

        if (password && confirmPassword && password !== confirmPassword) {
            return (<Warning>Passwords don't match</Warning>)
        }
    }

    register = (event) => {
        if (!this.canBeSubmitted()) return

        register(this.state.email, this.state.password, () =>
            this.props.history.push(`/verify`, {email: this.state.email}), console.error)
        event.preventDefault()
    }

    render () {
        const {email, password, confirmPassword} = this.state
        const isEnabled = this.canBeSubmitted();

        return (
            <RegisterWrapper>

                <H1 title={'Register'} color={'#E72335'}/>

                {this.warning()}

                <Form>
                    <Input type="email" value={email}
                           placeholder="Email"
                           onChange={(e) => this.stateChange('email', e.target.value)}/>

                    <Input type="password" value={password}
                           placeholder="Password"
                           onChange={(e) => this.stateChange('password', e.target.value)}/>

                    <Input type="password" value={confirmPassword}
                           placeholder="Repeat password"
                           onChange={(e) => this.stateChange('confirmPassword', e.target.value)}/>

                    <SubmitBtn onClick={this.register} disabled={!isEnabled}>Register</SubmitBtn>
                </Form>

                <RedirectLink href={'/login'}>Log in</RedirectLink>
            </RegisterWrapper>
        )
    }
}

export default withRouter(Register)