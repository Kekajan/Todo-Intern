

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import axios from "axios";
import TodoCard from "./todoCard";
import { ITask } from "@/libs/types";
import { updateTask } from "@/services";


const TaskTable: React.FC<{
  tasks: ITask[];
  setTasks: (tasks: ITask[]) => void;
}> = ({ tasks, setTasks }) => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    convertTaskIntoDropdown(tasks);
  }, [tasks]);

  function convertTaskIntoDropdown(tasksArray: any) {
    let data = tasksArray.map((item: any) => ({
      id: item._id.toString(),
      ...item,
    }));
    const task = data.reduce((acc: any, task: any) => {
      acc[task.id] = task;
      return acc;
    }, {});

    const initialData = {
      tasks: task,
      columns: {
        TO_DO: {
          id: "TO_DO",
          title: "To do",
          taskIds: filterTaskIdByStatus("TO_DO", data),
        },
        IN_PROGRESS: {
          id: "IN_PROGRESS",
          title: "In Progress",
          taskIds: filterTaskIdByStatus("IN_PROGRESS", data),
        },
        DONE: {
          id: "DONE",
          title: "Completed",
          taskIds: filterTaskIdByStatus("DONE", data),
        },
      },
      columnOrder: ["TO_DO", "IN_PROGRESS", "DONE"],
    };
    setData(initialData);
  }

  const onDragEnd = async (result: any) => {
    const { source, destination, draggableId } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
    } else {
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);

      const newStartColumn = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finishColumn.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);

      const newFinishColumn = {
        ...finishColumn,
        taskIds: finishTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        },
      });
    }

    const status = destination.droppableId;
    const taskId = draggableId;
    const statusData:any = {
      status: status
    }

    updateTask(taskId,statusData,(res:any)=>{

    })

    // try {
    //   await axios.put(`http://localhost:5000/api/task/${taskId}`, { status });
    //   console.log(`Updated task ${taskId} to status ${status}`);
    // } catch (error) {
    //   console.error("Error updating task status:", error);
    // }
  };

  function filterTaskIdByStatus(status: any, tasks: any) {
    return tasks
      .filter((task: any) => task.status === status)
      .map((task: any) => task._id);
  }


  console.log("vdfgd", tasks)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 p-4 min-w-96 overflow-scroll">
        {data?.columnOrder?.map((columnId: any) => {
          const column = data.columns[columnId];
          const tasks = column?.taskIds?.map(
            (taskId: any) => data.tasks[taskId]
          );

          return (
            <Droppable
              key={columnId}
              droppableId={columnId}
              isDropDisabled={false}
              isCombineEnabled={false}
              ignoreContainerClipping={false}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-full md:w-1/3 items-center m-3 p-5 px-10 bg-gray-100 rounded-lg overflow-auto max-h-screen w-screen overflow-scroll"
                >
        
                  <div className="w-full flex justify-between items-center">
                    <h4
                      className={`flex justify-center w-full text-lg font-bold ${
                        column.title === "To do"
                          ? "text-sky-600"
                          : column.title === "In Progress"
                          ? "text-orange-600"
                          : column.title === "Completed"
                          ? "text-green-600"
                          : ""
                      } font-bold text-xl`}
                    >
                      {column.title}
                    </h4>
                  </div>
                  <div className="flex flex-col mt-4 space-y-4">
                    {tasks?.map((task: any, index: any) => (
                      <div key={task._id}>
                        <TodoCard task={task} index={index} />
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default TaskTable;
