import apiCall from '@/lib/axios';

export async function getAdminById(id: string | undefined) {
  const response = await apiCall<{ admins: any[] }>(
    'GET',
    'api/superAdmin/admins'
  );
  const matchedAdmin = response.admins.find((admin) => admin._id === id);
  if (!matchedAdmin) {
    throw new Error('Admin not found');
  }
  return matchedAdmin;
}

export async function getAllAdmins() {
  const response = await apiCall<{ admins: any[] }>(
    'GET',
    'api/superAdmin/admins'
  );
  const admins = response.admins;
  if (!admins) {
    throw new Error('Admin not found');
  }
  return admins;
}
