import React, { useState } from "react";

const AddTaskForm = ({ handleAddTask }) => {
  const [formData, setFormData] = useState({
    taskName: "",
    dimension: "",
    templateId: "",
    imageLayers: [],
    textLayers: "",
    amount: 0,
    genType: "random",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageLayers: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTask(formData);
    setFormData({
      taskName: "",
      dimension: "",
      templateId: "",
      imageLayers: [],
      textLayers: "",
      amount: 0,
      genType: "random",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="taskName"
        placeholder="Task Name"
        value={formData.taskName}
        onChange={handleChange}
        required
      />
      <select
        name="dimension"
        value={formData.dimension}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select dimension
        </option>
        <option value="1x1">1x1</option>
        <option value="9x16">9x16</option>
        <option value="16x9">16x9</option>
      </select>
      <input
        type="text"
        name="templateId"
        placeholder="Template ID"
        value={formData.templateId}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="imageLayers"
        onChange={handleFileChange}
        multiple
        required
      />
      <input
        type="text"
        name="textLayers"
        placeholder="Text"
        value={formData.textLayers}
        onChange={handleChange}
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <select
        name="genType"
        value={formData.genType}
        onChange={handleChange}
        required
      >
        <option value="random">Random</option>
        <option value="cyclic">Cyclic</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
