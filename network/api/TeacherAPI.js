import API from "../AxiosCall"
import apiUrl from "../apiUrl"
import { DummyListClass } from "../mockup/class"
import { DummyListTeacher } from "../mockup/teacher"
import { callNotification, deleteData, filter, sortData, updateData } from "../mockup/utils"

export default class TeacherAPI {

    static List(payload) {
        // Build query parameters based on the payload
        let params = ''
        if (payload.sortBy) {
            params += `?sortBy=${(payload.sortBy ? encodeURIComponent((String(payload.sortBy).replace('%', '\\%')).trim()) : "")}`
        }
        if (payload.sortType) {
            params += `&sortType=${(payload.sortType ? encodeURIComponent((String(payload.sortType).replace('%', '\\%')).trim()) : "")}`
        }
        if (payload.teacher_num) {
            params += `&teacher_num=${(payload.teacher_num ? encodeURIComponent((String(payload.teacher_num).replace('%', '\\%')).trim()) : "")}`
        }
        if (payload.teacher_name) {
            params += `&teacher_name=${(payload.teacher_name ? encodeURIComponent((String(payload.teacher_name).replace('%', '\\%')).trim()) : "")}`
        }
        if (payload.title) {
            params += `&title=${(payload.title ? encodeURIComponent((String(payload.title).replace('%', '\\%')).trim()) : "")}`
        }
        if (payload.status) {
            params += `&status=${(payload.status ? encodeURIComponent((String(payload.status).replace('%', '\\%')).trim()) : "")}`
        }

        return new Promise(((resolve, reject) => {
            API.get(apiUrl.teacher.list + params, {}) // Make a GET request to retrieve the list of subjects
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ data: data.data, success: true }) // Resolve with successful response
                    } else {
                        callNotification('error', "Failed to retrieve the list of data.")
                        resolve({ data, success: false }) // Resolve with unsuccessful response
                    }
                }, (err) => {
                    // Handle errors or simulate data retrieval from the mockup
                    setTimeout(() => {
                        const data = DummyListTeacher

                        let buildRes = data.data
                        for (let key in payload) {

                            if (key !== "sortBy" && key !== "sortType" && payload[key] != "") {
                                buildRes = filter(buildRes, key, payload[key])
                            }
                        }

                        if (data.code === 200) {
                            resolve({ data: sortData(buildRes, payload.sortBy, payload.sortType, "teacher_num"), success: true })
                        } else {
                            callNotification('error', "Failed to retrieve the list of data.")
                            resolve({ data, success: false })
                        }
                    }, 250);
                })
        }))
    }

    static Create(payload) {
        // Handling subject creation, but the API endpoint should match the subject API

        return new Promise(((resolve, reject) => {
            API.post(apiUrl.teacher.create, payload, {}) // Make a POST request to create a subject
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ success: true }) // Resolve with successful response
                    } else {
                        callNotification('error', "Failed to create the data.")
                        resolve({ success: false }) // Resolve with unsuccessful response
                    }
                }, (err) => {
                    // Handle errors or simulate data creation in the mockup
                    setTimeout(() => {
                        const data = DummyListTeacher

                        let buildRes = data.data
                        buildRes = filter(buildRes, 'teacher_num', payload.teacher_num)

                        if (buildRes.length > 0) {
                            callNotification('error', "TRN is already available. You may want to consider using an alternative TRN.")
                            resolve({ success: false })
                        }

                        buildRes = [
                            payload, ...data.data
                        ]

                        DummyListTeacher.data = buildRes
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
        let params = payload.teacher_num

        return new Promise(((resolve, reject) => {
            API.get(apiUrl.teacher.detail + params, {}) // Make a GET request to retrieve details of a subject
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ data: data.data, success: true }) // Resolve with successful response
                    } else {
                        callNotification('error', "Failed to get detail data.")
                        resolve({ data, success: false }) // Resolve with unsuccessful response
                    }
                }, (err) => {
                    // Handle errors or simulate data retrieval from the mockup
                    setTimeout(() => {
                        const data = DummyListTeacher

                        let buildRes = data.data
                        buildRes = filter(buildRes, 'teacher_num', params)

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
            API.post(apiUrl.teacher.update, payload, {})
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ success: true }) // Resolve with successful response
                    } else {
                        callNotification('error', "Failed to update data.")
                        resolve({ data, success: false }) // Resolve with unsuccessful response
                    }
                }, (err) => {
                     // Handle errors or simulate data update in the mockup
                    setTimeout(() => {
                        const data = DummyListTeacher

                        let buildRes = data.data
                        buildRes = updateData(buildRes, 'teacher_num', payload.id, payload.data)

                        DummyListTeacher.data = buildRes
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
            API.post(apiUrl.teacher.delete, payload, {})
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ data: null, success: true }) // Resolve with successful response
                    } else {
                        resolve({ success: false, message: "An error occurred while deleting the data." })
                    }
                }, (err) => {
                    // Handle errors or simulate data deletion in the mockup
                    setTimeout(() => {
                        const data = DummyListTeacher

                        let buildRes = data.data
                        buildRes = deleteData(buildRes, 'teacher_num', payload.id)

                        DummyListTeacher.data = buildRes
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
            API.get(apiUrl.teacher.dropdown, {})
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ data: null, success: true }) // Resolve with successful response
                    } else {
                        resolve({ success: false, message: "Error while get dropdown data" })
                    }
                }, (err) => {
                    // Handle errors or simulate building dropdown data in the mockup
                    setTimeout(() => {
                        const data = DummyListTeacher

                        let buildRes = data.data
                        buildRes = buildDropdown(buildRes, 'teacher_num', 'teacher_name', 'title')

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

    static UnassignedList(payload) {
        // Build query parameters based on the payload
        let params = ''
        if (payload.sortBy) {
            params += `?sortBy=${(payload.sortBy ? encodeURIComponent((String(payload.sortBy).replace('%', '\\%')).trim()) : "")}`
        }
        if (payload.sortType) {
            params += `&sortType=${(payload.sortType ? encodeURIComponent((String(payload.sortType).replace('%', '\\%')).trim()) : "")}`
        }
        
        return new Promise(((resolve, reject) => {
            API.get(apiUrl.teacher.unassigned + params, {})
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ data: null, success: true }) // Resolve with successful response
                    } else {
                        resolve({ success: false, message: "Error while get data" })
                    }
                }, (err) => {
                    // Handle errors or simulate building dropdown data in the mockup
                    setTimeout(() => {
                        const data = DummyListTeacher

                        let buildRes = data.data
                        buildRes = unassignedList()

                        if (data.code === 200) {
                            resolve({ data: sortData(buildRes, payload.sortBy, payload.sortType, "teacher_num"), success: true })
                        } else {
                            callNotification('error', "Error while get data")
                            resolve({ data: [], success: false })
                        }
                    }, 250);
                })
        }))
    }
}

// Create response for dropdown
const buildDropdown = (data = [], key, value, extra) => {
    const build = []

    data.map((item) => {
        if (item.status) {
            build.push({
                value: `${item[key]} - ${item[value]} - ${item[extra]}`,
                label: item[value]
            })
        }
    })

    return build
}

// Create response for unassigned teacher
const unassignedList = () => {
    const teacher = DummyListTeacher.data
    const classList = DummyListClass.data
    const filteredTeacher = teacher.filter(teacherItem => {
        if (teacherItem.status) {
            return !classList.some(classItem => classItem.teacher_num === teacherItem.teacher_num);
        }
    });

    return filteredTeacher
}
