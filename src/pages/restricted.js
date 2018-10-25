import React from 'react'
import styled from 'styled-components';
import {Form, Input, SubmitBtn} from 'Component/Form'
import {getCurrentUser} from '../adapters/auth'
import {Login} from 'react-facebook-sdk'
import uuid from 'uuid'
import AWS from 'aws-sdk'

AWS.config.region = 'us-east-1'; // Region

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

class Restricted extends React.Component {
    state = {
        uploading: false,
        profile: {}
    }

    setAWSCredentials(provider, token){
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:cf678155-c688-4d95-bf15-93be769d15f1',
            Logins: {
                [provider]: token
            }
        });
    }

    onChange = async (e) => {
        e.preventDefault()
        const file = e.target.files[0];
        const fileName = uuid();
        var params = {
            Body: file,
            Bucket: "squad-health-check",
            Key: this.state.profile.email + '/' + fileName
        }
        const S3 = new AWS.S3({apiVersion: '2006-03-01'});
        this.setState({uploading: true});
        S3.putObject(params, function (err, data) {
            if (err) console.log(err)
            else console.log(data)
        });
        this.setState({uploading: false});
    }

    onCognitoLogin(){
        getCurrentUser((user) => {
            this.setAWSCredentials('cognito-idp.us-east-1.amazonaws.com/us-east-1_pLYHX1UEu', user.getIdToken().getJwtToken())
        })

    }

    onFBLogin = (data) => {
        console.log(data);
        this.setState({
            profile: data.profile
        })
        this.setAWSCredentials('graph.facebook.com', data.tokenDetail.accessToken)
    }

    render () {
        return (
            <div>
                <Wrapper>
                    <Login
                        scope="email"
                        onResponse={this.onFBLogin}
                    >
                        <span>Login via Facebook</span>
                    </Login>
                    <Form>
                        {/*<SubmitBtn onClick={() => document.getElementById('add-image-file-input').click()}>*/}
                        {/*{this.state.uploading ? 'Uploading...' : 'Add Image'}*/}
                        {/*</SubmitBtn>*/}
                        <input
                            id='add-image-file-input'
                            type="file"
                            accept='image/*'
                            onChange={this.onChange}
                        />
                    </Form>
                </Wrapper>
            </div>
        )
    }
}

export default Restricted