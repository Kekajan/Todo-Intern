"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/libs/components/button";
import Searchbar from "@/libs/components/searchbar/searchbar";
import TaskTable from "@/libs/components/taskTable/taskTable";
import Modal from "@/libs/components/modal/modal";
import { TaskForm } from "./_components";
import axios from "axios";

const Task = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const tasks = {
  //   todo: [
  //     {
  //       id: 1,
  //       title: "Brainstorming",
  //       description:
  //         "Brainstorming brings team members’ diverse experience into play.",
  //       comments: 12,
  //       files: 0,
  //     },
  //     {
  //       id: 2,
  //       title: "Research",
  //       description:
  //         "User research helps you to create an optimal product for users.",
  //       comments: 10,
  //       files: 3,
  //     },
  //     {
  //       id: 3,
  //       title: "Brainstorming",
  //       description:
  //         "Brainstorming brings team members’ diverse experience into play.",
  //       comments: 12,
  //       files: 0,
  //     },
  //     {
  //       id: 4,
  //       title: "Research",
  //       description:
  //         "User research helps you to create an optimal product for users.",
  //       comments: 10,
  //       files: 3,
  //     },
  //     {
  //       id: 13,
  //       title: "Research",
  //       description:
  //         "User research helps you to create an optimal product for users.",
  //       comments: 10,
  //       files: 3,
  //     },
  //   ],
  //   inProgress: [
  //     {
  //       id: 5,
  //       title: "Onboarding Illustrations",
  //       description: "Illustrations for the onboarding process.",
  //       comments: 14,
  //       files: 15,
  //     },
  //     {
  //       id: 6,
  //       title: "Onboarding Illustrations",
  //       description: "Illustrations for the onboarding process.",
  //       comments: 14,
  //       files: 15,
  //     },
  //     {
  //       id: 7,
  //       title: "Onboarding Illustrations",
  //       description: "Illustrations for the onboarding process.",
  //       comments: 14,
  //       files: 15,
  //     },
  //     {
  //       id: 8,
  //       title: "Onboarding Illustrations",
  //       description: "Illustrations for the onboarding process.",
  //       comments: 14,
  //       files: 15,
  //     },
  //     {
  //       id: 1,
  //       title: "Onboarding Illustrations",
  //       description: "Illustrations for the onboarding process.",
  //       comments: 14,
  //       files: 15,
  //     },
  //   ],
  //   done: [
  //     {
  //       id: 9,
  //       title: "Mobile App Design",
  //       description: "Completed mobile app design.",
  //       comments: 12,
  //       files: 15,
  //     },
  //     {
  //       id: 10,
  //       title: "Mobile App Design",
  //       description: "Completed mobile app design.",
  //       comments: 12,
  //       files: 15,
  //     },
  //     {
  //       id: 11,
  //       title: "Mobile App Design",
  //       description: "Completed mobile app design.",
  //       comments: 12,
  //       files: 15,
  //     },
  //     {
  //       id: 12,
  //       title: "Mobile App Design",
  //       description: "Completed mobile app design.",
  //       comments: 12,
  //       files: 15,
  //     },
  //   ],
  // };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/tasks"
        );
        setTasks(response.data);
        console.log("Updated tasks:", response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [setTasksAction]);

  console.log("tasksdsfsd:", tasks)

  // const onDragEnd = (result: any) => {
  //   if (!result.destination) return;

  //   const { source, destination } = result;

  //   if (source.droppableId === destination.droppableId && source.index === destination.index) {
  //     return;
  //   }

  //   const sourceColumn = source.droppableId;
  //   const destColumn = destination.droppableId;

  //   const [movedTask] = tasks[sourceColumn].splice(source.index, 1);

  //   tasks[destColumn].splice(destination.index, 0, movedTask);

  //   setTasks({
  //     ...tasks,
  //   });
  // };

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
        <TaskTable tasks={tasks} />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Task">
        <TaskForm onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default Task;

function setTasksAction(data: any) {
  throw new Error("Function not implemented.");
}
