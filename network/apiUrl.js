export default {
    auth: {
        login: '/api/v1/auth/login',
        register: '/api/v1/auth/register',
        refresh_token: '/api/v1/auth/refresh-token',
        logout: '/api/v1/auth/logout'
    },
    dashboard: {
        data: '/api/v1/dashboard'
    },
    teacher: {
        list: '/api/v1/teacher/list',
        create:  '/api/v1/teacher/create',
        detail: '/api/v1/teacher/detail/',
        update: '/api/v1/teacher/update',
        delete: '/api/v1/teacher/delete',
        dropdown: '/api/v1/teacher/dropdown',
        unassigned: '/api/v1/teacher/unassigned'
    },
    subject: {
        list: '/api/v1/subject/list',
        create: '/api/v1/subject/create',
        detail: '/api/v1/subject/detail/',
        update: '/api/v1/subject/update',
        delete: '/api/v1/subject/delete',
        dropdown: '/api/v1/teacher/dropdown'
    },
    class: {
        list: '/api/v1/class/list',
        create: '/api/v1/class/create',
        detail: '/api/v1/class/detail/',
        update: '/api/v1/class/update',
        delete: '/api/v1/class/delete',
        dropdown: '/api/v1/class/dropdown'
    },
    class_schedule: {
        list: '/api/v1/class_schedule/list',
        create: '/api/v1/class_schedule/create',
        detail: '/api/v1/class_schedule/detail/',
        update: '/api/v1/class_schedule/update',
        delete: '/api/v1/class_schedule/delete',
    }
}