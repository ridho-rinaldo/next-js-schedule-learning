import { Button, Col, Modal, Row, Table } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import ClassScheduleAPI from '../../network/api/ClassScheduleAPI';
import { useDispatch } from 'react-redux'
import { setLoading } from '../../redux/slice/authSlice';
import moment from 'moment'

const confirm = Modal.confirm;

const TableClassSchedule = ({ store, fetchData, sortData }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [showModal, setShowModal] = useState(false)
    const [dataModal, setDataModal] = useState([])
    const column = [
        { title: '#', width: 75, dataIndex: 'key', key: 'key', fixed: 'left', align: 'center' },
        { title: 'Class Name', width: 225, dataIndex: 'class_name', key: 'class_name', sorter: true },
        { title: 'Subject Name', dataIndex: 'subject_name', key: 'subject_name', sorter: true },
        { title: 'Teacher Name', dataIndex: 'teacher_name', key: 'teacher_name', sorter: true },
        {
            title: 'Detail Schedule', width: 160, key: 'detail_schedule', render: (row) => <Row>
                <Button type="primary" style={{ marginBottom: 0 }} onClick={() => showDetail(row)}>{'Check Detail'}</Button>
            </Row>
        },
        {
            title: 'Day', children: [
                { title: 'Mon', dataIndex: 'monday', key: 'monday' },
                { title: 'Tue', dataIndex: 'tuesday', key: 'tuesday' },
                { title: 'Wed', dataIndex: 'wednesday', key: 'wednesday' },
                { title: 'Thu', dataIndex: 'thursday', key: 'thursday' },
                { title: 'Fri', dataIndex: 'friday', key: 'friday' },
                { title: 'Sat', dataIndex: 'saturday', key: 'monday' },
                { title: 'Sun', dataIndex: 'sunday', key: 'sunday' },
            ]
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

    // useEffect(() => {
    //     const tempData = []
    //     for (let i = 0; i < 100; i++) {
    //         tempData.push({
    //             key: i,
    //             class_name: `Mathematics Class - ${i}`,
    //             subject_name: `Statistika ${i}`,
    //             teacher_name: `Jim Green ${i}`,
    //             monday: '14:30 - 16:00',
    //             tuesday: '',
    //             wednesday: '',
    //             thursday: '',
    //             friday: '15:00 - 16:30',
    //             saturday: '13:15 - 14:45',
    //             sunday: '',
    //         });
    //     }
    //     setData(tempData)
    // }, [columns])

    const onSort = (pagination, filters, sort) => {
        let field = sort.field
        let order = sort.order || ""

        fetchData(field, order)
    }

    const showDetail = (row) => {
        const buildSchedule = []

        row.detail_schedule.map((item, index) => {
            buildSchedule.push({
                key: index + 1,
                ...item
            })
        })

        setShowModal(true)
        setDataModal(buildSchedule)
    }

    const editData = (row) => {
        const query = { id: row.schedule_id };
        router.push({
            pathname: '/class-schedule/edit',
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
                    id: row.schedule_id
                }

                dispatch(setLoading(true))
                await ClassScheduleAPI.Delete(payload)
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
                    onClick={() => router.push('/class-schedule/add')}
                    type="primary"
                    style={{ margin: 0 }}
                >
                    Add data
                </Button>
            </Row>
            <Table columns={columns} dataSource={store.list} scroll={{ x: 1500, y: 600 }} onChange={onSort} showSorterTooltip bordered />

            <Modal
                title="Detail Schedule"
                visible={showModal}
                onOk={() => setShowModal(false)}
                onCancel={() => setShowModal(false)}
            >
                <Col>
                    <Table columns={[
                        { title: '#', width: 50, dataIndex: 'key', key: 'key', align: 'center' },
                        { title: 'Date',render:(row) => <span>{moment(row.datetime).format("dddd, DD MMMM YYYY")}</span> },
                        { title: 'Time Duration', render: (row) => <span>{`${row.start_time} - ${row.end_time}`}</span> },
                    ]} dataSource={dataModal} bordered />
                </Col>
            </Modal>
        </Fragment>
    );
}
export default TableClassSchedule;
