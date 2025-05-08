import { Context } from 'hono';

export const getUserOperator = async (c: Context) => {
  const id = c.req.param('id');
  const query = c.req.query();
  const verbose = query.verbose === 'true';
  
  // 模擬查詢數據
  const user = {
    id,
    name: 'Sample User',
    age: 30,
    detail: verbose ? 'This is a verbose detail about user.' : undefined,
  };
  
  return c.json(user);
};