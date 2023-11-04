import { Button, Modal, Row, Table } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import TeacherAPI from '../../../network/api/TeacherAPI';
import { useDispatch } from 'react-redux'
import { setLoading } from '../../../redux/slice/authSlice';

const confirm = Modal.confirm;

const UnassignedList = ({ store, fetchData }) => {

    // Initialize the router to handle navigation
    const router = useRouter();

    // Define the columns for the teacher list table
    const column = [
        { title: '#', width: 100, dataIndex: 'key', key: 'key', fixed: 'left', align: 'center' },
        { title: 'TRN', width: 170, dataIndex: 'teacher_num', key: 'teacher_num', sorter: true },
        { title: 'Teacher Name', dataIndex: 'teacher_name', key: 'teacher_name', sorter: true },
        { title: 'Title', dataIndex: 'title', key: 'title', sorter: true },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (row) => <Row>
                <Button type="primary" style={{ marginBottom: 0 }} onClick={() => assignTeacher(row)}>{'Assign'}</Button>
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

    const assignTeacher = (row) => {
        // Create a query object with the teacher's unique identifier as 'id'
        const query = { id: row.teacher_num };

        // Use the router to navigate to the '/class/add' page and pass the query object as a parameter
        router.push({
            pathname: '/class/add',
            query
        });
    }

    return (
        <Fragment>
            <Table columns={columns} dataSource={store.list} scroll={{ x: 1500, y: 700 }} onChange={onSort} showSorterTooltip bordered />
        </Fragment>
    );
};
export default UnassignedList;
