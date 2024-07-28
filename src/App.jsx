import React, { useState } from "react";
import TasksTable from "./components/TasksTable";
import AddTaskForm from "./components/AddTaskForm";
import TaskCard from "./components/TaskCard";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = async (newTask) => {
    const imageFiles = newTask.imageLayers;
    const imageLayers = [];

    for (const file of imageFiles) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        imageLayers.push(reader.result);

        if (imageLayers.length === imageFiles.length) {
          const taskData = {
            task_name: newTask.taskName,
            dimension: newTask.dimension,
            template_id: newTask.templateId,
            amount: parseInt(newTask.amount, 10),
            gen_type: newTask.genType,
            image_layers: imageLayers,
            text_layers: newTask.textLayers
              ? newTask.textLayers.split(",").map((ref) => ref.trim())
              : [],
          };

          fetch(
            "https://fasteasy-jvqis72guq-lm.a.run.app/tz-front/generate_formats",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + btoa("renesandro:qwerty1234"),
              },
              body: JSON.stringify(taskData),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              console.log("Server response:", data);
              setTasks([
                ...tasks,
                { ...newTask, id: tasks.length + 1, imageLayers },
              ]);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      };
    }
  };

  const handleGenerate = (taskId) => {
    // Логика генерации
  };

  const handleViewAds = (taskId) => {
    // Логика просмотра объявлений
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseTaskCard = () => {
    setSelectedTask(null);
  };

  return (
    <div className="container">
      {selectedTask ? (
        <TaskCard task={selectedTask} onClose={handleCloseTaskCard} />
      ) : (
        <>
          <div className="tasks-container">
            <TasksTable
              tasks={tasks}
              handleGenerate={handleGenerate}
              handleViewAds={handleViewAds}
              onTaskClick={handleTaskClick}
            />
          </div>
          <div className="form-container">
            <AddTaskForm handleAddTask={handleAddTask} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
