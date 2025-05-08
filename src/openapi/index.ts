import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { registry } from './registry.js';

export function generateOpenApiDocument() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      title: 'My Hono API',
      version: '1.0.0',
      description: '使用Hono和Zod構建的模塊化API'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: '開發服務器'
      }
    ],
    tags: [
      { name: 'User', description: '用戶相關操作' },
      { name: 'Car', description: '汽車相關操作' }
    ]
  });
}