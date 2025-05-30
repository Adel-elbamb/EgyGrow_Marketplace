const getCurrentUser = () => {
    try {
        const token = localStorage.getItem('user_token');
        const userData = localStorage.getItem('user_data');
        
        if (!token || !userData) {
            console.log('No token or user data found');
            return null;
        }
        if (!token.startsWith('ey')) {
            console.log('Invalid token format');
            localStorage.removeItem('user_token');
            localStorage.removeItem('user_data');
            return null;
        }
        try {
            const user = JSON.parse(userData);
            return user;
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('user_token');
            localStorage.removeItem('user_data');
            return null;
        }
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
};

const authService = {
    getCurrentUser
};

export { authService }; 