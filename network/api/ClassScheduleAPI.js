import API from "../AxiosCall"
import apiUrl from "../apiUrl"
import { DummyListClassSchedule, generatedID } from "../mockup/class-schedule"
import { callNotification, deleteData, filter, sortData, updateData } from "../mockup/utils"

export default class ClassScheduleAPI {

    static List(payload) {
        // Build query parameters based on the payload
        let params = '';
        if (payload.sortBy) {
            params += `?sortBy=${(payload.sortBy ? encodeURIComponent((String(payload.sortBy).replace('%', '\\%')).trim()) : '')}`;
        }
        if (payload.sortType) {
            params += `&sortType=${(payload.sortType ? encodeURIComponent((String(payload.sortType).replace('%', '\\%')).trim()) : '')}`;
        }
    
        return new Promise(((resolve, reject) => {
            API.get(apiUrl.class_schedule.list + params, {}) // Make a GET request to retrieve a list of class schedules
                .then((result) => {
                    const data = result.data;
                    if (data.code === 200) {
                        resolve({ data: data.data, success: true }); // Resolve with successful response
                    } else {
                        callNotification('error', 'Failed to retrieve the list of data.');
                        resolve({ data, success: false }); // Resolve with unsuccessful response
                    }
                }, (err) => {
                    // Handle errors or simulate data retrieval from the mockup
                    setTimeout(() => {
                        const data = DummyListClassSchedule;
    
                        let buildRes = data.data;
                        for (let key in payload) {
                            if (key !== 'sortBy' && key !== 'sortType' && payload[key] != '') {
                                buildRes = filter(buildRes, key, payload[key]);
                            }
                        }
    
                        if (data.code === 200) {
                            resolve({ data: sortData(buildRes, payload.sortBy, payload.sortType, 'schedule_id'), success: true });
                        } else {
                            callNotification('error', 'Failed to retrieve the list of data.');
                            resolve({ data, success: false });
                        }
                    }, 250);
                });
        }))
    }
    
    static Create(payload) {
        const newPayload = {
            schedule_id: String(Number(generatedID) + 1),
            ...payload
        };
    
        return new Promise(((resolve, reject) => {
            API.post(apiUrl.class.create, newPayload, {}) // Make a POST request to create a class schedule
                .then((result) => {
                    const data = result.data;
                    if (data.code === 200) {
                        resolve({ success: true }); // Resolve with successful response
                    } else {
                        callNotification('error', 'Failed to create the data.');
                        resolve({ success: false }); // Resolve with unsuccessful response
                    }
                }, (err) => {
                    // Handle errors or simulate data creation in the mockup
                    setTimeout(() => {
                        const data = DummyListClassSchedule;
    
                        let buildRes = data.data;
                        buildRes = filter(buildRes, 'schedule_id', newPayload.schedule_id);
    
                        if (buildRes.length > 0) {
                            callNotification('error', 'Schedule ID is already available. You may want to consider using an alternative Schedule ID.');
                            resolve({ success: false });
                        }
    
                        buildRes = [payload, ...data.data];
    
                        DummyListClassSchedule.data = buildRes;
                        if (data.code === 200) {
                            callNotification('success', 'Success! Create data was completed successfully.');
                            resolve({ success: true }); // Resolve with successful response
                        } else {
                            callNotification('error', 'Failed to create the data.');
                            resolve({ success: false }); // Resolve with unsuccessful response
                        }
                    }, 250);
                });
        }))
    }    

    static Detail(payload) {
        let params = payload.schedule_id;
    
        return new Promise(((resolve, reject) => {
            API.get(apiUrl.class_schedule.detail + params, {}) // Make a GET request to retrieve details of a class schedule
                .then((result) => {
                    const data = result.data;
                    if (data.code === 200) {
                        resolve({ data: data.data, success: true }); // Resolve with successful response
                    } else {
                        callNotification('error', 'Failed to get detail data.');
                        resolve({ data, success: false }); // Resolve with unsuccessful response
                    }
                }, (err) => {
                    // Handle errors or simulate data retrieval from the mockup
                    setTimeout(() => {
                        const data = DummyListClassSchedule;
    
                        let buildRes = data.data;
                        buildRes = filter(buildRes, 'schedule_id', params);
    
                        if (data.code === 200) {
                            resolve({ data: buildRes[0], success: true });
                        } else {
                            callNotification('error', 'Failed to get detail data.');
                            resolve({ data, success: false });
                        }
                    }, 250);
                });
        }))
    }

    static Update(payload) {

        return new Promise(((resolve, reject) => {
            API.post(apiUrl.class_schedule.update, payload, {}) // Make a POST request to update a class schedule
                .then((result) => {
                    const data = result.data;
                    if (data.code === 200) {
                        resolve({ success: true }); // Resolve with successful response
                    } else {
                        callNotification('error', 'Failed to update data.');
                        resolve({ data, success: false }); // Resolve with unsuccessful response
                    }
                }, (err) => {
                    // Handle errors or simulate data update in the mockup
                    setTimeout(() => {
                        const data = DummyListClassSchedule;
    
                        let buildRes = data.data;
                        buildRes = updateData(buildRes, 'schedule_id', payload.id, payload.data);
    
                        DummyListClassSchedule.data = buildRes;
                        if (data.code === 200) {
                            callNotification('success', 'Success! Update data was completed successfully.');
                            resolve({ success: true });
                        } else {
                            callNotification('error', 'Failed to update data.');
                            resolve({ success: false });
                        }
                    }, 250);
                });
        }))
    }

    static Delete(payload) {

        return new Promise(((resolve, reject) => {
            API.post(apiUrl.class_schedule.delete, payload, {}) // Make a POST request to delete a class schedule
                .then((result) => {
                    const data = result.data;
                    if (data.code === 200) {
                        resolve({ data: null, success: true }); // Resolve with successful response
                    } else {
                        resolve({ success: false, message: 'An error occurred while deleting the data.' });
                    }
                }, (err) => {
                    // Handle errors or simulate data deletion in the mockup
                    setTimeout(() => {
                        const data = DummyListClassSchedule;
    
                        let buildRes = data.data;
                        buildRes = deleteData(buildRes, 'schedule_id', payload.id);
    
                        DummyListClassSchedule.data = buildRes;
                        if (data.code === 200) {
                            callNotification('success', 'Success! Delete data was completed successfully.');
                            resolve({ data: null, success: true });
                        } else {
                            callNotification('error', 'An error occurred while deleting the data.');
                            resolve({ success: false });
                        }
                    }, 250);
                });
        }))
    }
}