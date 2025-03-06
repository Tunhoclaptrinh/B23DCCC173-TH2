import type { IColumn } from '@/components/Table/typing';
import { Button, Form, Input, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import UserForm from '../../components/Form4RandomUser/form';

// 	const { data, getDataUser } = useModel('randomuser');
// 	const [visible, setVisible] = useState<boolean>(false);
// 	const [isEdit, setIsEdit] = useState<boolean>(false);
// 	const [row, setRow] = useState<RandomUser.Record>();

// 	useEffect(() => {
// 		getDataUser();
// 	}, []);

// 	const columns: IColumn<RandomUser.Record>[] = [
// 		{
// 			title: 'First Name',
// 			dataIndex: 'first',
// 			key: 'name',
// 			width: 200,
// 		},
// 		{
// 			title: 'Last Name',
// 			dataIndex: 'last',
// 			key: 'name',
// 			width: 200,
// 		},
// 		{
// 			title: 'email',
// 			dataIndex: 'email',
// 			key: 'name',
// 			width: 200,
// 		},
// 		{
// 			title: 'Address',
// 			dataIndex: 'address',
// 			key: 'name',
// 			width: 200,
// 		},
// 		{
// 			title: 'Created',
// 			dataIndex: 'created',
// 			key: 'name',
// 			width: 200,
// 		},
// 		{
// 			title: 'Balance',
// 			dataIndex: 'balance',
// 			key: 'age',
// 			width: 100,
// 		},
// 		{
// 			title: 'Action',
// 			width: 200,
// 			align: 'center',
// 			render: (record) => {
// 				return (
// 					<div>
// 						<Button
// 							onClick={() => {
// 								setVisible(true);
// 								setRow(record);
// 								setIsEdit(true);
// 							}}
// 						>
// 							Edit
// 						</Button>
// 						<Button
// 							style={{ marginLeft: 10 }}
// 							onClick={() => {
// 								const dataLocal: any = JSON.parse(localStorage.getItem('data') as any);
// 								const newData = dataLocal.filter((item: any) => item.address !== record.address);
// 								localStorage.setItem('data', JSON.stringify(newData));
// 								getDataUser();
// 							}}
// 							type='primary'
// 						>
// 							Delete
// 						</Button>
// 					</div>
// 				);
// 			},
// 		},
// 	];

// 	return (
// 		<div>
// 			<Button
// 				type='primary'
// 				onClick={() => {
// 					setVisible(true);
// 					setIsEdit(false);
// 				}}
// 			>
// 				Add User
// 			</Button>
// 			<Table dataSource={data} columns={columns} />
// 			<Modal
// 				destroyOnClose
// 				footer={false}
// 				title={isEdit ? 'Edit User' : 'Add User'}
// 				visible={visible}
// 				onOk={() => {}}
// 				onCancel={() => {
// 					setVisible(false);
// 				}}
// 			>
// 				<Form
// 					onFinish={(values) => {
// 						const index = data.findIndex((item: any) => item.address === row?.address);
// 						const dataTemp: RandomUser.Record[] = [...data];
// 						dataTemp.splice(index, 1, values);
// 						const dataLocal = isEdit ? dataTemp : [values, ...data];
// 						localStorage.setItem('data', JSON.stringify(dataLocal));
// 						setVisible(false);
// 						getDataUser();
// 					}}
// 				>
// 					<Form.Item
// 						initialValue={row?.first}
// 						label='First Name'
// 						name='first'
// 						rules={[{ required: true, message: 'Please input your Fist Name!' }]}
// 					>
// 						<Input />
// 					</Form.Item>
// 					<Form.Item
// 						initialValue={row?.last}
// 						label='Last Name'
// 						name='last'
// 						rules={[{ required: true, message: 'Please input your Last Name!' }]}
// 					>
// 						<Input />
// 					</Form.Item>
// 					<Form.Item
// 						initialValue={row?.email}
// 						label='email'
// 						name='email'
// 						rules={[{ required: true, message: 'Please input your email!' }]}
// 					>
// 						<Input />
// 					</Form.Item>
// 					<Form.Item
// 						initialValue={row?.address}
// 						label='address'
// 						name='address'
// 						rules={[{ required: true, message: 'Please input your address!' }]}
// 					>
// 						<Input />
// 					</Form.Item>
// 					<Form.Item
// 						initialValue={row?.created}
// 						label='created'
// 						name='created'
// 						rules={[{ required: true, message: 'Please input your created!' }]}
// 					>
// 						<Input />
// 					</Form.Item>
// 					<Form.Item
// 						initialValue={row?.balance}
// 						label='balance'
// 						name='balance'
// 						rules={[{ required: true, message: 'Please input your balance!' }]}
// 					>
// 						<Input />
// 					</Form.Item>
// 					<div className='form-footer'>
// 						<Button htmlType='submit' type='primary'>
// 							{isEdit ? 'Save' : 'Insert'}
// 						</Button>
// 						<Button onClick={() => setVisible(false)}>Cancel</Button>
// 					</div>
// 				</Form>
// 			</Modal>
// 		</div>
// 	);
// };

// export default RandomUser;

const RandomUser = () => {
	const { data, getDataUser } = useModel('randomuser');
	const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [row, setRow] = useState<RandomUser.Record>();

	useEffect(() => {
		getDataUser();
	}, []);

	// Lấy URL hiện tại
	const urlParams = new URLSearchParams(window.location.search);

	// Lấy giá trị của tham số "param1"
	const color1 = urlParams.get('color1');
	const color2 = urlParams.get('color2');

	const columns: IColumn<RandomUser.Record>[] = [
		{
			title: 'First Name',
			dataIndex: 'first',
			key: 'name',
			width: 200,
		},
		{
			title: 'Last Name',
			dataIndex: 'last',
			key: 'name',
			width: 200,
		},
		{
			title: 'email',
			dataIndex: 'email',
			key: 'name',
			width: 200,
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'name',
			width: 200,
		},
		{
			title: 'Created',
			dataIndex: 'created',
			key: 'name',
			width: 200,
		},
		{
			title: 'Balance',
			dataIndex: 'balance',
			key: 'age',
			width: 100,
		},
		{
			title: 'Action',
			width: 200,
			align: 'center',
			render: (record) => {
				return (
					<div>
						<Button
							onClick={() => {
								setVisible(true);
								setRow(record);
								setIsEdit(true);
							}}
						>
							Edit
						</Button>
						<Button
							style={{ marginLeft: 10 }}
							onClick={() => {
								const dataLocal: any = JSON.parse(localStorage.getItem('data') as any);
								const newData = dataLocal.filter((item: any) => item.address !== record.address);
								localStorage.setItem('data', JSON.stringify(newData));
								getDataUser();
							}}
							type='primary'
						>
							Delete
						</Button>
					</div>
				);
			},
		},
	];

	return (
		<div>
			<Button
				type='primary'
				onClick={() => {
					setVisible(true);
					setIsEdit(false);
				}}
				style={{ backgroundColor: color1, color: color2 }}
			>
				Add User
			</Button>
			<Table dataSource={data} columns={columns} />
			<UserForm
				visible={visible}
				setVisible={setVisible}
				isEdit={isEdit}
				row={row}
				data={data}
				getDataUser={getDataUser}
			/>
		</div>
	);
};

export default RandomUser;
