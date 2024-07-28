import React, { useState } from "react";
import "./TaskCard.css";

const TaskCard = ({ task, onClose }) => {
  const [currentTask, setCurrentTask] = useState({
    ...task,
    imageRefs: task.imageRefs || "",
    similarity: task.similarity || "",
    crop: task.crop || "",
    dimension: task.dimension || "",
    angles: task.angles || "",
    shots: task.shots || "",
    style: task.style || "ultra_realistic",
    manualPrompts: task.manualPrompts || "",
    generatesPerRef: task.generatesPerRef || 1,
    imageFiles: [], // Добавим новое поле для файлов
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const handleFileChange = (e) => {
    setCurrentTask({ ...currentTask, imageFiles: Array.from(e.target.files) });
  };

  const generateImage = async () => {
    const imageData = {
      images: currentTask.imageRefs
        ? currentTask.imageRefs.split(",").map((ref) => ref.trim())
        : [],
      similarity: currentTask.similarity || "",
      crop: currentTask.crop || "",
      dimension: currentTask.dimension || "",
      angles: currentTask.angles || "",
      shots: currentTask.shots || "",
      style: currentTask.style || "ultra_realistic",
      manual_prompts: currentTask.manualPrompts || "",
      gen_per_ref: Number(currentTask.generatesPerRef) || 1,
    };

    console.log("Sending imageData:", imageData);

    try {
      const response = await fetch(
        "https://fasteasy-jvqis72guq-lm.a.run.app/tz-front/generate_images",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("renesandro:qwerty1234"),
          },
          body: JSON.stringify(imageData),
        }
      );
      const data = await response.json();
      console.log("Generated image:", data);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <div className="task-card-container">
      <div className="task-card">
        <h2>{currentTask.name}</h2>
        <select
          name="dimension"
          value={currentTask.dimension}
          onChange={handleChange}
        >
          <option value="1x1">1x1</option>
          <option value="9x16">9x16</option>
          <option value="16x9">16x9</option>
        </select>
        <select name="flow" value={currentTask.flow} onChange={handleChange}>
          <option value="other_models_mix">Other Models Mix</option>
          <option value="mj_model">MJ Model</option>
        </select>
        <input
          name="imageRefs"
          placeholder="Image Refs"
          value={currentTask.imageRefs}
          onChange={handleChange}
        />
        <input type="file" multiple onChange={handleFileChange} />
        <input
          name="manualPrompts"
          placeholder="Manual Prompts"
          value={currentTask.manualPrompts}
          onChange={handleChange}
        />
        <input
          name="generatesPerRef"
          type="number"
          placeholder="Generates Per Ref"
          value={currentTask.generatesPerRef}
          onChange={handleChange}
        />
        <select name="style" value={currentTask.style} onChange={handleChange}>
          <option value="ultra_realistic">Ultra Realistic</option>
          <option value="anime">Anime</option>
        </select>
        <button onClick={generateImage}>Generate Image</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskCard;
