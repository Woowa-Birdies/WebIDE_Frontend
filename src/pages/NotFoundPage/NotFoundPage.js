import React from 'react'
import "./notfound.css"
import styled from 'styled-components'

const Wrapper = styled.div`
    height: 100vh;
    margin-top: -100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Content = styled.div`
    margin-bottom: 30px;
    font-family: "Kode Mono", monospace;
    font-optical-sizing: auto;
    font-weight: ${(props) => props.weight};
    font-style: normal;
    font-size: ${(props) => props.size};
    ${props => props.cursor? 'cursor:pointer;' :''}
`

export const NotFoundPage = () => {
  return (
    <Wrapper>
        <Content weight={500} size={'50px'}>404 page not found🤯</Content>
        <Content weight={200} size={'25px'} cursor={true} onClick={() => {window.location.replace('/projects')}}>👉go to main</Content>
    </Wrapper>
  )
}
