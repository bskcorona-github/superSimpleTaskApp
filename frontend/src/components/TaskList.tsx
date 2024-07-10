import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { RootState } from '../store';
import { Task } from '../store/taskSlice';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <div className="p-4 bg-gray-100">
      {tasks.map((task: Task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
