// import React, { useState } from "react";
// import Input from "@/libs/components/input/input";
// import { Button } from "@/libs/components/button/button";





// const TaskForm = ({onSubmit, onCancel}) => {
//   const [taskData, setTaskData] = useState({ title: "", description: "" });

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setTaskData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     onSubmit(taskData);
//     setTaskData({ title: "", description: "" });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <Input
//         label="Title"
//         name="title"
//         placeholder="Enter task title"
//         value={taskData.title}
//         onChange={handleChange}
//         className="text-gray-900"
//       />
//       <Input
//         label="Description"
//         name="description"
//         placeholder="Enter task description"
//         value={taskData.description}
//         onChange={handleChange}
//         className="text-gray-900"
//       />
//       <div className="flex justify-end gap-x-4 mt-4">
//         <Button text="Add task" variant="primary" onClick={handleSubmit}/>
//         <Button text="Cancel" variant="primary" onClick={onCancel}/>
//       </div>
//     </form>
//   );
// };

// export default TaskForm;

import { Button } from "@/libs/components/button/button";
import Input from "@/libs/components/input/input";
import { useState } from "react";
import FormHandler from 'react-form-buddy';

interface TaskFormProps{
  onClose:()=>void
}

export const TaskForm:React.FC<TaskFormProps> = ({onClose}) => {
    const [taskData, setTaskData] = useState({ title: "", description: "" });

    const validate = (values:any) => {
        let errors:any = {};
        if (!values.title) {
            errors.title = "title is required";
        }
        if (!values.description) {
          errors.description = "description is required";
      }
        return errors;
    };

    const submitForm = () => {
        console.log("Form submitted successfully!");
    };
  
    const { handleChange, handleSubmit, values, errors } = FormHandler(submitForm, validate);
  
   

    console.log(values)
    console.log(errors)
  
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
        <div className="flex justify-end gap-x-4 mt-4">
          <Button text="Add task" variant="primary" onClick={()=>handleSubmit}/>
          <Button text="Cancel" variant="secondary" onClick={()=>{onClose && onClose()}} />
        </div>
      </form>
    );
  };
  
