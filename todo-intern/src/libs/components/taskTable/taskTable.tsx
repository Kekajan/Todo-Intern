// import React, { useEffect, useState } from "react";
// import { DragDropContext, Droppable } from "react-beautiful-dnd";
// import axios from "axios";
// import TodoCard from "./todoCard";

// interface Task {
//   _id: string;
//   title: string;
//   description: string;
//   status: "TO_DO" | "IN_PROGRESS" | "DONE";
// }

// interface TaskColumnProps {
//   title: string;
//   tasks: Task[];
//   color: "orange" | "purple" | "green";
// }

// interface Column {
//   id: string;
//   title: string;
//   tasks: Task[];
// }

// const TaskTable: React.FC<{
//   tasks: Task[];
//   setTasks: (tasks: Task[]) => void;
// }> = ({ tasks, setTasks }) => {
//   const [isClient, setIsClient] = useState(false);
//   const [data, setData] = useState<any>({});
//   const [columns, setColumns] = useState<any>([]);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   function convertTaskIntoDropdown(tasksArray: any) {
//     let data = tasksArray.map((item: any) => ({
//       id: item._id.toString(),
//       ...item,
//     }));
//     const task = data.reduce((acc: any, task: any) => {
//       acc[task.id] = task;
//       return acc;
//     }, {});

//     let initialData = {
//       tasks: task,
//       columns: {
//         TO_DO: {
//           id: "TO_DO",
//           title: "To do",
//           taskIds: filterTaskIdByStatus("TO_DO", data),
//         },
//         IN_PROGRESS: {
//           id: "IN_PROGRESS",
//           title: "Progress",
//           taskIds: filterTaskIdByStatus("IN_PROGRESS", data),
//         },
//         DONE: {
//           id: "DONE",
//           title: "Completed",
//           taskIds: filterTaskIdByStatus("DONE", data),
//         },
//       },
//       columnOrder: ["TO_DO", "IN_PROGRESS", "DONE"],
//     };
//     setData(initialData);
//   }

//   useEffect(() => {
//     convertTaskIntoDropdown(tasks);
//   }, [tasks]);

//   const onDragEnd = async (result: any) => {
//     const { source, destination, draggableId } = result;
//     console.log("result", result);

//     if (
//       !destination ||
//       (source.droppableId === destination.droppableId &&
//         source.index === destination.index)
//     ) {
//       return;
//     }

//     const startColumn = data.columns[source.droppableId];
//     const finishColumn = data.columns[destination.droppableId];

//     if (startColumn === finishColumn) {
//       const newTaskIds = Array.from(startColumn.taskIds);
//       newTaskIds.splice(source.index, 1);
//       newTaskIds.splice(destination.index, 0, draggableId);

//       const newColumn = {
//         ...startColumn,
//         taskIds: newTaskIds,
//       };

//       const newState = {
//         ...data,
//         columns: {
//           ...data.columns,
//           [newColumn.id]: newColumn,
//         },
//       };

//       setData(newState);
//     } else {
//       const startTaskIds = Array.from(startColumn.taskIds);
//       startTaskIds.splice(source.index, 1);
//       const newStartColumn = {
//         ...startColumn,
//         taskIds: startTaskIds,
//       };

//       const finishTaskIds = Array.from(finishColumn.taskIds);
//       finishTaskIds.splice(destination.index, 0, draggableId);
//       const newFinishColumn = {
//         ...finishColumn,
//         taskIds: finishTaskIds,
//       };

//       const newState = {
//         ...data,
//         columns: {
//           ...data.columns,
//           [newStartColumn.id]: newStartColumn,
//           [newFinishColumn.id]: newFinishColumn,
//         },
//       };

//       setData(newState);
//     }

//     const status = destination.droppableId;
//     const taskId = draggableId;

//     try {
//       await axios.put(`http://localhost:5000/api/task/${taskId}`, { status });
//       console.log(`Updated task ${taskId} to status ${status}`);
//     } catch (error) {
//       console.error("Error updating task status:", error);
//     }
//   };

//   function filterTaskIdByStatus(status: any, tasks: any) {
//     return tasks
//       .filter((task: any) => task.status === status)
//       .map((task: any) => task._id);
//   }

//   const colorClass = {
//     // blue: "text-blue-500",
//     purple: "text-purple-500",
//     orange: "text-orange-500",
//     green: "text-green-500",
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div className="flex space-x-4 p-4">
//         {data?.columnOrder?.map((columnId: any) => {
//           const column = data.columns[columnId];
//           console.log(columnId, "collllllllllllll");
//           const tasks = column?.taskIds?.map(
//             (taskId: any) => data.tasks[taskId]
//           );

//           return (
//             <Droppable
//               key={columnId}
//               droppableId={columnId}
//               isDropDisabled={false}
//               isCombineEnabled={false}
//               ignoreContainerClipping={false}
//             >
//               {(provided) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                   className="d-flex flex-column align-items-center m-3 p-4 bg-blue-500 rounded-3 overflow-scroll overflow-x-hidden custom-scrollbar"
//                 >
//                   <div className="d-flex justify-content-between align-items-center w-100">
//                     <div>
//                       <h4>{column.title}</h4>
//                     </div>
//                   </div>
//                   <div className="d-flex mt-4 flex-column justify-content-center gap-4">
//                     {tasks?.map((task: any, index: any) => (
//                       <div key={index}>
//                         <TodoCard task={task} index={index} />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </Droppable>
//           );
//         })}
//       </div>
//     </DragDropContext>
//   );
// };

// export default TaskTable;

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import axios from "axios";
import TodoCard from "./todoCard";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "TO_DO" | "IN_PROGRESS" | "DONE";
}

const TaskTable: React.FC<{
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
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

    try {
      await axios.put(`http://localhost:5000/api/task/${taskId}`, { status });
      console.log(`Updated task ${taskId} to status ${status}`);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  function filterTaskIdByStatus(status: any, tasks: any) {
    return tasks
      .filter((task: any) => task.status === status)
      .map((task: any) => task._id);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 p-4">
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
                  className="w-full md:w-1/3 items-center m-3 p-5 px-10 bg-gray-100 rounded-lg overflow-auto max-h-screen"
                >
                  {/* <div className="w-full flex justify-between items-center">
                    <h4 className={`text-lg font-bold`}>{column.title}</h4>
                  </div> */}
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
