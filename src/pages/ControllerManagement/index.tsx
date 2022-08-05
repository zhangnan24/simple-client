import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { ModalForm } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import {
  getControllerList,
  addController,
  updateController,
  removeController,
} from './service';
import type { ControllerListItem } from './data';
import CaseFormItems from './components/ControllerFormItems';
import type { FormLayout } from 'antd/lib/form/Form';
import { OnlineStatus } from './interface';
import DayJS from 'dayjs';

const layoutConfig = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
  layout: 'horizontal' as FormLayout,
  width: '422px',
};

// 新增控制器
const handleAddController = async (fields: ControllerListItem) => {
  const hide = message.loading('正在新增');
  try {
    await addController({ ...fields });
    hide();
    message.success('新增控制器成功');
    return true;
  } catch (error) {
    hide();
    message.error('新增控制器失败，请重试！');
    return false;
  }
};

// 更新控制器
const handleUpdateController = async (record: ControllerListItem) => {
  const hide = message.loading('正在更新');

  try {
    await updateController(record);
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败，请重试！');
    return false;
  }
};

// 删除控制器
const handleRemoveController = async (id: number) => {
  const hide = message.loading('正在删除');

  try {
    await removeController({ id });
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试！');
    return false;
  }
};

const ControllerManagement: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState<ControllerListItem>();
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<ControllerListItem>[] = [
    {
      title: '控制器名称',
      dataIndex: 'name',
      fixed: 'left',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
    },
    {
      title: '是否在线',
      dataIndex: 'active',
      width: '100px',
      valueEnum: {
        [OnlineStatus.offline]: {
          text: '离线',
          status: 'Error',
        },
        [OnlineStatus.online]: {
          text: '在线',
          status: 'Success',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      hideInSearch: true,
      renderText: (text) => DayJS(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      hideInSearch: true,
      renderText: (text) => DayJS(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '150px',
      fixed: 'right',
      hideInSearch: true,
      render: (_, record) => [
        <a
          key="eidt"
          onClick={() => {
            setUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,
        <a key="delete" onClick={() => handleRemove(record)}>
          删除
        </a>,
      ],
    },
  ];

  const handleCreateModalSubmit = async (values: any) => {
    const success = await handleAddController(values);

    if (success) {
      setCreateModalVisible(false);

      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  const handleUpdateModalSubmit = async (values: any) => {
    const reqParams = {
      ...values,
      id: currentRow?.id,
    };

    const success = await handleUpdateController(reqParams);

    if (success) {
      setUpdateModalVisible(false);
      setCurrentRow(undefined);

      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  const handleRemove = async (record: ControllerListItem) => {
    const success = await handleRemoveController(record.id);

    if (success && actionRef.current) {
        actionRef.current.reload();
    }
  }

  return (
    <PageContainer>
      <ProTable<ControllerListItem>
        actionRef={actionRef}
        rowKey={(record) => record.id}
        scroll={{ x: 1100 }}
        bordered
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新增控制器
          </Button>,
        ]}
        request={async (params) => {
          const { active, ip, name } = params;

          const res = await getControllerList({ active, ip, name });
          return {
            data: res.data,
            success: res.code === 200,
          };
        }}
        columns={columns}
        options={false}
        pagination={{ hideOnSinglePage: true }}
      />

      <ModalForm
        title="新增控制器"
        preserve={false}
        visible={createModalVisible}
        onFinish={handleCreateModalSubmit}
        modalProps={{
          onCancel: () => {
            setCreateModalVisible(false);
          },
          destroyOnClose: true,
        }}
        {...layoutConfig}
      >
        <CaseFormItems />
      </ModalForm>

      <ModalForm
        title="编辑控制器"
        visible={updateModalVisible}
        onFinish={handleUpdateModalSubmit}
        modalProps={{
          onCancel: () => {
            setUpdateModalVisible(false);
            setCurrentRow(undefined);
          },
          destroyOnClose: true,
        }}
        {...layoutConfig}
      >
        <CaseFormItems initialVals={currentRow} />
      </ModalForm>
    </PageContainer>
  );
};

export default ControllerManagement;
