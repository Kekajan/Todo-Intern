import { Button } from "@/libs/components/button/button";
import Input from "@/libs/components/input/input";
import { useState } from "react";
import FormHandler from "react-form-buddy";
import { ITask } from "@/libs/types/task";
import { useTaskStore } from "@/store/task.store";

interface TaskFormProps {
  onClose: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
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

  const submitForm = () => {
    const newTask: ITask = {
      id: Math.floor(Math.random() * 10000),
      title: values.title,
      description: values.description,
    };

    setTasksAction([newTask]);
    console.log("Form submitted successfully!");
    onClose && onClose();
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
      <Input
        label="Description"
        name="description"
        placeholder="Enter task description"
        value={values.description || ""}
        onChange={handleChange}
        className="text-gray-900"
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
