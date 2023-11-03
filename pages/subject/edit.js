import { Breadcrumb, Button, Card, Form, Input } from 'antd'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import SubjectAPI from '../../network/api/SubjectAPI';
import { useDispatch } from 'react-redux'
import { setLoading } from '../../redux/slice/authSlice';
import { callNotification } from '../../network/mockup/utils';

const FormItem = Form.Item;

function EditSubject() {

    const dispatch = useDispatch();
    const { push, query } = useRouter()

    const [subject_code, setSubjectCode] = useState('')
    const [subject_name, setSubjectName] = useState('')
    const [duration, setDuration] = useState('')
    const [total_meeting, setTotalMeeting] = useState('')

    const detail = async () => {

        const payload = {
            subject_code: query.id
        }

        dispatch(setLoading(true))
        await SubjectAPI.Detail(payload)
            .then(res => {

                const data = res.data
                setSubjectCode(data.subject_code)
                setSubjectName(data.subject_name)
                setDuration(data.duration)
                setTotalMeeting(data.total_meeting)

                dispatch(setLoading(false))
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }

    useEffect(() => {
        detail()
    }, [query])

    const submit = async () => {

        if (subject_name == "" || duration == "" || total_meeting == "") {
            callNotification("error", "Please fill in all fields to proceed.")
            return
        }

        const payload = {
            id: query.id,
            data: {
                subject_name,
                duration,
                total_meeting
            }
        }

        dispatch(setLoading(true))
        await SubjectAPI.Update(payload)
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
                    <Breadcrumb.Item href="">Edit Subject</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Card className="mb-4">
                <Form layout={'horizontal'}>
                    <FormItem label="Subject Code" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. 5001001" value={subject_code} onChange={(e) => setSubjectCode(e.target.value)} disabled />
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

export default EditSubject