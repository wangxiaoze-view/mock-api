import { Random } from 'mockjs';
export const sim_admin_user = {
  // 超管
  admin: {
    role: ['Admin'],
    permission: ['sim:read', 'sim:write', 'sim:delete'],
    token: `Sim-Admin-Token-${Random.guid()}-${Date.now()}`,
  },
  // 作者
  user: {
    role: ['User'],
    permission: ['sim:read', 'sim:write'],
    token: `Sim-Test-Token-${Random.guid()}-${Date.now()}`,
  },
  // 游客
  test: {
    role: ['Test'],
    permission: ['sim:read'],
    token: `Sim-Test-Token-${Random.guid()}-${Date.now()}`,
  },
};
