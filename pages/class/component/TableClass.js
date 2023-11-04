import { Button, Modal, Row, Table } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ClassAPI from '../../../network/api/ClassAPI';
import { useDispatch } from 'react-redux'
import { setLoading } from '../../../redux/slice/authSlice';

const confirm = Modal.confirm;

const TableClass = ({ store, fetchData, sortData }) => {

    /** Initiate dispatch for action redux */
    const dispatch = useDispatch();

    // Initialize the router to handle navigation
    const router = useRouter();

    // Define the columns for the teacher list table
    const column = [
        { title: '#', width: 100, dataIndex: 'key', key: 'key', fixed: 'left', align: 'center' },
        { title: 'Class Name', dataIndex: 'class_name', key: 'class_name', sorter: true },
        {
            title: 'Subject', children: [
                { title: 'Code', dataIndex: 'subject_code', key: 'subject_code', sorter: true },
                { title: 'Name', dataIndex: 'subject_name', key: 'subject_name', sorter: true }
            ]
        },
        {
            title: 'Teacher', children: [
                { title: 'TRN', dataIndex: 'teacher_num', key: 'teacher_num', sorter: true },
                { title: 'Name', dataIndex: 'teacher_name', key: 'teacher_name', sorter: true },
                { title: 'Title', dataIndex: 'title', key: 'title', sorter: true }
            ]
        },
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

    // Handle sorting of the table data
    const onSort = (pagination, filters, sort) => {
        let field = sort.field
        let order = sort.order || ""
        fetchData(field, order)
    }

    // Function to edit class data
    const editData = (row) => {
        const query = { id: row.class_id };
        router.push({
            pathname: '/class/edit',
            query
        })
    }

    // Function to show a confirmation modal for deleting a class's data
    const showDeleteConfirm = (row) => {
        confirm({
            title: 'Are you sure delete this data?',
            content: `Once you delete it, you can't get it back.`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                const payload = {
                    id: row.class_id
                }

                dispatch(setLoading(true))

                // Use the ClassAPI to delete the class's data
                await ClassAPI.Delete(payload)
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
                    onClick={() => router.push('/class/add')}
                    type="primary"
                    style={{ margin: 0 }}
                >
                    Add data
                </Button>
            </Row>
            <Table columns={columns} dataSource={store.list} scroll={{ x: 1500, y: 700 }} onChange={onSort} showSorterTooltip bordered />
        </Fragment>
    )
};
export default TableClass;
