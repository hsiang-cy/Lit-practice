import { Context } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { CarIdParamSchema, CarQuerySchema } from './schema.js';

// 修改為直接函數而不是數組，解決類型問題
export const getOneCarOperator = async (c: Context) => {
  const id = c.req.param('id');  // 使用c.req.param而不是c.req.valid
  const query = c.req.query();
  const details = query.details === 'true';

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
};