import React from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  comments: number;
  files: number;
}

interface TaskColumnProps {
  title: string;
  tasks: Task[];
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
          {tasks.map((task) => (
            <div key={task.id} className="p-4 bg-gray-200 rounded-lg shadow-sm">
              <h3 className="font-semibold mt-2">{task.title}</h3>
              <p className="text-sm text-gray-500">{task.description}</p>
              <div className="flex items-center mt-3 space-x-4 text-gray-400 text-xs">
                <div className="flex items-center">
                  <span>{task.comments} comments</span>
                </div>
                <div className="flex items-center">
                  <span>{task.files} files</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

type TaskTableProps = {
  tasks: {
    todo: Task[];
    inProgress: Task[];
    done: Task[];
  };
};

const TaskTable: React.FC<TaskTableProps> = ({ tasks }) => (
  <div className="flex flex-wrap -mx-2">
    <TaskColumn title="To Do" tasks={tasks.todo} color="orange" />
    <TaskColumn title="On Progress" tasks={tasks.inProgress} color="purple" />
    <TaskColumn title="Done" tasks={tasks.done} color="green" />
  </div>
);

export default TaskTable;
