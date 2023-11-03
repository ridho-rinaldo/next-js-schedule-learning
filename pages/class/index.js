import { Breadcrumb, Button, Card, Form, Input, Select } from 'antd';
import TableClass from './TableClass';
import UnassignedList from './UnassignedList';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ClassAPI from '../../network/api/ClassAPI';
import { setListTeacher, setUnassignedList } from '../../redux/slice/teacherSlice';
import { setLoading } from '../../redux/slice/authSlice';
import { setListClass } from '../../redux/slice/classSlice';
import TeacherAPI from '../../network/api/TeacherAPI';

const FormItem = Form.Item;
const Option = Select.Option;

function Class() {

    const dispatch = useDispatch();

    const store = useSelector((state) => state.class)
    const unassignedList = useSelector((state) => state.teacher.unassignedList)

    const [class_name, setClassName] = useState('')
    const [subject_code, setSubjectCode] = useState('')
    const [subject_name, setSubjectName] = useState('')
    const [teacher_num, setTeacherNum] = useState('')
    const [teacher_name, setTeacherName] = useState('')
    const [title, setTitle] = useState('')
    const [status, setTeacherStatus] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [sortType, setSortType] = useState('descend')

    const [unAsSortBy, setUnAsSortBy] = useState('')
    const [unAsSortType, setUnAsSortType] = useState('')

    /** Fetch data table */
    const fetchData = async (field, order, reset) => {

        setSortBy(field)
        setSortType(order)

        // If reset is true then use payload from value reset
        const payload = reset ? reset : {
            class_name,
            subject_code,
            subject_name,
            teacher_num,
            teacher_name,
            title,
            status,
            sortBy: field,
            sortType: order
        }

        dispatch(setLoading(true))

        await ClassAPI.List(payload)
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
                    list_class: buildData
                }

                dispatch(setListClass(resp))
                dispatch(setLoading(false))
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }

    const getUnassignedList = async (field, order, reset) => {

        setUnAsSortBy(field)
        setUnAsSortType(order)

        // If reset is true then use payload from value reset
        const payload = reset ? reset : {
            sortBy: field,
            sortType: order
        }

        dispatch(setLoading(true))

        await TeacherAPI.UnassignedList(payload)
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
                    data: buildData
                }

                dispatch(setUnassignedList(resp))
                dispatch(setLoading(false))
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }

    useEffect(() => {
        fetchData(sortBy, sortType)
        getUnassignedList()
    }, [dispatch])

    const submit = () => {
        fetchData(sortBy, sortType)
    }

    const reset = () => {
        setClassName('')
        setSubjectCode('')
        setSubjectName('')
        setTeacherNum('')
        setTeacherName('')
        setTitle('')
        setTeacherStatus('')
        setSortBy('')
        setSortType('descend')

        const payload = {
            class_name: '',
            subject_code: '',
            subject_name: '',
            teacher_num: '',
            teacher_name: '',
            title: '',
            status: '',
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
                    <Breadcrumb.Item href="">Class</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Card className="mb-4" title="Class Filter">
                <Form layout={'horizontal'}>
                    <FormItem label="Class Name" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. Mathematics Class" value={class_name} onChange={(e) => setClassName(e.target.value)} />
                    </FormItem>
                    <FormItem label="Subject Code" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. 5001001" value={subject_code} onChange={(e) => setSubjectCode(e.target.value)} />
                    </FormItem>
                    <FormItem label="Subject Name" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. Mathematics" value={subject_name} onChange={(e) => setSubjectName(e.target.value)} />
                    </FormItem>
                    <FormItem label="TRN (Teacher Ref Number)" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. 7001101" value={teacher_num} onChange={(e) => setTeacherNum(e.target.value)} />
                    </FormItem>
                    <FormItem label="Teacher Name" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. John Doe" value={teacher_name} onChange={(e) => setTeacherName(e.target.value)} />
                    </FormItem>
                    <FormItem label="Title" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Input placeholder="eg. Bachelor Degree" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </FormItem>
                    <FormItem label="Status" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <Select defaultValue="" style={{ width: 120 }} onChange={(val) => setTeacherStatus(val)}>
                            <Option value=""></Option>
                            <Option value="true">Active</Option>
                            <Option value="false">Non Active</Option>
                        </Select>
                    </FormItem>
                    <FormItem wrapperCol={{ span: 14, offset: 4 }}>
                        <Button type="primary" onClick={submit} className='mr-3'>Submit</Button>
                        <Button type="default" onClick={reset}>Reset</Button>
                    </FormItem>
                </Form>
            </Card>

            <Card className="mb-4" bodyStyle={{ padding: 0 }} id="components-button-demo" title="Class List">
                <div className="p-4">
                    <TableClass store={store} fetchData={fetchData} sortData={{ sortBy, sortType }} />
                </div>
            </Card>

            <Card bodyStyle={{ padding: 0 }} id="components-button-demo" title="Unassigned Teacher">
                <div className="p-4">
                    <UnassignedList store={{ list: unassignedList }} fetchData={getUnassignedList} sortData={{ sortBy: unAsSortBy, sortType: unAsSortType }} />
                </div>
            </Card>
        </div>
    )
}

export default Class