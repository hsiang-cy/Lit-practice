import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { CarIdParamSchema, CarQuerySchema } from '../schemas/car.js';

// 創建汽車路由
export const carRoutes = new Hono();

// 使用標準Hono寫法 + zValidator
carRoutes.get('/:id',
  zValidator('param', CarIdParamSchema),
  zValidator('query', CarQuerySchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const { details } = c.req.valid('query');
    
    // 模擬查詢數據
    const car = {
      id,
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      color: 'Blue',
      features: details ? ['GPS', 'Leather Seats', 'Bluetooth', 'Backup Camera'] : undefined
    };
    
    return c.json(car);
  }
);
