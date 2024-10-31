import React, { useEffect, useState } from "react";
import { Button } from "@/libs/components/button/button";
import Input from "@/libs/components/input/input";
import FormHandler from "react-form-buddy";
import { useTaskStore } from "@/store/task.store";
import axios from "axios";
import { addTask } from "@/services";

interface TaskFormProps {
  onClose: () => void;
  refreshTasks: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onClose,
  refreshTasks,
}) => {
  const [taskData, setTaskData] = useState({ title: "", description: "" });

  const { tasks, setTasksAction } = useTaskStore();

  console.log("tasks", tasks);

  const validate = (values: any) => {
    let errors: any = {};
    if (!values.title) {
      errors.title = "title is required";
    }
    if (!values.description) {
      errors.description = "description is required";
    }
    return errors;
  };



  const submitForm = async () => {
    const newTask = {
      title: values.title,
      description: values.description,
    };
  
    await addTask(newTask, (response) => {
      if (response.status === 201 && response.data) {
        setTasksAction([...tasks, response.data]);
        console.log("Form submitted successfully!", response.data);
        refreshTasks(); 
        onClose(); 
      } else {
        console.error("Error creating task:", response.statusText);
      }
    });
  };

  const { handleChange, handleSubmit, values, errors } = FormHandler(
    submitForm,
    validate
  );

  console.log("Values:", values);
  console.log("Errors:", errors);
  console.log("tasks keka", tasks);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        name="title"
        placeholder="Enter task title"
        value={values.title || ""}
        onChange={handleChange}
        className="text-gray-900"
      />
      <div className="text-red-500">{errors.title}</div>    
      <label className="block text-sm font-medium text-gray-700">
        Description
      </label>
      <textarea
        name="description"
        placeholder="Enter task description"
        value={values.description || ""}
        onChange={handleChange}
        className="text-gray-900 mt-1 block w-full rounded-md border-gray-50 shadow-sm focus:border-indigo-50 focus:ring-indigo-50 sm:text-sm p-2"
      />
      <div className="text-red-500">{errors.description}</div>
      <div className="flex justify-end gap-x-4 mt-64">
        <Button
          text="Cancel"
          variant="secondary"
          onClick={() => {
            onClose && onClose();
          }}
        />
        <Button
          text="Add task"
          variant="primary"
          onClick={() => handleSubmit}
        />
      </div>
    </form>
  );
};
