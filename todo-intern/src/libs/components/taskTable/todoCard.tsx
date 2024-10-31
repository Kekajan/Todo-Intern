import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface Task {
  _id: string;
  title: string;
  description: string;
}

interface TodoCardProps {
  task: Task;
  index: number;
}

const TodoCard: React.FC<TodoCardProps> = ({ task, index }) => {
  return (
    <Draggable key={task._id} draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-4 bg-slate-200 rounded-md shadow-sm mb-3"
        >
          <h3 className="font-semibold mt-2">{task.title}</h3>
          <p className="text-sm text-gray-500">{task.description}</p>          
        </div>
      )}
    </Draggable>
  );
};

export default TodoCard;
