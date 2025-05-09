"use client"
import { login, me } from "@/services/authService";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
        remember: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

    };

    const validate = () => {
        const { identifier, password, remember } = formData;
        const errors = [];
        // Kiểm tra trường bắt buộc
        if (!identifier || !password) {
            errors.push('Vui lòng nhập đầy đủ thông tin');
        }


        // Trả về tất cả lỗi (nếu có)
        return errors.length > 0 ? errors : null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validate();
        if (error) {
            toast.error(error.join('.'));
        }
        else
            try {

                let data = await login(formData.identifier, formData.password);
                const { jwt, user } = data;
                localStorage.setItem('jwt', jwt);
                localStorage.setItem('user', JSON.stringify(user));


                const userInfo = await me();
                localStorage.setItem('role', userInfo.role.name);
                // Lưu role vào cookie
                document.cookie = `role=${userInfo.role.name}; path=/;`;

                if (userInfo.role.name == 'admin-web')
                    window.location.href = '/admin';
                else if (userInfo.role.name == 'Authenticated')
                    window.location.href = '/site';

            } catch (err) {
                console.log('Error:', err)
                toast.error(err.message || 'Đăng nhập thất bại');
            }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray">
            <ToastContainer />
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-4xl font-bold text-center text-white mb-6">Đăng Nhập</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white text-lg font-medium mb-2">Tên đăng nhập</label>
                        <input type="text" onChange={handleChange} name="identifier" className="w-full p-4 text-lg border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="email hoặc username" value={formData.identifier} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-lg font-medium mb-2">Mật khẩu</label>
                        <input type="password" onChange={handleChange} name="password" className="w-full p-4 text-lg border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập mật khẩu" value={formData.password} />
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <a href="#" className="text-blue-400 hover:underline">Quên mật khẩu?</a>
                    </div>
                    <label className="fieldset-label items-center mb-4 text-blue-400 hover:underline">
                        <input type="checkbox" onChange={handleChange} name="remember" className="checkbox " value={formData.remember} />
                        remember me
                    </label>
                    <button type="submit" className="w-full bg-blue-500 text-white p-4 text-lg rounded-lg hover:bg-blue-600 transition">Đăng nhập</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;