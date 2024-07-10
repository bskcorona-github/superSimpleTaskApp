import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'new' | 'in-progress' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
}

export interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const newTask = { id: new Date().toISOString(), ...action.payload };
      state.tasks.push(newTask);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    }
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
