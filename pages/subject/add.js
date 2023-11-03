import { Breadcrumb, Button, Card, Form, Input } from 'antd'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import SubjectAPI from '../../network/api/SubjectAPI';
import { useDispatch } from 'react-redux'
import { setLoading } from '../../redux/slice/authSlice';
import { callNotification } from '../../network/mockup/utils';

const FormItem = Form.Item;

function AddSubject() {

    const dispatch = useDispatch();
    const { push } = useRouter()

    const [subject_code, setSubjectCode] = useState('')
    const [subject_name, setSubjectName] = useState('')
    const [duration, setDuration] = useState('')
    const [total_meeting, setTotalMeeting] = useState('')

    const submit = async () => {

        if (subject_code == "" || subject_name == "" || duration == "" || total_meeting == "") {
            callNotification("error", "Please fill in all the required fields to proceed.")
            return
        }

        const payload = {
            subject_code,
            subject_name,
            duration,
            total_meeting
        }

        dispatch(setLoading(true))
        await SubjectAPI.Create(payload)
            .then(res => {
                if (res.success) {
                    push('/subject')
                }
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }

    return (
        <div>
            <div className="mb-4">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Subject</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Add Subject</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Card className="mb-4">
                <Form layout={'horizontal'}>
                    <FormItem label="Subject Code" name="Subject Code" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} rules={[
                        {
                            required: true,
                            message: 'The input is required'
                        }
                    ]}>
                        <Input placeholder="eg. 5001001" value={subject_code} onChange={(e) => setSubjectCode(e.target.value)} />
                    </FormItem>
                    <FormItem label="Subject Name" name="Subject Name" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} rules={[
                        {
                            required: true,
                            message: 'The input is required'
                        }
                    ]}>
                        <Input placeholder="eg. Mathematics" value={subject_name} onChange={(e) => setSubjectName(e.target.value)} />
                    </FormItem>
                    <FormItem label="Duration" name="Duration" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} rules={[
                        {
                            required: true,
                            message: 'The input is required'
                        }
                    ]}>
                        <Input placeholder="eg. 60" value={duration} onChange={(e) => setDuration(e.target.value)} />
                    </FormItem>
                    <FormItem label="Total Meeting" name="Total Meeting" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} rules={[
                        {
                            required: true,
                            message: 'The input is required'
                        }
                    ]}>
                        <Input placeholder="eg. 15" value={total_meeting} onChange={(e) => setTotalMeeting(e.target.value)} />
                    </FormItem>
                    <FormItem wrapperCol={{ span: 14, offset: 4 }}>
                        <Button type="primary" onClick={submit}>Submit</Button>
                    </FormItem>
                </Form>
            </Card>

            <Card className="mb-4 ant-picker-calendar-header">
                <Button type="default" onClick={() => push('/subject')}>Back</Button>
            </Card>
        </div>
    )
}

export default AddSubject