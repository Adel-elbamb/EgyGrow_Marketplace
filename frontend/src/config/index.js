const config = {
    apiUrl: 'http://localhost:3000',
    routes: {
        home: '/',
        login: '/login',
        adminDashboard: '/admin/dashboard',
        products: '/admin/products',
        messages: '/messages'
    },
    endpoints: {
        auth: {
            login: '/auth/login',
            verify: '/auth/verify',
            logout: '/auth/logout'
        },
        admin: {
            subadmins: '/admin/subadmins'
        }
    }
};

export default config; 