import { Hono } from 'hono';
import { getOneCarOperator } from './getOneCar/operator.js';
import { getManyCarOperator } from './getManyCar/operator.js';

// 創建汽車路由
export const carRoutes = new Hono();

// 註冊獲取單個汽車路由
carRoutes.get('/:id', getOneCarOperator);

// 註冊獲取多個汽車路由
carRoutes.get('/', getManyCarOperator);