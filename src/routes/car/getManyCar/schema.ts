import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from '../../../openapi/registry.js';
import { CarResponseSchema } from '../getOneCar/schema.js';

// 擴展Zod以支持OpenAPI
extendZodWithOpenApi(z);

// 查詢參數模式
export const CarListQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform(val => val ? parseInt(val, 10) : 10),
  make: z.string().optional()
});

// 響應模式
export const CarListResponseSchema = z.object({
  cars: z.array(CarResponseSchema),
  total: z.number(),
  page: z.number().optional()
});

// 註冊Schema引用
export const CarListResponseRef = registry.register('CarListResponse', CarListResponseSchema);

// 註冊路由的OpenAPI定義
registry.registerPath({
  method: 'get',
  path: '/car',
  summary: '獲取汽車列表',
  description: '獲取汽車列表，可以通過make參數篩選製造商，通過limit參數限制數量',
  parameters: [
    {
      name: 'limit',
      in: 'query',
      required: false,
      schema: {
        type: 'string'
      }
    },
    {
      name: 'make',
      in: 'query',
      required: false,
      schema: {
        type: 'string'
      }
    }
  ],
  responses: {
    200: {
      description: '汽車列表',
      content: {
        'application/json': {
          schema: CarListResponseRef
        }
      }
    },
    400: {
      description: '請求參數錯誤'
    }
  },
  tags: ['Car']
});