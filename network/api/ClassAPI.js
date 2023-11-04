import API from "../AxiosCall"
import apiUrl from "../apiUrl"
import { DummyListClass, generatedID } from "../mockup/class" 
import { DummyListClassSchedule } from "../mockup/class-schedule"
import { callNotification, deleteData, filter, sortData, updateData } from "../mockup/utils"

export default class ClassAPI {

    static List(payload) {
        // Build query parameters based on the payload
        let params = '';
        if (payload.sortBy) {
            params += `?sortBy=${(payload.sortBy ? encodeURIComponent((String(payload.sortBy).replace('%', '\\%')).trim()) : "")}`;
        }
        if (payload.sortType) {
            params += `&sortType=${(payload.sortType ? encodeURIComponent((String(payload.sortType).replace('%', '\\%')).trim()) : "")}`;
        }
        if (payload.subject_code) {
            params += `&subject_code=${(payload.subject_code ? encodeURIComponent((String(payload.subject_code).replace('%', '\\%')).trim()) : "")}`;
        }

        return new Promise(((resolve, reject) => {
            API.get(apiUrl.class.list + params, {}) // Make a GET request to the list endpoint with query parameters
                .then((result) => {
                    const data = result.data;
                    if (data.code === 200) {
                        resolve({ data: data.data, success: true }); // Resolve with successful response
                    } else {
                        callNotification('error', "Failed to retrieve the list of data.");
                        resolve({ data, success: false }); // Resolve with unsuccessful response
                    }
                }, (err) => {
                    // Handle errors or simulate data retrieval from the mockup
                    setTimeout(() => {
                        const data = DummyListClass;
                        let buildRes = data.data;
                        for (let key in payload) {
                            if (key !== "sortBy" && key !== "sortType" && payload[key] != "") {
                                buildRes = filter(buildRes, key, payload[key]);
                            }
                        }
                        if (data.code === 200) {
                            resolve({ data: sortData(buildRes, payload.sortBy, payload.sortType, "class_id"), success: true });
                        } else {
                            callNotification('error', "Failed to retrieve the list of data.");
                            resolve({ data, success: false });
                        }
                    }, 250);
                });
        }));
    }

    static Create(payload) {
        // Generate a new class ID and update the payload
        const newPayload = {
            class_id: String(Number(generatedID) + 1),
            ...payload
        };

        return new Promise(((resolve, reject) => {
            API.post(apiUrl.class.create, newPayload, {}) // Make a POST request to the create endpoint
                .then((result) => {
                    const data = result.data;
                    if (data.code === 200) {
                        resolve({ success: true }); // Resolve with successful response
                    } else {
                        callNotification('error', "Failed to create the data.");
                        resolve({ success: false }); // Resolve with unsuccessful response
                    }
                }, (err) => {
                    // Handle errors or simulate data creation in the mockup
                    setTimeout(() => {
                        const data = DummyListClass;
                        let buildRes = data.data;
                        buildRes = filter(buildRes, 'class_id', newPayload.class_id);
                        if (buildRes.length > 0) {
                            callNotification('error', "Class ID is already available. You may want to consider using an alternative Class ID.");
                            resolve({ success: false });
                        }
                        buildRes = [
                            payload, ...data.data
                        ];
                        DummyListClass.data = buildRes;
                        if (data.code === 200) {
                            callNotification('success', "Success! Create data was completed successfully.");
                            resolve({ success: true });
                        } else {
                            callNotification('error', "Failed to create the data.");
                            resolve({ success: false });
                        }
                    }, 250);
                });
        }));
    }

    static Detail(payload) {
        let params = payload.class_id;

        return new Promise(((resolve, reject) => {
            API.get(apiUrl.class.detail + params, {}) // Make a GET request to retrieve class details
                .then((result) => {
                    const data = result.data;
                    if (data.code === 200) {
                        resolve({ data: data.data, success: true }); // Resolve with successful response
                    } else {
                        callNotification('error', "Failed to get detail data.");
                        resolve({ data, success: false }); // Resolve with unsuccessful response
                    }
                }, (err) => {
                    // Handle errors or simulate data retrieval from the mockup
                    setTimeout(() => {
                        const data = DummyListClass;
                        let buildRes = data.data;
                        buildRes = filter(buildRes, 'class_id', params);
                        if (data.code === 200) {
                            resolve({ data: buildRes[0], success: true }); // Resolve with retrieved details
                        } else {
                            callNotification('error', "Failed to get detail data.");
                            resolve({ data, success: false }); // Resolve with unsuccessful response
                        }
                    }, 250);
                });
        }))
    }

