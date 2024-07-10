import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, Task } from '../store/taskSlice';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Task['status']>('new');
  const [priority, setPriority] = useState<Task['priority']>('low');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTask({ title, description, status, priority, assignee, dueDate }));
    setTitle('');
    setDescription('');
    setStatus('new');
    setPriority('low');
    setAssignee('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md space-y-4" style={{ maxWidth: '500px', margin: '0' }}>
      <TextField
        label="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        style={{ marginTop: '10px', marginBottom: '10px' }}
      />
      <TextField
        label="詳細"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        style={{ marginTop: '10px', marginBottom: '10px' }}
      />
      <FormControl fullWidth margin="normal" style={{ marginTop: '10px', marginBottom: '10px' }}>
        <InputLabel>ステータス</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as Task['status'])}
        >
          <MenuItem value="new">新規</MenuItem>
          <MenuItem value="in-progress">進行中</MenuItem>
          <MenuItem value="completed">完了</MenuItem>
          <MenuItem value="on-hold">保留</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" style={{ marginTop: '10px', marginBottom: '10px' }}>
        <InputLabel>優先度</InputLabel>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task['priority'])}
        >
          <MenuItem value="low">低</MenuItem>
          <MenuItem value="medium">中</MenuItem>
          <MenuItem value="high">高</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="担当者"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
        fullWidth
        margin="normal"
        style={{ marginTop: '10px', marginBottom: '10px' }}
      />
      <TextField
        label="締め切り"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginTop: '10px', marginBottom: '10px' }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '10px', marginBottom: '10px' }}>
        タスクを追加
      </Button>
    </form>
  );
};

export default TaskForm;
