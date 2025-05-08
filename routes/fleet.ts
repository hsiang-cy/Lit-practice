import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { FleetIdParamSchema, FleetQuerySchema } from '../schemas/fleet.js';

// 創建車隊路由
export const fleetRoutes = new Hono();

// 使用標準Hono寫法 + zValidator
fleetRoutes.get('/:id',
  zValidator('param', FleetIdParamSchema),
  zValidator('query', FleetQuerySchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const { active } = c.req.valid('query');
    
    // 模擬查詢數據
    const fleet = {
      id,
      name: 'Fleet ' + id,
      description: 'A sample fleet of vehicles for demonstration',
      carCount: 15,
      location: 'Taichung',
      active: active !== undefined ? active : true,
      cars: active ? ['1001', '1002', '1003', '1004', '1005'] : undefined
    };
    
    return c.json(fleet);
  }
);
