import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

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

// 匯出所有模式以供OpenAPI生成使用
export const userSchemas = {
  param: UserIdParamSchema,
  query: UserQuerySchema,
  response: UserResponseSchema
};