import { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type { ControllerListItem } from '../data';
import { OnlineStatus } from '../interface';

export type ControllerFormItemsTypes = {
  initialVals?: ControllerListItem;
};

const ControllerFormItems: React.FC<ControllerFormItemsTypes> = (props) => {
  const { initialVals } = props || {};
  return (
    <>
      <ProFormText
        rules={[
          {
            required: true,
            message: '控制器名称为必填项',
          },
          {
            type: 'string',
            max: 255,
            min: 1,
            whitespace: true,
          },
        ]}
        width="md"
        name="name"
        label="控制器名称"
        initialValue={initialVals?.name}
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: 'IP为必填项',
          },
        ]}
        width="md"
        name="ip"
        label="IP"
        initialValue={initialVals?.ip}
      />
      <ProFormSelect
        rules={[
          {
            required: true,
            message: '在线状态为必填项',
          },
        ]}
        width="md"
        name="active"
        label="在线状态"
        initialValue={initialVals?.active}
        options={[
          { label: '在线', value: OnlineStatus.online },
          { label: '离线', value: OnlineStatus.offline },
        ]}
      />
    </>
  );
};

export default ControllerFormItems;
