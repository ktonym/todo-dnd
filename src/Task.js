import React, {Component} from 'react';
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
   border: 1px solid lightgrey;
   border-radius: 2px;
   background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
   padding: 8px;
   margin-bottom: 8px;
   display: flex;
`;

const Handle = styled.span`
    width: 20px;
    height: 20px;
    background-color: orange;
    margin-right: 8px;
`;

class Task extends Component{

    render(){
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {(provided,snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        innerRef={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        <Handle {...provided.dragHandleProps}/ >
                        {this.props.task.content}
                    </Container>
                )}
            </Draggable>
        );
    }
}

export default Task;
