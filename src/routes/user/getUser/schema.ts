import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from '../../../openapi/registry.js';

// 擴展Zod以支持OpenAPI
extendZodWithOpenApi(z);

// 參數模式
export const UserIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'id must be a number')
});

// 查詢參數模式
export const UserQuerySchema = z.object({
  verbose: z
    .string()
    .optional()
    .transform((val) => val === 'true')
});

// 響應模式
export const UserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  detail: z.string().optional()
});

// 註冊Schema引用
export const UserResponseRef = registry.register('UserResponse', UserResponseSchema);

// 註冊路由的OpenAPI定義
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