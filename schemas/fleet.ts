import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

// 擴展Zod以支持OpenAPI
extendZodWithOpenApi(z);

// 參數模式
export const FleetIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'id must be a number')
});

// 查詢參數模式
export const FleetQuerySchema = z.object({
  active: z
    .string()
    .optional()
    .transform((val) => val === 'true')
});

// 響應模式
export const FleetResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  carCount: z.number(),
  location: z.string(),
  active: z.boolean(),
  cars: z.array(z.string()).optional()
});

// 匯出所有模式以供OpenAPI生成使用
export const fleetSchemas = {
  param: FleetIdParamSchema,
  query: FleetQuerySchema,
  response: FleetResponseSchema
};
