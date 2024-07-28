import React from 'react';

const TasksTable = ({ tasks, handleGenerate, handleViewAds, onTaskClick }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Dimension</th>
            <th>Template ID</th>
            <th>Images</th>
            <th>Text</th>
            <th>Amount</th>
            <th>Gen type</th>
            <th>Gen_tasks</th>
            <th>Result Ads</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} onClick={() => onTaskClick(task)}>
              <td>{task.taskName}</td>
              <td>{task.dimension}</td>
              <td>{task.templateId}</td>
              <td>
                {task.imageLayers && Array.from(task.imageLayers).map((image, index) => (
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    style={{ width: '50px', height: '50px', marginRight: '5px' }}
                  />
                ))}
              </td>
              <td>{task.textLayers}</td>
              <td>{task.amount}</td>
              <td>{task.genType}</td>
              <td>
                <button onClick={() => handleGenerate(task.id)}>Generate</button>
              </td>
              <td>
                <button onClick={() => handleViewAds(task.id)}>View Ads</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
