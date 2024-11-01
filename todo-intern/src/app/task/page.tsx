"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/libs/components/button";
import TaskTable from "@/libs/components/taskTable/taskTable";
import Modal from "@/libs/components/modal/modal";
import { TaskForm } from "./_components";
import { useTaskStore } from "@/store/task.store";
import { getTaskDetails } from "@/services";

const Task = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {tasks,setTasksAction}=useTaskStore()
  const [taskUpdated, setTaskUpdated] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const refreshTasks = () => setTaskUpdated((prev) => !prev);

  useEffect(() => {
    getTaskDetails((res) => {
      if (res?.data) {
        setTasksAction(res.data);
        console.log(res.data, "Fetched Movie Data");
      } else {
        console.error("Failed to fetch movies:", res.statusText);
      }
    });
  }, [ taskUpdated]);


  return (
    <div className="container mx-auto h-screen">
      <div className="flex justify-center pt-6">
        <div className="text-3xl font-bold">Tasks</div>
      </div>
      <div className="flex justify-end mt-6">
        {/* <Searchbar searchText={searchText} setSearchText={setSearchText} /> */}
        <Button text="Add task" variant="primary" onClick={openModal} />
      </div>
      <div className="pt-12 h-80">
        <TaskTable
          tasks={tasks}
          setTasks={function (tasks): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Task">
        <TaskForm onClose={closeModal} refreshTasks={refreshTasks} />
      </Modal>
    </div>
  );
};

export default Task;

function setTasksAction(data: any) {
  throw new Error("Function not implemented.");
}
