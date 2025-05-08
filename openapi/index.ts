import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { userSchemas } from '../schemas/user.js';
import { carSchemas } from '../schemas/car.js';
import { taskSchemas } from '../schemas/task.js';
import { fleetSchemas } from '../schemas/fleet.js';

// 創建OpenAPI註冊表
export const registry = new OpenAPIRegistry();

// 為模式註冊引用
const UserResponseRef = registry.register('UserResponse', userSchemas.response);
const CarResponseRef = registry.register('CarResponse', carSchemas.response);
const TaskResponseRef = registry.register('TaskResponse', taskSchemas.response);
const FleetResponseRef = registry.register('FleetResponse', fleetSchemas.response);

// 註冊用戶路由的OpenAPI定義
registry.registerPath({
  method: 'get',
  path: '/user/{id}',
  summary: '獲取用戶信息',
  description: '根據ID獲取用戶的基本信息，可以通過verbose參數獲取詳細信息',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
        pattern: '^\\d+$'
      }
    },
    {
      name: 'verbose',
      in: 'query',
      required: false,
      schema: {
        type: 'string'
      }
    }
  ],
  responses: {
    200: {
      description: '用戶信息',
      content: {
        'application/json': {
          schema: UserResponseRef
        }
      }
    },
    400: {
      description: '請求參數錯誤'
    },
    404: {
      description: '用戶不存在'
    }
  },
  tags: ['User']
});

// 註冊汽車路由的OpenAPI定義
registry.registerPath({
  method: 'get',
  path: '/car/{id}',
  summary: '獲取汽車信息',
  description: '根據ID獲取汽車的基本信息，可以通過details參數獲取詳細功能',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
        pattern: '^\\d+$'
      }
    },
    {
      name: 'details',
      in: 'query',
      required: false,
      schema: {
        type: 'string'
      }
    }
  ],
  responses: {
    200: {
      description: '汽車信息',
      content: {
        'application/json': {
          schema: CarResponseRef
        }
      }
    },
    400: {
      description: '請求參數錯誤'
    },
    404: {
      description: '汽車不存在'
    }
  },
  tags: ['Car']
});

// 註冊任務路由的OpenAPI定義
registry.registerPath({
  method: 'get',
  path: '/task/{id}',
  summary: '獲取任務信息',
  description: '根據ID獲取任務的基本信息，可以通過completed參數篩選完成狀態',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
        pattern: '^\\d+$'
      }
    },
    {
      name: 'completed',
      in: 'query',
      required: false,
      schema: {
        type: 'string'
      }
    }
  ],
  responses: {
    200: {
      description: '任務信息',
      content: {
        'application/json': {
          schema: TaskResponseRef
        }
      }
    },
    400: {
      description: '請求參數錯誤'
    },
    404: {
      description: '任務不存在'
    }
  },
  tags: ['Task']
});

// 註冊車隊路由的OpenAPI定義
registry.registerPath({
  method: 'get',
  path: '/fleet/{id}',
  summary: '獲取車隊信息',
  description: '根據ID獲取車隊的基本信息，可以通過active參數篩選活躍狀態',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
        pattern: '^\\d+$'
      }
    },
    {
      name: 'active',
      in: 'query',
      required: false,
      schema: {
        type: 'string'
      }
    }
  ],
  responses: {
    200: {
      description: '車隊信息',
      content: {
        'application/json': {
          schema: FleetResponseRef
        }
      }
    },
    400: {
      description: '請求參數錯誤'
    },
    404: {
      description: '車隊不存在'
    }
  },
  tags: ['Fleet']
});

// 生成OpenAPI文檔
export function generateOpenApiDocument() {
  // 創建生成器
  const generator = new OpenApiGeneratorV3(registry.definitions);
  
  // 生成文檔
  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      title: 'My Hono API',
      version: '1.0.0',
      description: '使用Hono和Zod構建的API'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: '開發服務器'
      }
    ]
  });
}
