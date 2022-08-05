export type ControllerListItem = {
  /** 控制器id */
  id: number;
  /** 控制器名称 */
  name: string;
  /** ip地址 */
  ip: string;
  /** 是否在线 */
  active: number;
  /** 创建时间 */
  create_time: string;
  /** 更新时间 */
  update_time: string;
};

type CommonRes = {
  msg: string;
  code: number;
};

export type UpdateControllerRes = {
  data: number;
} & CommonRes;

export type AddControllerRes = {
  data: ControllerListItem;
} & CommonRes;

export type GetControllersRes = {
  data: ControllerListItem[];
} & CommonRes;
