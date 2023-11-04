import { Breadcrumb, Button, Card, Form, Input, Select } from 'antd'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import TeacherAPI from '../../network/api/TeacherAPI';
import { useDispatch } from 'react-redux'
import { setLoading } from '../../redux/slice/authSlice';
import { callNotification } from '../../network/mockup/utils';

const FormItem = Form.Item;
const Option = Select.Option;

function EditTeacher() {

    /** Initiate dispatch for action redux */
    const dispatch = useDispatch();

    /** Get Function of Navigation */
    const { push, query } = useRouter()

    /** Create state date */
    const [teacher_num, setTeacherNum] = useState('')
    const [teacher_name, setTeacherName] = useState('')
    const [title, setTitle] = useState('')
    const [status, setTeacherStatus] = useState('')

    /** Fetch details of the selected subject */
    const detail = async () => {
        // Prepare a payload with the 'query.id' (assuming 'query.id' represents the subject ID)
        const payload = {
            teacher_num: query.id
        }

        // Dispatch a loading action to indicate that data is being fetched
        dispatch(setLoading(true))

        // Fetch subject details using the TeacherAPI
        await TeacherAPI.Detail(payload)
            .then(res => {
                // Extract subject data from the response
                const data = res.data
                setTeacherNum(data.teacher_num)
                setTeacherName(data.teacher_name)
                setTitle(data.title)
                setTeacherStatus(String(data.status))

                // Dispatch a loading action to indicate that data fetching is complete
                dispatch(setLoading(false))
            })
            .catch(err => {
                console.log(err)
                // Dispatch a loading action to indicate that data fetching encountered an error
                dispatch(setLoading(false))
            })
    }

    // Use the 'useEffect' hook to fetch subject details when 'query' changes
    useEffect(() => {
        detail()
    }, [query])

    const submit = async () => {
        // Check if required fields are filled in
        if (teacher_name == "" || title == "" || status == "") {
            // Show an error notification if any required field is empty
            callNotification("error", "Please fill in all fields to proceed.")
            return
        }

        // Create a payload for updating the subject
        const payload = {
            id: query.id, // Assuming 'query.id' is the teacher ID
            data: {
                teacher_name,
                title,
                status
            }
        }

        // Dispatch a loading action to indicate that data is being updated
        dispatch(setLoading(true))

        // Update the subject using the TeacherAPI
        await TeacherAPI.Update(payload)
            .then(res => {
                if (res.success) {
                    // If the update is successful, navigate to the subject page
                    push('/teacher')
                }
            })
            .catch(err => {
                console.log(err)
                // Dispatch a loading action to indicate that the update encountered an error
                dispatch(setLoading(false))
            })
    }

    return (
        <div>
            <div className="mb-4">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Teacher</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Edit Teacher</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Card className="mb-4">
                <Form layout={'horizontal'}>
                    <FormItem label="TRN (Teacher Ref Number)" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. 7001101" value={teacher_num} onChange={(e) => setTeacherNum(e.target.value)} disabled />
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
                        <Button type="primary" onClick={submit}>Submit</Button>
                    </FormItem>
                </Form>
            </Card>

            <Card className="mb-4 ant-picker-calendar-header">
                <Button type="default" onClick={() => push('/teacher')}>Back</Button>
            </Card>
        </div>
    )
}

export default EditTeacher