import { Breadcrumb, Button, Card, Form, Input, Select } from 'antd'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import ClassAPI from '../../network/api/ClassAPI';
import SubjectAPI from '../../network/api/SubjectAPI';
import TeacherAPI from '../../network/api/TeacherAPI';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/slice/authSlice';
import SelectComponent from '../../components/Select';
import { setSubjectDropdown } from '../../redux/slice/subjectSlice';
import { setTeacherDropdown } from '../../redux/slice/teacherSlice';
import { callNotification } from '../../network/mockup/utils';

const FormItem = Form.Item;
const Option = Select.Option;

function EditClass() {

    const dispatch = useDispatch();
    const { push, query } = useRouter()

    const listSubject = useSelector((state) => state.subject.dropdownList)
    const listTeacher = useSelector((state) => state.teacher.dropdownList)

    const [class_name, setClassName] = useState('')
    const [subject_code, setSubjectCode] = useState('')
    const [subject_name, setSubjectName] = useState('')
    const [teacher_num, setTeacherNum] = useState('')
    const [teacher_name, setTeacherName] = useState('')
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('')

    const detail = async () => {

        const payload = {
            class_id: query.id
        }

        dispatch(setLoading(true))
        await ClassAPI.Detail(payload)
            .then(res => {

                const data = res.data
                setClassName(data.class_name)
                setSubjectCode(data.subject_code)
                setSubjectName(data.subject_name)
                setTeacherNum(data.teacher_num)
                setTeacherName(data.teacher_name)
                setTitle(data.title)
                setStatus(String(data.status))

                dispatch(setLoading(false))
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }

    const submit = async () => {

        if (class_name == "" || subject_code == "" || subject_name == "" || teacher_num == "" || teacher_name == "" || title == "" || status == "") {
            callNotification("error", "Please fill in all fields to proceed.")
            return
        }

        const payload = {
            id: query.id,
            data: {
                class_name,
                subject_code,
                subject_name,
                teacher_num,
                teacher_name,
                title,
                status,
            }
        }

        dispatch(setLoading(true))
        await ClassAPI.Update(payload)
            .then(res => {
                if (res.success) {
                    push('/class')
                }
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }

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
        teacherDropdown()
        subjectDropdown()
    }, [dispatch])

    useEffect(() => {
        detail()
    }, [query])

    const changeSubject = (_, raw) => {
        let value = raw.value.split(' - ')

        setSubjectName(raw.children)
        setSubjectCode(value[0])
    }

    const changeTeacher = (_, raw) => {
        let value = raw.value.split(' - ')

        setTeacherName(raw.children)
        setTeacherNum(value[0])
        setTitle(value[2])
    }

    return (
        <div>
            <div className="mb-4">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Class</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Edit Class</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Card className="mb-4">
                <Form layout={'horizontal'}>
                    <FormItem label="Class Name" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. Mathematics Class" value={class_name} onChange={(e) => setClassName(e.target.value)} />
                    </FormItem>
                    <FormItem label="Subject" name="Subject" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <SelectComponent placeholder="Select Subject" data={listSubject} val={subject_name} onChange={changeSubject} />
                    </FormItem>
                    <FormItem label="Teacher" name="Teacher" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <SelectComponent placeholder="Select Teacher" data={listTeacher} val={teacher_name} onChange={changeTeacher} />
                    </FormItem>
                    <FormItem label="Status" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Select value={status} style={{ width: 120 }} onChange={(val) => setStatus(val)}>
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

export default EditClass