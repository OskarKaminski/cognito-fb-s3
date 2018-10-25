import styled from 'styled-components';

export default styled.input`
   border: 1px solid #E72335;
   border-radius: 15px;
   padding: 10px;
   outline: none;
   margin: 5px;
   width: 40%;
   
   @media(max-width: 800px){
      width: 50%;
   }
   
   @media(min-width: 1440px){
      width: 30%;
   }
`