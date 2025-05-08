import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { TaskIdParamSchema, TaskQuerySchema } from '../schemas/task.js';

// 創建任務路由
export const taskRoutes = new Hono();

// 使用標準Hono寫法 + zValidator
taskRoutes.get('/:id',
  zValidator('param', TaskIdParamSchema),
  zValidator('query', TaskQuerySchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const { completed } = c.req.valid('query');
    
    // 模擬查詢數據
    const task = {
      id,
      title: 'Sample Task',
      description: 'This is a sample task description for testing',
      completed: completed !== undefined ? completed : false,
      dueDate: '2025-06-15',
      priority: 'medium'
    };
    
    return c.json(task);
  }
);
