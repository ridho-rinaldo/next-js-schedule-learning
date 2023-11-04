import { Breadcrumb, Button, Card, Form, Input } from 'antd';
import TableSubject from './component/TableSubject';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import SubjectAPI from '../../network/api/SubjectAPI';
import { setListSubject } from '../../redux/slice/subjectSlice';
import { setLoading } from '../../redux/slice/authSlice';

const FormItem = Form.Item;

function Subject() {

    // Initiate dispatch for action redux
    const dispatch = useDispatch();

    /** Fetch data from redux */
    const store = useSelector((state) => state.subject)

    /** Create state date */
    const [subject_code, setSubjectCode] = useState('')
    const [subject_name, setSubjectName] = useState('')
    const [duration, setDuration] = useState('')
    const [total_meeting, setTotalMeeting] = useState('')
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
            subject_code,
            subject_name,
            duration,
            total_meeting,
            sortBy: field,
            sortType: order
        }

        // Set loading state to true while fetching data
        dispatch(setLoading(true))

        // Fetch subject data from the API
        await SubjectAPI.List(payload)
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
                    list_subject: buildData
                }

                // Update the class data in Redux state and set loading to false
                dispatch(setListSubject(resp))
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
        setSubjectCode('')
        setSubjectName('')
        setDuration('')
        setTotalMeeting('')
        setSortBy('')
        setSortType('descend')

        // Prepare payload for reset and trigger data fetching
        const payload = {
            subject_code: '',
            subject_name: '',
            duration: '',
            total_meeting: '',
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
                    <Breadcrumb.Item href="">Subject</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Card className="mb-4" title="Subject Filter">
                <Form layout={'horizontal'}>
                    <FormItem label="Subject Code" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. 5001001" value={subject_code} onChange={(e) => setSubjectCode(e.target.value)} />
                    </FormItem>
                    <FormItem label="Subject Name" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. Mathematics" value={subject_name} onChange={(e) => setSubjectName(e.target.value)} />
                    </FormItem>
                    <FormItem label="Duration" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. 60" value={duration} onChange={(e) => setDuration(e.target.value)} />
                    </FormItem>
                    <FormItem label="Total Meeting" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. 15" value={total_meeting} onChange={(e) => setTotalMeeting(e.target.value)} />
                    </FormItem>
                    <FormItem wrapperCol={{ span: 14, offset: 4 }}>
                        <Button type="primary" onClick={submit} className='mr-3'>Submit</Button>
                        <Button type="default" onClick={reset}>Reset</Button>
                    </FormItem>
                </Form>
            </Card>

            <Card bodyStyle={{ padding: 0 }} id="components-button-demo" title="Subject List">
                <div className="p-4">
                    <TableSubject store={store} fetchData={fetchData} sortData={{ sortBy, sortType }} />
                </div>
            </Card>
        </div>
    )
}

export default Subject