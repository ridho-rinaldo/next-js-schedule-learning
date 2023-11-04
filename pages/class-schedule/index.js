import { Breadcrumb, Button, Card, Form, Input } from 'antd';
import TableClassSchedule from './component/TableClassSchedule';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ClassScheduleAPI from '../../network/api/ClassScheduleAPI';
import { setLoading } from '../../redux/slice/authSlice';
import { setListClassSchedule } from '../../redux/slice/classScheduleSlice';

const FormItem = Form.Item;

function ClassSchedule() {

    // Initiate dispatch for action redux
    const dispatch = useDispatch();

    /** Fetch data from redux */
    const store = useSelector((state) => state.classSchedule)

    /** Create state date */
    const [class_name, setClassName] = useState('')
    const [teacher_name, setTeacherName] = useState('')
    const [subject_name, setSubjectName] = useState('')
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
            class_name,
            subject_name,
            teacher_name,
            sortBy: field,
            sortType: order
        }

        // Set loading state to true while fetching data
        dispatch(setLoading(true))

        // Fetch class data from the API
        await ClassScheduleAPI.List(payload)
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
                    list_class_schedule: buildData
                }

                // Update the class schedule data in Redux state and set loading to false
                dispatch(setListClassSchedule(resp))
                dispatch(setLoading(false))
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }

    useEffect(() => {
        // Fetch class schedule when component mounts or 'dispatch' changes
        fetchData(sortBy, sortType)
    }, [dispatch])

    const submit = () => {
        // Trigger data fetching with the current sorting criteria
        fetchData(sortBy, sortType)
    }

    const reset = () => {
        // Clear input fields and reset sorting criteria
        setClassName('')
        setSubjectName('')
        setTeacherName('')
        setSortBy('')
        setSortType('descend')

        // Prepare payload for reset and trigger data fetching
        const payload = {
            class_name: '',
            subject_name: '',
            teacher_name: '',
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
                    <Breadcrumb.Item href="">Class Schedule</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Card className="mb-4" title="Schedule Filter">
                <Form layout={'horizontal'}>
                    <FormItem label="Class Name" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. Mathematics Class" value={class_name} onChange={(e) => setClassName(e.target.value)} />
                    </FormItem>
                    <FormItem label="Subject Name" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. Statistics" value={subject_name} onChange={(e) => setSubjectName(e.target.value)} />
                    </FormItem>
                    <FormItem label="Teacher Name" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. John Doe" value={teacher_name} onChange={(e) => setTeacherName(e.target.value)} />
                    </FormItem>
                    <FormItem wrapperCol={{ span: 14, offset: 4 }}>
                        <Button type="primary" onClick={submit} className='mr-3'>Submit</Button>
                        <Button type="default" onClick={reset}>Reset</Button>
                    </FormItem>
                </Form>
            </Card>

            <Card bodyStyle={{ padding: 0 }} id="components-button-demo" title="Schedule List">
                <div className="p-4">
                    <TableClassSchedule store={store} fetchData={fetchData} sortData={{ sortBy, sortType }} />
                </div>
            </Card>
        </div>
    )
}

export default ClassSchedule