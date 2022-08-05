import { request } from 'umi';
import type {
  AddControllerRes,
  ControllerListItem,
  GetControllersRes,
  UpdateControllerRes,
} from './data.d';

/** 获取控制器列表 */
export async function getControllerList(params: Partial<ControllerListItem>,) {
  return request<GetControllersRes>(`${API_URL}/device_controller/list`, {
    method: 'GET',
    params
  });
}

/** 新增控制器 */
export async function addController(data: ControllerListItem, options?: Record<string, any>) {
  return request<AddControllerRes>(`${API_URL}/device_controller/add`, {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 更新控制器 */
export async function updateController(data: Record<string, any>, options?: Record<string, any>) {
  return request<UpdateControllerRes>(`${API_URL}/device_controller/update`, {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除控制器 */
export async function removeController(
  data: { id: number },
  options?: Record<string, any>,
) {
  return request<Record<string, any>>(`${API_URL}/device_controller/remove`, {
    data,
    method: 'POST',
    ...(options || {}),
  });
}
