import React from 'react';
import Styled from 'styled-components';

const Div = Styled.div`
    display: flex;
    border: 1px solid red;
    width: 30%;
    justify-content: center;
    margin: 10px auto;
    max-width: 800px;
    flex-direction: column;
    text-align: center;
`

export const Posts = (props) => {
    
    return (
        <Div>
            <form>
                <input
                    type='text'
                    name='title'   
                />
                <input
                    type='text'
                    name='contents'
                />
                <button>Update User</button>
            </form>

            <p>Contents: {props.post.contents}</p>
            <p>Title: {props.post.title}</p>
            <p>Date Created: {props.post.created_at}</p>
            <h2>Commments</h2>
            <p>Text: {props.comment}</p>
            
            <button onClick={(event) => props.deleteUser(props.post.id)}>Delete</button>
            <button onClick={(event) => props.getComments(props.post.id)}>Get comments</button>
        </Div>
    )
}