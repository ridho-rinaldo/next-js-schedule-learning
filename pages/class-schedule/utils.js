import moment from "moment"

export const buildListWeek = (listWeek) => {
    let defaultData = {
        "monday": "",
        "tuesday": "",
        "wednesday": '',
        "thursday": "",
        "friday": '',
        "saturday": '',
        "sunday": ""
    }
    if (listWeek.length == 0) {
        return defaultData
    }

    listWeek.map((item) => {
        if (item.checked) {
            defaultData[String(item.day).toLocaleLowerCase()] = `${item.start_time} - ${item.end_time}`
        }
    })

    return defaultData
}

export const buildSchedulePerMeeting = (meetings, index, newData) => {

    let i = 0
    for (let item of meetings) {
        if ((item.index || i) === index) {
            meetings[index] = {
                ...meetings[index],
                ...newData
            }
            break
        }
        i++

        if (meetings.length == i) {
            meetings.push(newData)
        }
    }

    if (meetings.length === 0) {
        meetings.push(newData)
    }
    return meetings
}

export const getEndDate = (listPerMeeting, index) => {
    let end_time = "00:00"
    for (let data of listPerMeeting) {
        if (data.index == index && data.end_time != undefined) {
            end_time = data.end_time
            continue
        }
    }
    return end_time
}

export const generateWeeklySchedule = (data) => {
    // Inisialisasi objek jadwal mingguan dengan hari-hari kosong
    const weeklySchedule = {
        "monday": "",
        "tuesday": "",
        "wednesday": "",
        "thursday": "",
        "friday": "",
        "saturday": "",
        "sunday": ""
    };

    // Daftar hari dalam bahasa Inggris
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    // Iterasi melalui data dan mengisi jadwal mingguan sesuai dengan data yang diberikan
    data.forEach(item => {
        const date = new Date(item.datetime);
        const dayOfWeek = daysOfWeek[date.getDay()].toLowerCase();
        const timeRange = `${item.start_time} - ${item.end_time}`;

        // Periksa apakah hari dalam jadwal mingguan dan jadwal belum diisi
        if (weeklySchedule.hasOwnProperty(dayOfWeek) && !weeklySchedule[dayOfWeek]) {
            weeklySchedule[dayOfWeek] = timeRange;
        }
    });

    return weeklySchedule;
}

export const buildDetailSchedule = (listWeek, startDate, totalMeetings, duration) => {
    // Parse the start date from the input data
    const date = moment(startDate, 'dddd, DD MMM YYYY');

    // Create an empty array to store the schedule
    const schedule = [];
    // Initialize the current date as the start date
    let currentDate = date.clone();

    // Continue generating meetings until the desired total is reached
    while (schedule.length < Number(totalMeetings)) {
        // Get the day of the week for the current date (e.g., "monday")
        const dayOfWeek = currentDate.format('dddd').toLowerCase();

        // Check if the day has a schedule (not empty)
        if (listWeek[dayOfWeek]) {

            // Split the time range into start and end times
            const [startTime, endTime] = listWeek[dayOfWeek].split(' - ');
            // Create a meeting object with day, date, and time information
            const meeting = {
                datetime: currentDate.format('YYYY-MM-DD'),
                start_time: startTime,
                end_time: endTime,
                duration: Number(duration)
            };
            // Add the meeting to the schedule
            schedule.push(meeting);
        }

        // Move to the next day
        currentDate.add(1, 'days');
    }

    return schedule;
}

export const getListMeeting = (listPerMeeting, index, val) => {
    let result = "00:00"
    listPerMeeting.map((item, dataIndex) => {
        if (dataIndex == index && item[val] != undefined) {
            result = item[val]
        }
    })

    return result
}