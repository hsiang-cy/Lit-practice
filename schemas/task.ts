import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

// 擴展Zod以支持OpenAPI
extendZodWithOpenApi(z);

// 參數模式
export const TaskIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'id must be a number')
});

// 查詢參數模式
export const TaskQuerySchema = z.object({
  completed: z
    .string()
    .optional()
    .transform((val) => val === 'true')
});

// 響應模式
export const TaskResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
  dueDate: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional()
});

// 匯出所有模式以供OpenAPI生成使用
export const taskSchemas = {
  param: TaskIdParamSchema,
  query: TaskQuerySchema,
  response: TaskResponseSchema
};
