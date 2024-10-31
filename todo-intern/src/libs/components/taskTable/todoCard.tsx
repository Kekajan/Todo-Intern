import { ITask } from "@/libs/types";
import { deleteTask, getTaskDetails } from "@/services";
import { useTaskStore } from "@/store/task.store";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

interface TodoCardProps {
  task: ITask;
  index: number;
}

const TodoCard: React.FC<TodoCardProps> = ({ task, index }) => {
  console.log(task.status);
  const [color, setColor] = useState("");
  useEffect(() => {
    setColor(getBackgroundColor());
  }, [task]);

  const { tasks, setTasksAction } = useTaskStore();

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

  const getCurrentTask = () => {
    getTaskDetails((res) => {
      if (res?.data) {
        setTasksAction(res.data);
      }
    });
  };

  const deleteMethod = () => {
    deleteTask(task._id ? task._id : "", (res: any) => {
      getCurrentTask();
    });
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
          <div className="flex flex-row justify-end">
            <button onClick={deleteMethod} className="text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#655d5d"
                  d="M7.616 20q-.691 0-1.153-.462T6 18.384V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zm2.192-3h1V8h-1zm3.384 0h1V8h-1z"
                />
              </svg>
            </button>
          </div>

          <h3 className="font-semibold mt-2 break-words">{task.title}</h3>
          <p className="text-sm text-gray-500 break-words">{task.description}</p>
        </div>
      )}
    </Draggable>
  );
};

export default TodoCard;
