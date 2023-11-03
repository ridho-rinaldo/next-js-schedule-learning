import { notification } from "antd"

export const callNotification = (type, description) => {
    notification[type]({
        message: 'Notification',
        description
    })
}

// Filter data based on keywords
export const filter = (data, field, keyword) => {

    keyword = keyword.toLowerCase();
    const filteredData = data.filter(item => String(item[field]).toLowerCase().includes(keyword));

    return filteredData;
}

// Update data based on key ID
export const updateData = (data, field, key, newData) => {
    const updatedData = data.map(item => {
        if (item[field] === key) {
            // If field data and key match, update data
            return { ...item, ...newData };
        }
        // If field data and key doesn't match, data will stay
        return item;
    });

    return updatedData;
}

// Delete data using filter
export const deleteData = (data, field, key) => {
    const filteredData = data.filter(item => item[field] !== key);
    return filteredData;
}

// Sorting data based on field_name and order mode
export const sortData = (data, sortBy, sortType, defaultField) => {
    if (sortBy == "") return data

    data.sort((a, b) => {

        let field = sortBy
        let order = sortType

        // set default order
        if (order == "") {
            field = defaultField
            order = 'ascend'
        }
        const dataA = String(a[field]).toLowerCase();
        const dataB = String(b[field]).toLowerCase();

        if (order == 'descend') {
            if (dataA > dataB) {
                return -1; // Sorting from Z to A
            }
        } else if (order == 'ascend') {
            if (dataA < dataB) {
                return -1; // Sorting from A to Z
            }
        }
        return 0;
    });

    return data;
}
