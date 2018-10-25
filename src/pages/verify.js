import React from 'react'
import {verify} from '../adapters/auth';
import styled from 'styled-components'
import H1 from 'Component/H1/H1'
import {Form, Input, SubmitBtn} from 'Component/Form'
import {withRouter} from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

class Verify extends React.Component {
    state = {
        email: this.props.match.params && this.props.match.params.email || '',
        code: ''
    }

    stateChange (key, value) {
        this.setState({
            [key]: value
        })
    }

    verify = (event) => {
        if (this.state.email && this.state.code) {
            verify(this.state.email, this.state.code, () => this.props.history.push(`/login?email=${this.state.email}`), console.error)
            event.preventDefault()
        }
    }

    render () {
        console.log({'this.props.router': this.props.router});
        return (
            <div>
                <Wrapper>
                    <H1 title={'Verify'} color={'#E72335'}/>
                    <Form>
                        <Input type="email" value={this.state.email}
                               placeholder="Email"
                               onChange={(e) => this.stateChange('email', e.target.value)}/>

                        <Input type="text" value={this.state.code}
                               placeholder="Code"
                               onChange={(e) => this.stateChange('code', e.target.value)}/>

                        <SubmitBtn onClick={this.verify}>Verify</SubmitBtn>
                    </Form>
                </Wrapper>
            </div>
        )
    }
}

export default withRouter(Verify)