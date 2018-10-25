import styled from 'styled-components'

export default styled.button`
  padding: 15px;
  border-radius: 15px;
  background-color: #E72335;
  border: none;
  font-weight: bold;
  font-size: 15px;
  color: #FFF;
  margin-top: 30px;
  width: 40%;
  box-sizing: content-box;
   
  &:disabled,
  &[disabled]{
  &:hover{
    cursor: auto;
  } 
  filter: opacity(20%);
} 
   
  &:hover{
    cursor: pointer;
  } 
   
  @media(max-width: 800px){
     width: 50%;
  }
   
  @media(min-width: 1440px){
     width: 30%;
  }
`