import { Breadcrumb, Button, Card, Form, Input, Select } from 'antd'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import SelectComponent from '../../components/Select';
import ClassAPI from '../../network/api/ClassAPI';
import SubjectAPI from '../../network/api/SubjectAPI';
import TeacherAPI from '../../network/api/TeacherAPI';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/slice/authSlice';
import { setTeacherDropdown } from '../../redux/slice/teacherSlice';
import { setSubjectDropdown } from '../../redux/slice/subjectSlice';
import { callNotification } from '../../network/mockup/utils';

const FormItem = Form.Item;
const Option = Select.Option;

function AddClass() {

    /** Initiate dispatch for action redux */
    const dispatch = useDispatch();

    /** Get Function of Navigation */
    const { push, query } = useRouter()

    /** Fetch data from redux */
    const listSubject = useSelector((state) => state.subject.dropdownList)
    const listTeacher = useSelector((state) => state.teacher.dropdownList)

    /** Create state date */
    const [class_name, setClassName] = useState('')
    const [subject_code, setSubjectCode] = useState('')
    const [subject_name, setSubjectName] = useState('')
    const [teacher_num, setTeacherNum] = useState('')
    const [teacher_name, setTeacherName] = useState('')
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('')

    /** Fetch details of the selected class */
    const detail = async () => {
        const payload = {
            teacher_num: query.id
        }

        dispatch(setLoading(true))
        await TeacherAPI.Detail(payload)
            .then(res => {

                const data = res.data
                setTeacherNum(data.teacher_num)
                setTeacherName(data.teacher_name)
                setTitle(data.title)

                dispatch(setLoading(false))
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }

    /** Fetch subject dropdown data */
    const subjectDropdown = async () => {
        dispatch(setLoading(true))

        await SubjectAPI.Dropdown()
            .then(res => {
                const resp = {
                    data: res.data
                }

                dispatch(setSubjectDropdown(resp))
                dispatch(setLoading(false))
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }

    /** Fetch teacher dropdown data */
    const teacherDropdown = async () => {
        dispatch(setLoading(true))

        await TeacherAPI.Dropdown()
            .then(res => {
                const resp = {
                    data: res.data
                }

                dispatch(setTeacherDropdown(resp))
                dispatch(setLoading(false))
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }

    useEffect(() => {
        // Fetch teacher and subject dropdown data when the component mounts
        teacherDropdown();
        subjectDropdown();

        if (query.id != undefined) {
            detail(); // If there's an "id" parameter in the URL query, fetch class details
        }
    }, [dispatch]);


    const changeSubject = (_, raw) => {
        // Extract and set the subject name and code from the selected value
        let value = raw.value.split(' - ')

        setSubjectName(raw.children)
        setSubjectCode(value[0])
    }

    const changeTeacher = (_, raw) => {
        // Extract and set the teacher name, number, and title from the selected value
        let value = raw.value.split(' - ')

        setTeacherName(raw.children)
        setTeacherNum(value[0])
        setTitle(value[2])
    }

    const submit = async () => {
        // Check if all required fields are filled in
        if (class_name == "" || subject_code == "" || subject_name == "" || teacher_num == "" || teacher_name == "" || title == "" || status == "") {
            // Show an error notification if any required field is empty
            callNotification("error", "Please fill in all the required fields to proceed.");
            return; // Exit the function if required fields are empty
        }

        // Create a payload object with class data
        const payload = {
            class_name,
            subject_code,
            subject_name,
            teacher_num,
            teacher_name,
            title,
            status
        };

        // Set the loading state to indicate data submission is in progress
        dispatch(setLoading(true));

        // Call the ClassAPI.Create function to create a new class with the provided payload
        await ClassAPI.Create(payload)
            .then(res => {
                if (res.success) {
                    // If the class creation is successful, navigate to the '/class' page
                    push('/class');
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(setLoading(false));
            });
    }

    return (
        <div>
            <div className="mb-4">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Class</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Add Class</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Card className="mb-4">
                <Form layout={'horizontal'}>
                    <FormItem label="Class Name" name="Class Name" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} rules={[
                        {
                            required: true,
                            message: 'The input is required'
                        }
                    ]}>
                        <Input placeholder="eg. Mathematics Class" value={class_name} onChange={(e) => setClassName(e.target.value)} />
                    </FormItem>
                    <FormItem label="Subject" name="Subject" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} rules={[
                        {
                            required: true,
                            message: 'The input is required'
                        }
                    ]}>
                        <SelectComponent placeholder="Select Subject" data={listSubject} onChange={changeSubject} />
                    </FormItem>
                    {
                        query.id != undefined ? (
                            <FormItem label="* Teacher" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                                <Input value={teacher_name} disabled />
                            </FormItem>
                        ) : (
                            <FormItem label="Teacher" name="Teacher" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} rules={[
                                {
                                    required: true,
                                    message: 'The input is required'
                                }
                            ]}>
                                <SelectComponent placeholder="Select Teacher" data={listTeacher} onChange={changeTeacher} />
                            </FormItem>
                        )
                    }
                    <FormItem label="Status" name="Status" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} rules={[
                        {
                            required: true,
                            message: 'The input is required'
                        }
                    ]}>
                        <Select style={{ width: 150 }} onChange={(val) => setStatus(val)} placeholder="Select Status">
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
                <Button type="default" onClick={() => push('/class')}>Back</Button>
            </Card>
        </div>
    )
}

export default AddClass