const API_CONFIG = {
    IMAGE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:1337',
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:1337/api',
    APP_KEY: process.env.NEXT_PUBLIC_APP_KEY || "",
    HEADER: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_APP_KEY || ""}`
    }
};
export default API_CONFIG;