    static Update(payload) {
        return new Promise(((resolve, reject) => {
            API.post(apiUrl.class.update, payload, {}) // Make a POST request to update class data
                .then((result) => {
                    const data = result.data;
                    if (data.code === 200) {
                        resolve({ success: true }); // Resolve with successful response
                    } else {
                        callNotification('error', "Failed to update data.");
                        resolve({ data, success: false }); // Resolve with unsuccessful response
                    }
                }, (err) => {
                    // Handle errors or simulate data update in the mockup
                    setTimeout(() => {
                        const data = DummyListClass;
                        let buildRes = data.data;
                        buildRes = updateData(buildRes, 'class_id', payload.id, payload.data);
                        DummyListClass.data = buildRes;
                        if (data.code === 200) {
                            callNotification('success', "Success! Update data was completed successfully.");
                            resolve({ success: true }); // Resolve with successful response
                        } else {
                            callNotification('error', "Failed to update data.");
                            resolve({ success: false }); // Resolve with unsuccessful response
                        }
                    }, 250);
                });
        }))
    }

    static Delete(payload) {
        return new Promise(((resolve, reject) => {
            API.post(apiUrl.class.delete, payload, {}) // Make a POST request to delete class data
                .then((result) => {
                    const data = result.data;
                    if (data.code === 200) {
                        resolve({ data: null, success: true }); // Resolve with successful response
                    } else {
                        resolve({ success: false, message: "An error occurred while deleting the data." });
                    }
                }, (err) => {
                    // Handle errors or simulate data deletion in the mockup
                    setTimeout(() => {
                        const data = DummyListClass;
                        let buildRes = data.data;
                        buildRes = deleteData(buildRes, 'class_id', payload.id);
                        DummyListClass.data = buildRes;
                        if (data.code === 200) {
                            callNotification('success', "Success! Delete data was completed successfully.");
                            resolve({ data: null, success: true }); // Resolve with successful response
                        } else {
                            callNotification('error', "An error occurred while deleting the data.");
                            resolve({ success: false }); // Resolve with unsuccessful response
                        }
                    }, 250);
                });
        }))
    }

    static Dropdown() {
        return new Promise(((resolve, reject) => {
            API.get(apiUrl.class.dropdown, {}) // Make a GET request to get a dropdown list of classes
                .then((result) => {
                    const data = result.data;
                    if (data.code === 200) {
                        resolve({ data: null, success: true }); // Resolve with successful response
                    } else {
                        resolve({ success: false, message: "Error while getting dropdown data" });
                    }
                }, (err) => {
                    // Handle errors or simulate dropdown data retrieval in the mockup
                    setTimeout(() => {
                        const data = DummyListClass;
                        let buildRes = data.data;
                        buildRes = buildDropdown(buildRes, 'class_id', 'class_name');
                        if (data.code === 200) {
                            resolve({ data: buildRes, success: true }); // Resolve with dropdown data
                        } else {
                            callNotification('error', "Error while getting dropdown data");
                            resolve({ data: [], success: false }); // Resolve with unsuccessful response
                        }
                    }, 250);
                });
        }))
    }

}

// Utility function to create a dropdown list
const buildDropdown = (data = [], key, value) => {
    const build = [];
    data.map((item) => {
        let isExist = false;
        for (let cls of DummyListClassSchedule.data) {
            if (cls.class_id == item.class_id) {
                isExist = true;
                continue;
            }
        }
        if (item.status && !isExist) {
            build.push({
                value: `${item[key]} - ${item[value]}`,
                label: item[value]
            });
        }
    });
    return build;
}