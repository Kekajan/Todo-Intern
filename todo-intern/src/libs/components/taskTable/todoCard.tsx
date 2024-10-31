import { ITask } from "@/libs/types";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";



interface TodoCardProps {
  task: ITask;
  index: number;
}

const TodoCard: React.FC<TodoCardProps> = ({ task, index }) => {
    console.log(task.status)
  const [color, setColor] = useState("");
  useEffect(() => {
    setColor(getBackgroundColor());
  }, [task]);

  const getBackgroundColor = () => {
    switch (task?.status) {
      case "TO_DO":
        return "bg-gray-100";
      case "IN_PROGRESS":
        return "bg-blue-100";
      case "DONE":
        return "bg-green-200";
      default:
        return "bg-slate-100";
    }
  };

  return (
    <Draggable key={task._id} draggableId={task._id || ""} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 bg-slate-200 rounded-md shadow-sm mb-3 ${color}`}
        >
          <h3 className="font-semibold mt-2">{task.title}</h3>
          <p className="text-sm text-gray-500">{task.description}</p>
        </div>
      )}
    </Draggable>
  );
};

export default TodoCard;
