import API from "../AxiosCall"
import apiUrl from "../apiUrl"
import { DummyListSubject } from "../mockup/subject"
import { callNotification, deleteData, filter, sortData, updateData } from "../mockup/utils"

export default class SubjectAPI {

    static List(payload) {
        // Build query parameters based on the payload
        let params = '';
        if (payload.sortBy) {
            params += `?sortBy=${(payload.sortBy ? encodeURIComponent((String(payload.sortBy).replace('%', '\\%')).trim()) : '')}`;
        }
        if (payload.sortType) {
            params += `&sortType=${(payload.sortType ? encodeURIComponent((String(payload.sortType).replace('%', '\\%')).trim()) : '')}`;
        }
        if (payload.subject_code) {
            params += `&subject_code=${(payload.subject_code ? encodeURIComponent((String(payload.subject_code).replace('%', '\\%')).trim()) : '')}`;
        }
        if (payload.subject_name) {
            params += `&subject_name=${(payload.subject_name ? encodeURIComponent((String(payload.subject_name).replace('%', '\\%')).trim()) : '')}`;
        }
        if (payload.duration) {
            params += `&duration=${(payload.duration ? encodeURIComponent((String(payload.duration).replace('%', '\\%')).trim()) : '')}`;
        }
        if (payload.total_meeting) {
            params += `&total_meeting=${(payload.total_meeting ? encodeURIComponent((String(payload.total_meeting).replace('%', '\\%')).trim()) : '')}`;
        }
    
        return new Promise(((resolve, reject) => {
            API.get(apiUrl.subject.list + params, {}) // Make a GET request to retrieve the list of subjects
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
                        const data = DummyListSubject;
    
                        let buildRes = data.data;
                        for (let key in payload) {
    
                            if (key !== 'sortBy' && key !== 'sortType' && payload[key] != '') {
                                buildRes = filter(buildRes, key, payload[key]);
                            }
                        }
    
                        if (data.code === 200) {
                            resolve({ data: sortData(buildRes, payload.sortBy, payload.sortType, 'subject_code'), success: true });
                        } else {
                            callNotification('error', 'Failed to retrieve the list of data.');
                            resolve({ data, success: false });
                        }
                    }, 250);
                });
        }));
    }
    
    static Create(payload) {
        // Handling subject creation, but the API endpoint should match the subject API
        
        return new Promise(((resolve, reject) => {
            API.post(apiUrl.subject.create, payload, {}) // Make a POST request to create a subject
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
                        const data = DummyListSubject;
    
                        let buildRes = data.data;
                        buildRes = filter(buildRes, 'subject_code', payload.subject_code);
    
                        if (buildRes.length > 0) {
                            callNotification('error', 'Subject Code is already available. You may want to consider using an alternative Subject Code.');
                            resolve({ success: false });
                        }
    
                        buildRes = [payload, ...data.data];
    
                        DummyListSubject.data = buildRes;
                        if (data.code === 200) {
                            callNotification('success', 'Success! Create data was completed successfully.');
                            resolve({ success: true });
                        } else {
                            callNotification('error', 'Failed to create the data.');
                            resolve({ success: false });
                        }
                    }, 250);
                });
        }));
    }
    
    static Detail(payload) {
        let params = payload.subject_code;
    
        return new Promise(((resolve, reject) => {
            API.get(apiUrl.subject.detail + params, {}) // Make a GET request to retrieve details of a subject
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
                        const data = DummyListSubject;
    
                        let buildRes = data.data;
                        buildRes = filter(buildRes, 'subject_code', params);
    
                        if (data.code === 200) {
                            resolve({ data: buildRes[0], success: true });
                        } else {
                            callNotification('error', 'Failed to get detail data.');
                            resolve({ data, success: false });
                        }
                    }, 250);
                });
        }));
    }
    
    static Update(payload) {
        return new Promise(((resolve, reject) => {
            API.post(apiUrl.subject.update, payload, {})
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
                        const data = DummyListSubject;
    
                        let buildRes = data.data;
                        buildRes = updateData(buildRes, 'subject_code', payload.id, payload.data);
    
                        DummyListSubject.data = buildRes;
                        if (data.code === 200) {
                            callNotification('success', 'Success! Update data was completed successfully.');
                            resolve({ success: true });
                        } else {
                            callNotification('error', 'Failed to update data.');
                            resolve({ success: false });
                        }
                    }, 250);
                });
        }));
    }
    
    static Delete(payload) {
        return new Promise(((resolve, reject) => {
            API.post(apiUrl.subject.delete, payload, {})
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
                        const data = DummyListSubject;
    
                        let buildRes = data.data;
                        buildRes = deleteData(buildRes, 'subject_code', payload.id);
    
                        DummyListSubject.data = buildRes;
                        if (data.code === 200) {
                            callNotification('success', 'Success! Delete data was completed successfully.');
                            resolve({ data: null, success: true });
                        } else {
                            callNotification('error', 'An error occurred while deleting the data.');
                            resolve({ success: false });
                        }
                    }, 250);
                });
        }));
    }
    
    static Dropdown(payload) {
        return new Promise(((resolve, reject) => {
            API.get(apiUrl.subject.dropdown, {})
                .then((result) => {
                    const data = result.data;
                    if (data.code === 200) {
                        resolve({ data: null, success: true }); // Resolve with successful response
                    } else {
                        resolve({ success: false, message: 'Error while getting dropdown data' });
                    }
                }, (err) => {
                    // Handle errors or simulate building dropdown data in the mockup
                    setTimeout(() => {
                        const data = DummyListSubject;
    
                        let buildRes = data.data;
                        buildRes = buildDropdown(buildRes, 'subject_code', 'subject_name');
    
                        if (data.code === 200) {
                            resolve({ data: buildRes, success: true });
                        } else {
                            callNotification('error', 'Error while getting dropdown data');
                            resolve({ data: [], success: false });
                        }
                    }, 250);
                });
        }));
    }
    
}

// Utility function to create a dropdown list
const buildDropdown = (data = [], key, value) => {
    const build = []

    data.map((item) => {
        build.push({
            value: `${item[key]} - ${item[value]}`,
            label: item[value]
        })
    })

    return build
}