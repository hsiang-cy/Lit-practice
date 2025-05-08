// 首先導入registry
import { registry } from './openapi/registry.js';

// 然後導入所有schema，確保它們在generateOpenApiDocument調用前註冊
import './routes/car/getOneCar/schema.js';
import './routes/car/getManyCar/schema.js';
import './routes/user/getUser/schema.js';

// 之後再導入其他模塊
import { Hono } from 'hono';
import { routes } from './routes/index.js';
import { generateOpenApiDocument } from './openapi/index.js';
// 創建Hono應用
const app = new Hono();

// 添加主路由
app.route('/', routes);

// 提供OpenAPI JSON
app.get('/openapi.json', (c) => {
  return c.json(generateOpenApiDocument());
});

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
          height: 100vh;
        }
        elements-api {
          height: 100vh;
          width: 100%;
          display: block;
        }
      </style>
    </head>
    <body>
      <elements-api
        apiDescriptionUrl="/openapi.json"
        router="hash" 
        layout="sidebar"
      ></elements-api>
    </body>
  </html>
  `;
  return c.html(stoplightHTML);
});

app.get('/openapi.json', (c) => {
  const doc = generateOpenApiDocument();
  console.log('OpenAPI document paths:', Object.keys(doc.paths || {}).length);
  console.log('OpenAPI document tags:', (doc.tags || []).length);
  return c.json(doc);
});

// 啟動服務器
export default {
  port: 3000,
  fetch: app.fetch
};

// 直接輸出日誌
console.log('API Documentation available at http://localhost:3000/api-docs');