import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

export interface SubmitType {
  onSubmit:(text:string)=>void
  isEmpty:boolean
}

export default function Search ({onSubmit,isEmpty}: SubmitType) {
  const [text,setText]=useState<string>('')
  const navigate=useNavigate()

  // useEffect(() => {
  //   if (text !== '') {
  //     onSubmit(text);
  //   }
  // }, [text, onSubmit]);

  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(text !== ''){
      isEmpty=true;
      onSubmit(text);
    }
    console.log('onSubmit'+text)
 }

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setText(e.target.value);
  }


  return (
      <SearchBar onSubmit={handleSubmit}>
        <SearchInput type="text" value={text}
        onChange={handleChange} placeholder='소환사 이름'/>
        <SearchButton type='submit'>Search</SearchButton>
      </SearchBar>
  );
}
const SearchBar=styled.form`
    height: 50px;
    border-radius: 30px;
    background-color: white;
    display: flex;
`
const SearchInput=styled.input`
    width: 80%;
    border: none;
    border-radius: 30px;
    margin: 0px 0px 0px 17px;
    padding: 0px 0px 0px 16px;
    font-size: 15px;
    outline: none;
`
const SearchButton=styled.button`
    color: #6a6a6a;
    border: none;
    border-left: solid 1px gray;
    border-radius: 0 30px 30px 0;
    background-color: white;
    font-size: 17px;
    padding-left: 16px;
    cursor:pointer;
`