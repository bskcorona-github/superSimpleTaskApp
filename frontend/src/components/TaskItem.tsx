import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Task, updateTask, deleteTask } from '../store/taskSlice';
import { Card, CardContent, Typography, Chip, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task>(task);

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleEdit = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    dispatch(updateTask(editTask));
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setEditTask({ ...editTask, [name as string]: value });
  };

  return (
    <Card className="mb-4 flex items-center">
      <CardContent className="flex-1">
        <Typography variant="h5" component="div">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
        <div className="flex items-center space-x-2 mt-2">
          <Chip label={task.status} color="primary" />
          <Chip label={task.priority} color="secondary" />
          <Chip label={task.assignee} />
          <Chip label={task.dueDate} />
    
            <Button variant="contained" color="primary" onClick={handleEdit}>編集</Button>
            <Button variant="contained" color="secondary" onClick={handleDelete}>削除</Button>
         
        </div>
      </CardContent>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>タスクを編集</DialogTitle>
        <DialogContent>
          <DialogContentText>
            タスクの詳細を編集してください。
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="タイトル"
            name="title"
            value={editTask.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="詳細"
            name="description"
            value={editTask.description}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>ステータス</InputLabel>
            <Select
              name="status"
              value={editTask.status}
              onChange={handleChange}
            >
              <MenuItem value="new">新規</MenuItem>
              <MenuItem value="in-progress">進行中</MenuItem>
              <MenuItem value="completed">完了</MenuItem>
              <MenuItem value="on-hold">保留</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>優先度</InputLabel>
            <Select
              name="priority"
              value={editTask.priority}
              onChange={handleChange}
            >
              <MenuItem value="low">低</MenuItem>
              <MenuItem value="medium">中</MenuItem>
              <MenuItem value="high">高</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="担当者"
            name="assignee"
            value={editTask.assignee}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="締め切り"
            type="date"
            name="dueDate"
            value={editTask.dueDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleSave} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default TaskItem;
