import React from "react";

const LoginForm = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-4xl font-bold text-center text-white mb-6">Đăng Nhập Admin</h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-white text-lg font-medium mb-2">Email</label>
                        <input type="email" className="w-full p-4 text-lg border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập email của bạn" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-lg font-medium mb-2">Mật khẩu</label>
                        <input type="password" className="w-full p-4 text-lg border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập mật khẩu" />
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <a href="#" className="text-blue-400 hover:underline">Quên mật khẩu?</a>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-4 text-lg rounded-lg hover:bg-blue-600 transition">Đăng nhập</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;