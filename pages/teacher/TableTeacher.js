import { Button, Modal, Row, Table } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import TeacherAPI from '../../network/api/TeacherAPI';
import { useDispatch } from 'react-redux'
import { setLoading } from '../../redux/slice/authSlice';

const confirm = Modal.confirm;

const TableTeacher = ({ store, fetchData, sortData }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const column = [
        { title: '#', width: 100, dataIndex: 'key', key: 'key', fixed: 'left', align: 'center' },
        { title: 'TRN', width: 170, dataIndex: 'teacher_num', key: 'teacher_num', sorter: true },
        { title: 'Teacher Name', dataIndex: 'teacher_name', key: 'teacher_name', sorter: true },
        { title: 'Title', width: 225, dataIndex: 'title', key: 'title', sorter: true },
        {
            title: 'Status', width: 170, render: (row) => {
                const status = row.status
                if (status) return <span>{'Active'}</span>
                return <span>{'Not Active'}</span>
            }
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 125,
            render: (row) => <Row>
                <Button type="primary" shape="circle" icon={<EditFilled style={{ fontSize: '12px' }} />} style={{ marginBottom: 0 }} onClick={() => editData(row)} />
                <Button type="danger" shape="circle" icon={<DeleteFilled style={{ fontSize: '12px' }} />} style={{ marginBottom: 0 }} onClick={() => showDeleteConfirm(row)} />
            </Row>
        }
    ]
    const [columns, setColumns] = useState(column)

    const onSort = (pagination, filters, sort) => {
        let field = sort.field
        let order = sort.order || ""

        fetchData(field, order)
    }

    const editData = (row) => {
        const query = { id: row.teacher_num };
        router.push({
            pathname: '/teacher/edit',
            query
        })
    }

    const showDeleteConfirm = (row) => {
        confirm({
            title: 'Are you sure delete this data?',
            content: `Once you delete it, you can't get it back.`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                const payload = {
                    id: row.teacher_num
                }

                dispatch(setLoading(true))
                await TeacherAPI.Delete(payload)
                    .then(res => {
                        if (res.success) {
                            fetchData(sortData.sortBy, sortData.sortType)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        dispatch(setLoading(false))
                    })

            },
            onCancel() {
                console.log('Cancel');
            }
        });
    }

    return (
        <Fragment>
            <Row className='ant-picker-calendar-header'>
                <Button
                    onClick={() => router.push('/teacher/add')}
                    type="primary"
                    style={{ margin: 0 }}
                >
                    Add data
                </Button>
            </Row>
            <Table columns={columns} dataSource={store.list} scroll={{ x: 1500, y: 700 }} onChange={onSort} showSorterTooltip bordered />
        </Fragment>
    );
};
export default TableTeacher;
