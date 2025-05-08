import { Context } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { CarListQuerySchema } from './schema.js';

// 修改為直接函數而不是數組，解決類型問題
export const getManyCarOperator = async (c: Context) => {
  const query = c.req.query();
  const limit = query.limit ? parseInt(query.limit, 10) : 10;
  const make = query.make;
  
  // 模擬查詢數據
  const cars = [
    {
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      color: 'Blue'
    },
    {
      id: '2',
      make: 'Honda',
      model: 'Accord',
      year: 2023,
      color: 'Red'
    },
    {
      id: '3',
      make: 'Toyota',
      model: 'Corolla',
      year: 2021,
      color: 'White'
    }
  ];
  
  // 篩選製造商（如果提供了make參數）
  const filteredCars = make 
    ? cars.filter(car => car.make.toLowerCase() === make.toLowerCase())
    : cars;
  
  // 限制結果數量
  const limitedCars = filteredCars.slice(0, limit);
  
  return c.json({
    cars: limitedCars,
    total: filteredCars.length,
    page: 1
  });
};