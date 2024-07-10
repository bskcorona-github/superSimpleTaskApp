import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App p-8">
        <h1 className="text-3xl font-bold mb-4">タスク管理</h1>
        <TaskForm />
        <TaskList />
      </div>
    </Provider>
  );
};

export default App;
