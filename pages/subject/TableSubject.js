import { Button, Modal, Row, Table } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux'
import { setLoading } from '../../redux/slice/authSlice';
import SubjectAPI from '../../network/api/SubjectAPI';

const confirm = Modal.confirm;

const TableClass = ({ store, fetchData, sortData }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const column = [
        { title: '#', width: 75, dataIndex: 'key', key: 'key', fixed: 'left', align: 'center' },
        { title: 'Subject Code', width: 170, dataIndex: 'subject_code', key: 'subject_code', sorter: true },
        { title: 'Subject Name', dataIndex: 'subject_name', key: 'subject_name', sorter: true },
        { title: 'Duration', width: 170, dataIndex: 'duration', key: 'duration', sorter: true },
        { title: 'Total Meeting', width: 170, dataIndex: 'total_meeting', key: 'total_meeting', sorter: true },
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
        const query = { id: row.subject_code };
        router.push({
            pathname: '/subject/edit',
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
                    id: row.subject_code
                }

                dispatch(setLoading(true))
                await SubjectAPI.Delete(payload)
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
                    onClick={() => router.push('/subject/add')}
                    type="primary"
                    style={{ margin: 0 }}
                >
                    Add data
                </Button>
            </Row>
            <Table columns={columns} dataSource={store.list} scroll={{ x: 1500, y: 700 }} onChange={onSort} showSorterTooltip bordered />
        </Fragment>
    );
}
export default TableClass;
