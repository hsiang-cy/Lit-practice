import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from '../../../openapi/registry.js'; // 改為從registry.js導入

// 擴展Zod以支持OpenAPI
extendZodWithOpenApi(z);

// 參數模式
export const CarIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'id must be a number')
});

// 查詢參數模式
export const CarQuerySchema = z.object({
  details: z
    .string()
    .optional()
    .transform((val) => val === 'true')
});

// 響應模式
export const CarResponseSchema = z.object({
  id: z.string(),
  make: z.string(),
  model: z.string(),
  year: z.number(),
  color: z.string(),
  features: z.array(z.string()).optional()
});

// 註冊Schema引用
export const CarResponseRef = registry.register('CarResponse', CarResponseSchema);

// 註冊路由的OpenAPI定義
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