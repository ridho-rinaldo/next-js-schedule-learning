import API from "../AxiosCall"
import apiUrl from "../apiUrl"
import { DummyListClass, generatedID } from "../mockup/class"
import { DummyListClassSchedule } from "../mockup/class-schedule"
import { callNotification, deleteData, filter, sortData, updateData } from "../mockup/utils"

export default class ClassAPI {

    static List(payload) {
        let params = ''

        if (payload.sortBy) {
            params += `?sortBy=${(payload.sortBy ? encodeURIComponent((String(payload.sortBy).replace('%', '\\%')).trim()) : "")}`
        }
        if (payload.sortType) {
            params += `&sortType=${(payload.sortType ? encodeURIComponent((String(payload.sortType).replace('%', '\\%')).trim()) : "")}`
        }
        if (payload.subject_code) {
            params += `&subject_code=${(payload.subject_code ? encodeURIComponent((String(payload.subject_code).replace('%', '\\%')).trim()) : "")}`
        }
        if (payload.subject_name) {
            params += `&subject_name=${(payload.subject_name ? encodeURIComponent((String(payload.subject_name).replace('%', '\\%')).trim()) : "")}`
        }
        if (payload.duration) {
            params += `&duration=${(payload.duration ? encodeURIComponent((String(payload.duration).replace('%', '\\%')).trim()) : "")}`
        }
        if (payload.total_meeting) {
            params += `&total_meeting=${(payload.total_meeting ? encodeURIComponent((String(payload.total_meeting).replace('%', '\\%')).trim()) : "")}`
        }

        return new Promise(((resolve, reject) => {
            API.get(apiUrl.class.list + params, {})
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ data: data.data, success: true })
                    } else {
                        callNotification('error', "Failed to retrieve the list of data.")
                        resolve({ data, success: false })
                    }
                }, (err) => {
                    setTimeout(() => {
                        const data = DummyListClass

                        let buildRes = data.data
                        for (let key in payload) {

                            if (key !== "sortBy" && key !== "sortType" && payload[key] != "") {
                                buildRes = filter(buildRes, key, payload[key])
                            }
                        }

                        if (data.code === 200) {
                            resolve({ data: sortData(buildRes, payload.sortBy, payload.sortType, "class_id"), success: true })
                        } else {
                            callNotification('error', "Failed to retrieve the list of data.")
                            resolve({ data, success: false })
                        }
                    }, 250);
                })
        }))
    }

    static Create(payload) {

        const newPayload = {
            class_id: String(Number(generatedID) + 1),
            ...payload
        }

        return new Promise(((resolve, reject) => {
            API.post(apiUrl.class.create, newPayload, {})
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ success: true })
                    } else {
                        callNotification('error', "Failed to create the data.")
                        resolve({ success: false })
                    }
                }, (err) => {
                    setTimeout(() => {
                        const data = DummyListClass

                        let buildRes = data.data
                        buildRes = filter(buildRes, 'class_id', newPayload.class_id)

                        if (buildRes.length > 0) {
                            callNotification('error', "Class ID is already available. You may want to consider using an alternative Class ID.")
                            resolve({ success: false })
                        }

                        buildRes = [
                            payload, ...data.data
                        ]

                        DummyListClass.data = buildRes
                        if (data.code === 200) {
                            callNotification('success', "Success! Create data was completed successfully.")
                            resolve({ success: true })
                        } else {
                            callNotification('error', "Failed to create the data.")
                            resolve({ success: false })
                        }
                    }, 250);
                })
        }))
    }

    static Detail(payload) {
        let params = payload.class_id

        return new Promise(((resolve, reject) => {
            API.get(apiUrl.class.detail + params, {})
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ data: data.data, success: true })
                    } else {
                        callNotification('error', "Failed to get detail data.")
                        resolve({ data, success: false })
                    }
                }, (err) => {
                    setTimeout(() => {
                        const data = DummyListClass

                        let buildRes = data.data
                        buildRes = filter(buildRes, 'class_id', params)

                        if (data.code === 200) {
                            resolve({ data: buildRes[0], success: true })
                        } else {
                            callNotification('error', "Failed to get detail data.")
                            resolve({ data, success: false })
                        }
                    }, 250);
                })
        }))
    }

    static Update(payload) {

        return new Promise(((resolve, reject) => {
            API.post(apiUrl.class.update, payload, {})
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ success: true })
                    } else {
                        callNotification('error', "Failed to update data.")
                        resolve({ data, success: false })
                    }
                }, (err) => {
                    setTimeout(() => {
                        const data = DummyListClass

                        let buildRes = data.data
                        buildRes = updateData(buildRes, 'class_id', payload.id, payload.data)

                        DummyListClass.data = buildRes
                        if (data.code === 200) {
                            callNotification('success', "Success! Update data was completed successfully.")
                            resolve({ success: true })
                        } else {
                            callNotification('error', "Failed to update data.")
                            resolve({ success: false })
                        }
                    }, 250);
                })
        }))
    }

    static Delete(payload) {

        return new Promise(((resolve, reject) => {
            API.post(apiUrl.class.delete, payload, {})
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ data: null, success: true })
                    } else {
                        resolve({ success: false, message: "An error occurred while deleting the data." })
                    }
                }, (err) => {
                    setTimeout(() => {
                        const data = DummyListClass

                        let buildRes = data.data
                        buildRes = deleteData(buildRes, 'class_id', payload.id)

                        DummyListClass.data = buildRes
                        if (data.code === 200) {
                            callNotification('success', "Success! Delete data was completed successfully.")
                            resolve({ data: null, success: true })
                        } else {
                            callNotification('error', "An error occurred while deleting the data.")
                            resolve({ success: false })
                        }
                    }, 250);
                })
        }))
    }

    static Dropdown() {

        return new Promise(((resolve, reject) => {
            API.get(apiUrl.class.dropdown, {})
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ data: null, success: true })
                    } else {
                        resolve({ success: false, message: "Error while get dropdown data" })
                    }
                }, (err) => {
                    setTimeout(() => {
                        const data = DummyListClass

                        let buildRes = data.data
                        buildRes = buildDropdown(buildRes, 'class_id', 'class_name')

                        if (data.code === 200) {
                            resolve({ data: buildRes, success: true })
                        } else {
                            callNotification('error', "Error while get dropdown data")
                            resolve({ data: [], success: false })
                        }
                    }, 250);
                })
        }))
    }
}

// Create response for dropdown
const buildDropdown = (data = [], key, value) => {
    const build = []

    data.map((item) => {
        let isExist = false
        for (let cls of DummyListClassSchedule.data) {
            if (cls.class_id == item.class_id) {
                isExist = true
                continue
            } 
        }
        if (item.status && !isExist) {
            build.push({
                value: `${item[key]} - ${item[value]}`,
                label: item[value]
            })
        }
    })

    return build
}