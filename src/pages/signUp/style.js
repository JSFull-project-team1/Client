import styled from "styled-components";
import {flexCenterColumn} from './../../global/common'
const S = {}

S.SignUpWrapper = styled.div`
    ${flexCenterColumn}
    height: 600px;
`

S.Form = styled.form`
    height: 100%;
`

S.Label = styled.label`
    display: block;
    width: 100%;
    margin: 0 0 8px 0;
`

S.Title = styled.p`
    font-size: 40px;
    font-weight: bold;
    color: #F2AC29;
    margin: 90px 40px 40px 40px;
`

S.ConfirmMessage = styled.p`
    font-size: 15px;
    color: #F29A2E;
    padding-top: 10px;
`
S.Subtitle = styled.p`
    font-size: 15px;
    color: #222222;
    text-align: center;
    margin: 20px;
`
S.Minititle = styled.p`
    font-size: 15px;
    color: #222222;
    text-align: left;
    margin: 1px;
`

S.Button = styled.button`
        
    width: 490px;
    height: 50px;
    display: inline-flex;
    padding: 0 12px;
    border: 1px solid #F2AC29;
    border-radius: 20px;
    background-color: #F2AC29;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;
    font-size: 18px;

    &:hover {
        color: white;
        background-color: #F2AC29;
    }

    // 비활성화 버튼
    &:disabled {
        color:  #6A6A6A !important;
        background-color: #F7F7F7;
        border: none;
    }

`;

S.Input = styled.input`
        
        width: 490px;
        height: 50px;
        padding: 0 20px;
        border: 1px solid #6A6A6A; 
        border-radius: 20px;
        outline: none;

        &:focus {
            border: 1px solid #F2AC29;
        }

        &:disabled {
            border: none;
            background-color: #F7F7F7;
            color: #6A6A6A;
        }
    `;

S.InputRadio = styled.input`
        
        width: 20px;
        height: 20px;
        padding: 0 20px;
        border: 1px solid #6A6A6A; 
        border-radius: 20px;
        outline: none;

        &:focus {
            border: 1px solid #F2AC29;
        }

        &:disabled {
            border: none;
            background-color: #F7F7F7;
            color: #6A6A6A;
        }
    `;
export default S;