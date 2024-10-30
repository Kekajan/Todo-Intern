import React from "react";

interface TaskColumnProps {
  title: string;
  tasks: any;
  color: "orange" | "purple" | "green";
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, color }) => {
  const colorClass = {
    // blue: "text-blue-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
    green: "text-green-500",
  };

  return (
    <div className="w-full md:w-1/3 p-2">
      <div
        className={`border rounded-md p-4 border-${color}-500 bg-white shadow-lg`}
      >
        <h2
          className={`${colorClass[color]} font-bold text-xl mb-3 flex justify-center`}
        >
          {title}
        </h2>
        <div className="space-y-4">
          {tasks?.length > 0 && tasks.map((task: any) => (
            <div key={task._id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="font-semibold mt-2">{task.title}</h3>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TaskTable: React.FC<any> = ({ tasks }) => (
  <div className="flex flex-wrap -mx-2">
    <TaskColumn title="To Do" tasks={tasks?.filter((e:any)=> e.status === "TO_DO")} color="orange" />
    <TaskColumn title="On Progress" tasks={tasks?.filter((e:any)=> e.status === "IN_PROGRESS")} color="purple" />
    <TaskColumn title="Done" tasks={tasks?.filter((e:any)=> e.status === "DONE")} color="green" />
  </div>
);

export default TaskTable;

// import React from "react";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DroppableProvided,
//   DraggableProvided,
// } from "react-beautiful-dnd";

// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   comments: number;
//   files: number;
// }

// interface TaskColumnProps {
//   title: string;
//   tasks: Task[];
//   color: "orange" | "purple" | "green";
// }

// const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, color }) => {
//   const colorClass = {
//     purple: "text-purple-500",
//     orange: "text-orange-500",
//     green: "text-green-500",
//   };

//   return (
//     <Droppable droppableId={title}>
//       {(provided: DroppableProvided) => (
//         <div
//           className="w-full md:w-1/3 p-2"
//           ref={provided.innerRef}
//           {...provided.droppableProps}
//         >
//           <div
//             className={`border rounded-md p-4 border-${color}-500 bg-white shadow-lg`}
//           >
//             <h2
//               className={`${colorClass[color]} font-bold text-xl mb-3 flex justify-center`}
//             >
//               {title}
//             </h2>
//             <div className="space-y-4">
//               {tasks.map((task, index) => (
//                 <Draggable
//                   key={task.id}
//                   draggableId={String(task.id)}
//                   index={index}
//                 >
//                   {(provided: Draggable) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className="p-4 bg-gray-100 rounded-lg shadow-sm"
//                     >
//                       <h3 className="font-semibold mt-2">{task.title}</h3>
//                       <p className="text-sm text-gray-500">
//                         {task.description}
//                       </p>
//                       <div className="flex items-center mt-3 space-x-4 text-gray-400 text-xs">
//                         <div className="flex items-center">
//                           <span>{task.comments} comments</span>
//                         </div>
//                         <div className="flex items-center">
//                           <span>{task.files} files</span>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           </div>
//         </div>
//       )}
//     </Droppable>
//   );
// };

// type TaskTableProps = {
//   tasks: {
//     todo: Task[];
//     inProgress: Task[];
//     done: Task[];
//   };
//   onDragEnd: (result: any) => void;
// };

// const TaskTable: React.FC<TaskTableProps> = ({ tasks, onDragEnd }) => (
//   <DragDropContext onDragEnd={onDragEnd}>
//     <div className="flex flex-wrap -mx-2">
//       <TaskColumn title="To Do" tasks={tasks.todo} color="orange" />
//       <TaskColumn title="On Progress" tasks={tasks.inProgress} color="purple" />
//       <TaskColumn title="Done" tasks={tasks.done} color="green" />
//     </div>
//   </DragDropContext>
// );

// export default TaskTable;
