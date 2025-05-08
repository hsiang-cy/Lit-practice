import { Hono } from 'hono';
import { swaggerUI } from '@hono/swagger-ui';
import { userRoutes } from './routes/user.js';
import { carRoutes } from './routes/car.js';
import { taskRoutes } from './routes/task.js';
import { fleetRoutes } from './routes/fleet.js';
import { generateOpenApiDocument } from './openapi/index.js';

// 創建Hono應用
const app = new Hono();

// 添加路由
app.route('/user', userRoutes);
app.route('/car', carRoutes);
app.route('/task', taskRoutes);
app.route('/fleet', fleetRoutes);

// 提供OpenAPI JSON
app.get('/openapi.json', (c) => {
  return c.json(generateOpenApiDocument());
});

// 提供Stoplight Elements UI
app.get('/api-docs', async (c) => {
  const stoplightHTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>API Documentation</title>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
      <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css">
      <style>
        body {
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    <body>
      <elements-api apiDescriptionUrl="/openapi.json" router="hash" layout="sidebar"></elements-api>
    </body>
  </html>
  `;
  return c.html(stoplightHTML);
});


// 啟動服務器
export default {
  port: 3000,
  fetch: app.fetch
};

// 直接輸出日誌
console.log('API Documentation available at http://localhost:3000/api-docs#/paths/user-id/get');
