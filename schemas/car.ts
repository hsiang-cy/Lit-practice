import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

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

// 匯出所有模式以供OpenAPI生成使用
export const carSchemas = {
  param: CarIdParamSchema,
  query: CarQuerySchema,
  response: CarResponseSchema
};
