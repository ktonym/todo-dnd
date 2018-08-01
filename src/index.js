import React from 'react';
import ReactDOM from 'react-dom';
import "@atlaskit/css-reset";
import { DragDropContext }  from "react-beautiful-dnd";
import styled from "styled-components";
import initialData from "./initial-data";
import Column from "./Column";

const Container = styled.div`
   display: flex; 
`;

class App extends React.Component{
    state = initialData;

    /*onDragStart = () => {
        document.body.style.color = 'orange';
        document.body.style.transition = 'background-color 0.2s ease';
    };

    onDragUpdate = update => {
        const { destination } = update;
        const opacity = destination ? destination.index / Object.keys(this.state.tasks).length : 0;
        document.body.style.backgroundColor = `rgba(153,141,217, ${opacity})`;
    };*/

    onDragEnd = result => {
        /*document.body.style.color = 'inherit';
        document.body.style.backgroundColor = 'inherit';*/
        const {destination,draggableId,source} = result;
        if(!destination){
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        const column = this.state.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index,1);
        newTaskIds.splice(destination.index,0,draggableId);

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if (start===finish){
            const newColumn = {
                ...column,
                taskIds: newTaskIds
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
            };
            this.setState(newState);
            return;
        }
        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index,1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index,0,draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };
        this.setState(newState);
    };

    render(){
        return (
            <Container>
                <DragDropContext /*onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate}*/ onDragEnd={this.onDragEnd}>
                    {this.state.columnOrder.map((columnId)=>{
                        const column = this.state.columns[columnId];
                        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
                        return <Column key={column.id} column={column} tasks={tasks}/>;
                    })}
                </DragDropContext>
            </Container>

        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
