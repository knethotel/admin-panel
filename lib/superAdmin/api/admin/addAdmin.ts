import apiCall from '@/lib/axios';

export async function addAdmin(data: any) {
  return await apiCall('POST', 'api/superAdmin/create-admin', data);
}
