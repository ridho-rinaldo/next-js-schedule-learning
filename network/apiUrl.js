export default {
    auth: {
        login: '/api/v1/auth/login', // Login endpoint
        register: '/api/v1/auth/register', // Register endpoint
        refresh_token: '/api/v1/auth/refresh-token', // Refresh token endpoint
        logout: '/api/v1/auth/logout' // Logout endpoint
    },
    dashboard: {
        data: '/api/v1/dashboard' // Dashboard data endpoint
    },
    teacher: {
        list: '/api/v1/teacher/list', // List of teachers endpoint
        create:  '/api/v1/teacher/create', // Create a teacher endpoint
        detail: '/api/v1/teacher/detail/', // Teacher detail endpoint (with an ID placeholder)
        update: '/api/v1/teacher/update', // Update a teacher endpoint
        delete: '/api/v1/teacher/delete', // Delete a teacher endpoint
        dropdown: '/api/v1/teacher/dropdown', // Dropdown data for teachers endpoint
        unassigned: '/api/v1/teacher/unassigned' // List of unassigned teachers endpoint
    },
    subject: {
        list: '/api/v1/subject/list', // List of subjects endpoint
        create: '/api/v1/subject/create', // Create a subject endpoint
        detail: '/api/v1/subject/detail/', // Subject detail endpoint (with an ID placeholder)
        update: '/api/v1/subject/update', // Update a subject endpoint
        delete: '/api/v1/subject/delete', // Delete a subject endpoint
        dropdown: '/api/v1/teacher/dropdown' // Dropdown data for subjects endpoint
    },
    class: {
        list: '/api/v1/class/list', // List of classes endpoint
        create: '/api/v1/class/create', // Create a class endpoint
        detail: '/api/v1/class/detail/', // Class detail endpoint (with an ID placeholder)
        update: '/api/v1/class/update', // Update a class endpoint
        delete: '/api/v1/class/delete', // Delete a class endpoint
        dropdown: '/api/v1/class/dropdown' // Dropdown data for classes endpoint
    },
    class_schedule: {
        list: '/api/v1/class_schedule/list', // List of class schedules endpoint
        create: '/api/v1/class_schedule/create', // Create a class schedule endpoint
        detail: '/api/v1/class_schedule/detail/', // Class schedule detail endpoint (with an ID placeholder)
        update: '/api/v1/class_schedule/update', // Update a class schedule endpoint
        delete: '/api/v1/class_schedule/delete' // Delete a class schedule endpoint
    }
}
