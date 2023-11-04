import { Breadcrumb, Button, Card, Form, Input, Select } from 'antd'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import TeacherAPI from '../../network/api/TeacherAPI';
import { useDispatch } from 'react-redux'
import { setLoading } from '../../redux/slice/authSlice';
import { callNotification } from '../../network/mockup/utils';

const FormItem = Form.Item;
const Option = Select.Option;

function AddTeacher() {

    /** Initiate dispatch for action redux */
    const dispatch = useDispatch();

    /** Get Function of Navigation */
    const { push } = useRouter()

    /** Create state date */
    const [teacher_num, setTeacherNum] = useState('')
    const [teacher_name, setTeacherName] = useState('')
    const [title, setTitle] = useState('')
    const [status, setTeacherStatus] = useState('true')

    const submit = async () => {
        // Check if required fields are filled in
        if (teacher_num == "" || teacher_name == "" || title == "" || status == "") {
            // Show an error notification if any required field is empty
            callNotification("error", "Please fill in all the required fields to proceed.")
            return
        }

        // Create a payload with the teacher information
        const payload = {
            teacher_num,
            teacher_name,
            title,
            status
        }

        // Dispatch a loading action to indicate that data is being created
        dispatch(setLoading(true))

        // Use the SubjectAPI to create a new subject with the provided payload
        await TeacherAPI.Create(payload)
            .then(res => {
                if (res.success) {
                    // If the creation is successful, navigate to the subject page
                    push('/teacher')
                }
            })
            .catch(err => {
                console.log(err)
                // Dispatch a loading action to indicate that an error occurred
                dispatch(setLoading(false))
            })
    }

    return (
        <div>
            <div className="mb-4">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Teacher</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Add Teacher</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Card className="mb-4">
                <Form layout={'horizontal'}>
                    <FormItem label="TRN (Teacher Ref Number)" name="TRN (Teacher Ref Number)" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} rules={[
                        {
                            required: true,
                            message: 'The input is required'
                        }
                    ]}>
                        <Input placeholder="eg. 7001101" value={teacher_num} onChange={(e) => setTeacherNum(e.target.value)} />
                    </FormItem>
                    <FormItem label="Teacher Name" name="Teacher Name" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} rules={[
                        {
                            required: true,
                            message: 'The input is required'
                        }
                    ]}>
                        <Input placeholder="eg. John Doe" value={teacher_name} onChange={(e) => setTeacherName(e.target.value)} />
                    </FormItem>
                    <FormItem label="Title" name="Title" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} rules={[
                        {
                            required: true,
                            message: 'The input is required'
                        }
                    ]}>
                        <Input placeholder="eg. Bachelor Degree" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </FormItem>
                    <FormItem label="Status" name="Status" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} rules={[
                        {
                            required: true,
                            message: 'The input is required'
                        }
                    ]}>
                        <Select defaultValue="true" value={status} style={{ width: 120 }} onChange={(val) => setTeacherStatus(val)} placeholder="Select Status">
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

export default AddTeacher