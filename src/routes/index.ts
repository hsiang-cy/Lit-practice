import { Hono } from 'hono';
import { carRoutes } from './car/index.js';
import { userRoutes } from './user/index.js';

// 創建主路由
export const routes = new Hono();

// 註冊各個模塊路由
routes.route('/car', carRoutes);
routes.route('/user', userRoutes);