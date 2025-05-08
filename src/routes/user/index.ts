import { Hono } from 'hono';
import { getUserOperator } from './getUser/operator.js';

// 創建用戶路由
export const userRoutes = new Hono();

// 註冊獲取用戶路由
userRoutes.get('/:id', getUserOperator);