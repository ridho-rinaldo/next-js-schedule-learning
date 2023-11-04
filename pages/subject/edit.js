import { Breadcrumb, Button, Card, Form, Input } from 'antd'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import SubjectAPI from '../../network/api/SubjectAPI';
import { useDispatch } from 'react-redux'
import { setLoading } from '../../redux/slice/authSlice';
import { callNotification } from '../../network/mockup/utils';

const FormItem = Form.Item;

function EditSubject() {

    /** Initiate dispatch for action redux */
    const dispatch = useDispatch();

    /** Get Function of Navigation */
    const { push, query } = useRouter()

    /** Create state date */
    const [subject_code, setSubjectCode] = useState('')
    const [subject_name, setSubjectName] = useState('')
    const [duration, setDuration] = useState('')
    const [total_meeting, setTotalMeeting] = useState('')

    /** Fetch details of the selected subject */
    const detail = async () => {
        // Prepare a payload with the 'query.id' (assuming 'query.id' represents the subject ID)
        const payload = {
            subject_code: query.id
        }

        // Dispatch a loading action to indicate that data is being fetched
        dispatch(setLoading(true));

        // Fetch subject details using the SubjectAPI
        await SubjectAPI.Detail(payload)
            .then(res => {
                // Extract subject data from the response
                const data = res.data;
                setSubjectCode(data.subject_code);
                setSubjectName(data.subject_name);
                setDuration(data.duration);
                setTotalMeeting(data.total_meeting);

                // Dispatch a loading action to indicate that data fetching is complete
                dispatch(setLoading(false));
            })
            .catch(err => {
                console.log(err);
                // Dispatch a loading action to indicate that data fetching encountered an error
                dispatch(setLoading(false));
            });
    }

    // Use the 'useEffect' hook to fetch subject details when 'query' changes
    useEffect(() => {
        detail();
    }, [query]);

    const submit = async () => {
        // Check if required fields are filled in
        if (subject_name == "" || duration == "" || total_meeting == "") {
            // Show an error notification if any required field is empty
            callNotification("error", "Please fill in all the required fields to proceed.");
            return;
        }

        // Create a payload for updating the subject
        const payload = {
            id: query.id, // Assuming 'query.id' is the subject ID
            data: {
                subject_name,
                duration,
                total_meeting
            }
        }

        // Dispatch a loading action to indicate that data is being updated
        dispatch(setLoading(true));

        // Update the subject using the SubjectAPI
        await SubjectAPI.Update(payload)
            .then(res => {
                if (res.success) {
                    // If the update is successful, navigate to the subject page
                    push('/subject');
                }
            })
            .catch(err => {
                console.log(err);
                // Dispatch a loading action to indicate that the update encountered an error
                dispatch(setLoading(false));
            });
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