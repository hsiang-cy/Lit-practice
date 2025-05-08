import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { UserIdParamSchema, UserQuerySchema } from '../schemas/user.js';

// 創建用戶路由
export const userRoutes = new Hono();

// 使用標準Hono寫法 + zValidator
userRoutes.get('/:id',
  zValidator('param', UserIdParamSchema),
  zValidator('query', UserQuerySchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const { verbose } = c.req.valid('query');
    
    // 模擬查詢數據
    const user = {
      id,
      name: 'Sample User',
      age: 30,
      detail: verbose ? 'This is a verbose detail about user.' : undefined,
    };
    
    return c.json(user);
  }
);