import { Alert, Breadcrumb, Button, Card, Checkbox, Col, DatePicker, Form, Row, Tabs, TimePicker } from 'antd'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import SelectComponent from '../../components/Select';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import ClassAPI from '../../network/api/ClassAPI';
import { setClassDropdown } from '../../redux/slice/classSlice';
import { setLoading } from '../../redux/slice/authSlice';
import SubjectAPI from '../../network/api/SubjectAPI';
import ClassScheduleAPI from '../../network/api/ClassScheduleAPI';
import { buildDetailSchedule, buildListWeek, buildSchedulePerMeeting, generateWeeklySchedule, getEndDate } from './utils'
import { callNotification } from '../../network/mockup/utils';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

function AddClassSchedule() {

    const dispatch = useDispatch();
    const { push } = useRouter()

    const listClass = useSelector((state) => state.class.dropdownList)

    const [class_id, setClassID] = useState('')
    const [class_name, setClassName] = useState('')
    const [subject_code, setSubjectCode] = useState('')
    const [subject_name, setSubjectName] = useState('')
    const [teacher_num, setTeacherNum] = useState('')
    const [teacher_name, setTeacherName] = useState('')
    const [duration, setDuration] = useState('')
    const [total_meeting, setTotalMeeting] = useState('')
    const [startDate, setStartDate] = useState("")
    const [listWeek, setListWeek] = useState([])
    const [tabKey, setTabKey] = useState("")
    const [listPerMeeting, setListPerMeeting] = useState([])

    const classDropdown = async () => {
        dispatch(setLoading(true))

        await ClassAPI.Dropdown()
            .then(res => {
                const resp = {
                    data: res.data
                }

                dispatch(setClassDropdown(resp))
                dispatch(setLoading(false))
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }

    const subjectDetail = async (id) => {

        const payload = {
            subject_code: id
        }

        await SubjectAPI.Detail(payload)
            .then(res => {

                const data = res.data
                setDuration(data.duration)
                setTotalMeeting(data.total_meeting)

                dispatch(setLoading(false))
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }

    const getDetail = async (id) => {

        const payload = {
            class_id: id
        }

        dispatch(setLoading(true))
        await ClassAPI.Detail(payload)
            .then(res => {

                const data = res.data
                setSubjectCode(data.subject_code)
                setSubjectName(data.subject_name)
                setTeacherNum(data.teacher_num)
                setTeacherName(data.teacher_name)

                subjectDetail(data.subject_code)
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }

    useEffect(() => {
        classDropdown()
    }, [dispatch])

    const changeClass = (_, raw) => {
        let value = raw.value.split(' - ')

        setClassName(raw.children)
        setClassID(value[0])

        getDetail(value[0])
        setTabKey("1")
    }

    const changeMeetingDate = (date, dateString, index) => {
        let meetings = [...listPerMeeting]

        const newData = {
            index,
            datetime: dateString,
            duration: Number(duration)
        }
        meetings = buildSchedulePerMeeting(meetings, index, newData)

        setListPerMeeting(meetings)
    }

    const changeMeetingStartTime = (raw, time, index) => {
        let meetings = [...listPerMeeting]

        const newData = {
            index,
            start_time: time,
            end_time: moment(raw).add(Number(duration), 'minutes').format("HH:mm"),
            duration: Number(duration)
        }
        meetings = buildSchedulePerMeeting(meetings, index, newData)

        setListPerMeeting(meetings)
    }

    const changeDate = (date, dateString) => {

        const dateData = [];
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const startDateObj = new Date(date);

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startDateObj);
            currentDate.setDate(startDateObj.getDate() + i);

            const day = daysOfWeek[currentDate.getDay()];
            const date = currentDate.toISOString().slice(0, 10);
            const start_time = "07:00";
            const end_time = moment("2023-01-01 07:00").add(Number(duration), 'minutes').format("HH:mm");
            const checked = false

            dateData.push({ day, date, start_time, end_time, checked });
        }

        setListWeek(dateData)
        setStartDate(dateString)
    }

    const onCheckedDay = (val, index) => {

        const buildData = [...listWeek]
        buildData[index].checked = val

        setListWeek(buildData)
    }

    const changeStartTime = (raw, time, index) => {

        const buildData = [...listWeek]
        buildData[index].start_time = time
        buildData[index].end_time = moment(raw).add(Number(duration), 'minutes').format("HH:mm")

        setListWeek(buildData)
    }

    const changeEndTime = (raw, time, index) => {

        const buildData = [...listWeek]
        buildData[index].start_time = time

        setListWeek(buildData)
    }

    const submit = async () => {

        let weeks = {}
        let detail_schedule = listPerMeeting

        if (tabKey == 1) {
            weeks = generateWeeklySchedule(detail_schedule)
        }
        if (tabKey == 2) {

            if (startDate == "") {
                callNotification("error", "Please fill in all the required fields to proceed.")
                return
            } else if (!listWeek.some(item => item.checked === true)) {
                callNotification("error", "Please select at least one day schedule.")
                return
            }

            weeks = buildListWeek(listWeek)

            detail_schedule = buildDetailSchedule(weeks, startDate, total_meeting, duration)
        }

        if (class_name == "" || detail_schedule.length != total_meeting) {
            callNotification("error", "Please fill in all the required fields to proceed.")
            return
        }

        const payload = {
            class_id,
            class_name,
            subject_code,
            subject_name,
            teacher_num,
            teacher_name,
            ...weeks,
            detail_schedule
        }

        dispatch(setLoading(true))
        await ClassScheduleAPI.Create(payload)
            .then(res => {
                if (res.success) {
                    push('/class-schedule')
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
                    <Breadcrumb.Item href="">Class Schedule</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Add Class Schedule</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Form layout={'horizontal'}>
                <Card className="mb-4">
                    <FormItem label="Class Name" name="Class Name" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} rules={[
                        {
                            required: true,
                            message: 'The input is required'
                        }
                    ]}>
                        <SelectComponent placeholder="Select Class Name" data={listClass} onChange={changeClass} />
                    </FormItem>
                    <FormItem label="Subject Name" name="Subject Name" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <span>{subject_name === "" ? "-" : subject_name}</span>
                    </FormItem>
                    <FormItem label="Teacher Name" name="Teacher Name" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <span>{teacher_name === "" ? "-" : teacher_name}</span>
                    </FormItem>
                    <FormItem label="Duration" name="Duration" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <span>{duration === "" ? "-" : duration}</span>
                    </FormItem>
                    <FormItem label="Total Meeting" name="Total Meeting" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                        <span>{total_meeting === "" ? "-" : total_meeting}</span>
                    </FormItem>
                </Card>

                <Card className="mb-4" title="Detail Schedule">

                    {
                        total_meeting === "" ?
                            <Alert
                                description="Inputting a date in the first week will generate the remaining dates according to the total meetings."
                                type="warning"
                                className='mb-3'
                            />
                            : <>
                                <Tabs type="card" activeKey={tabKey} onChange={(key) => setTabKey(key)}>
                                    <TabPane tab="Input one by one" key="1">
                                        {
                                            Array(total_meeting).fill().map((item, index) => {
                                                let valEndDate = getEndDate(listPerMeeting, index)
                                                return (
                                                    <FormItem key={index} label={`Meeting ${index + 1}`} name={`Meeting ${index + 1}`} labelCol={{ span: 4 }} wrapperCol={{ span: 12 }}>
                                                        <DatePicker onChange={(date, dateString) => changeMeetingDate(date, dateString, index)} style={{ marginRight: 12 }} format="YYYY-MM-DD" placeholder='Select Date' />
                                                        <TimePicker onChange={(raw, time) => changeMeetingStartTime(raw, time, index)} style={{ marginRight: 12 }} format="HH:mm" placeholder='Start Time' />
                                                        <TimePicker value={moment(valEndDate, 'HH:mm')} format="HH:mm" placeholder='End Time' disabled />
                                                    </FormItem>
                                                )
                                            })
                                        }
                                    </TabPane>
                                    <TabPane tab="Input by first week" key="2">
                                        <Alert
                                            description="Inputting a date in the first week will generate the remaining dates according to the total meetings."
                                            type="info"
                                            className='mb-3'
                                        />
                                        <FormItem label="Start Date" name="Start Date" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} rules={[
                                            {
                                                required: true,
                                                message: 'The input is required'
                                            }
                                        ]}>
                                            <DatePicker onChange={changeDate} value={moment(startDate, 'ddd, DD MMM YYYY"')} style={{ marginRight: 12, width: 300 }} format="ddd, DD MMM YYYY" placeholder="Select Start Date" />
                                        </FormItem>

                                        <Row className='mb-2'>
                                            <Col sm={4} style={{ textAlign: 'center' }}><h6>{'Day'}</h6></Col>
                                            <Col sm={12}>
                                                <Row>
                                                    <h6 style={{ width: 180, textAlign: 'center' }}>{'Date'}</h6>
                                                    <h6 style={{ width: 130, textAlign: 'center' }}>{'Start Time'}</h6>
                                                    <h6 style={{ width: 130, textAlign: 'center' }}>{'End Time'}</h6>
                                                </Row>
                                            </Col>
                                        </Row>
                                        {
                                            listWeek.map((item, index) => (
                                                <FormItem key={index} label={item.day} name={item.day} labelCol={{ span: 4 }} wrapperCol={{ span: 12 }}>
                                                    <Checkbox style={{ marginRight: 12 }} onChange={(e) => onCheckedDay(e.target.checked, index)} />
                                                    <DatePicker value={moment(item.date, 'YYYY-MM-DD')} style={{ marginRight: 12, width: 138 }} format="YYYY-MM-DD" placeholder='Select Date' disabled />
                                                    <TimePicker value={moment(item.start_time, 'HH:mm')} style={{ marginRight: 12, width: 121 }} onChange={(raw, time) => changeStartTime(raw, time, index)} format="HH:mm" placeholder='Start Time' minuteStep={15} bordered />
                                                    <TimePicker value={moment(item.end_time, 'HH:mm')} style={{ width: 121 }} onChange={(raw, time) => changeEndTime(raw, time, index)} format="HH:mm" placeholder='End Time' minuteStep={15} bordered disabled />
                                                </FormItem>
                                            ))
                                        }
                                    </TabPane>
                                </Tabs>
                                <FormItem wrapperCol={{ span: 14, offset: 4 }}>
                                    <Button type="primary" onClick={submit}>Submit</Button>
                                </FormItem>
                            </>
                    }

                </Card>
            </Form>
            <Card className="mb-4 ant-picker-calendar-header">
                <Button type="default" onClick={() => push('/class-schedule')}>Back</Button>
            </Card>
        </div>
    )
}

export default AddClassSchedule