import { Breadcrumb, Button, Card, Form, Input, Select } from 'antd';
import TableTeacher from './component/TableTeacher';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import TeacherAPI from '../../network/api/TeacherAPI';
import { setListTeacher } from '../../redux/slice/teacherSlice';
import { setLoading } from '../../redux/slice/authSlice';

const FormItem = Form.Item;
const Option = Select.Option;

function Teacher() {

    // Initiate dispatch for action redux
    const dispatch = useDispatch();

    /** Fetch data from redux */
    const store = useSelector((state) => state.teacher)

    /** Create state date */
    const [teacher_num, setTeacherNum] = useState('')
    const [teacher_name, setTeacherName] = useState('')
    const [title, setTitle] = useState('')
    const [status, setTeacherStatus] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [sortType, setSortType] = useState('descend')

    /** Fetch data table */
    const fetchData = async (field, order, reset) => {
        // Set sorting parameters
        setSortBy(field)
        setSortType(order)

        // Create a payload object for the API request
        // If reset is true, use the reset payload, otherwise use the current input values
        const payload = reset ? reset : {
            teacher_num,
            teacher_name,
            title,
            status,
            sortBy: field,
            sortType: order
        }
        // Set loading state to true while fetching data
        dispatch(setLoading(true))

        // Fetch teacher data from the API
        await TeacherAPI.List(payload)
            .then(res => {
                const dataList = res.data
                const buildData = []

                // Map the retrieved data and add a 'key' property for rendering
                dataList.map((item, i) => {
                    buildData.push({
                        key: i + 1,
                        ...item
                    })
                })

                // Prepare the response object for storing in Redux state
                const resp = {
                    list_teacher: buildData
                }

                // Update the class data in Redux state and set loading to false
                dispatch(setListTeacher(resp))
                dispatch(setLoading(false))
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }

    useEffect(() => {
        fetchData(sortBy, sortType)
    }, [dispatch])

    const submit = () => {
        // Trigger data fetching with the current sorting criteria
        fetchData(sortBy, sortType)
    }

    const reset = () => {
        // Clear input fields and reset sorting criteria
        setTeacherNum('')
        setTeacherName('')
        setTitle('')
        setTeacherStatus('')
        setSortBy('')
        setSortType('descend')

        // Prepare payload for reset and trigger data fetching
        const payload = {
            teacher_num: '',
            teacher_name: '',
            title: '',
            status: '',
            sortBy: '',
            sortType: 'descend'
        }
        fetchData('', 'descend', payload)
    }

    return (
        <div>
            <div className="mb-4">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Teacher</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Card className="mb-4" title="Teacher Filter">
                <Form layout={'horizontal'}>
                    <FormItem label="TRN (Teacher Ref Number)" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. 7001101" value={teacher_num} onChange={(e) => setTeacherNum(e.target.value)} />
                    </FormItem>
                    <FormItem label="Teacher Name" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. John Doe" value={teacher_name} onChange={(e) => setTeacherName(e.target.value)} />
                    </FormItem>
                    <FormItem label="Title" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. Bachelor Degree" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </FormItem>
                    <FormItem label="Status" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Select defaultValue="" value={status} style={{ width: 120 }} onChange={(val) => setTeacherStatus(val)}>
                            <Option value=""></Option>
                            <Option value="true">Active</Option>
                            <Option value="false">Non Active</Option>
                        </Select>
                    </FormItem>
                    <FormItem wrapperCol={{ span: 14, offset: 4 }}>
                        <Button type="primary" onClick={submit} className='mr-3'>Submit</Button>
                        <Button type="default" onClick={reset}>Reset</Button>
                    </FormItem>
                </Form>
            </Card>

            <Card bodyStyle={{ padding: 0 }} id="components-button-demo" title="Teacher List">
                <div className="p-4">
                    <TableTeacher store={store} fetchData={fetchData} sortData={{ sortBy, sortType }} />
                </div>
            </Card>
        </div>
    )
}

export default Teacher