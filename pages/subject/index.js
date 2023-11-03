import { Breadcrumb, Button, Card, Form, Input } from 'antd';
import TableSubject from './TableSubject';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import SubjectAPI from '../../network/api/SubjectAPI';
import { setListSubject } from '../../redux/slice/subjectSlice';
import { setLoading } from '../../redux/slice/authSlice';

const FormItem = Form.Item;

function Subject() {

    const dispatch = useDispatch();

    const store = useSelector((state) => state.subject)

    const [subject_code, setSubjectCode] = useState('')
    const [subject_name, setSubjectName] = useState('')
    const [duration, setDuration] = useState('')
    const [total_meeting, setTotalMeeting] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [sortType, setSortType] = useState('descend')

    /** Fetch data table */
    const fetchData = async (field, order, reset) => {

        setSortBy(field)
        setSortType(order)

        // If reset is true then use payload from value reset
        const payload = reset ? reset : {
            subject_code,
            subject_name,
            duration,
            total_meeting,
            sortBy: field,
            sortType: order
        }

        dispatch(setLoading(true))

        await SubjectAPI.List(payload)
            .then(res => {

                const dataList = res.data
                const buildData = []

                dataList.map((item, i) => {
                    buildData.push({
                        key: i + 1,
                        ...item
                    })
                })

                const resp = {
                    list_subject: buildData
                }
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
        fetchData(sortBy, sortType)
    }

    const reset = () => {
        setSubjectCode('')
        setSubjectName('')
        setDuration('')
        setTotalMeeting('')
        setSortBy('')
        setSortType('descend')

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