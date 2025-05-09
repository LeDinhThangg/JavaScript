"use client"
import { register } from "@/services/authService";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log("name:", name, "value:", value);
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

    };

    const validate = () => {
        const { username, email, password, confirmPassword, agree } = formData;
        const errors = [];
        // Kiểm tra trường bắt buộc
        if (!username || !email || !password || !confirmPassword) {
            errors.push('Vui lòng nhập đầy đủ thông tin');
        }
        // Kiểm tra email hợp lệ
        if (!/\S+@\S+\.\S+/.test(email)) {
            errors.push('Email không hợp lệ');
        }
        // Kiểm tra mật khẩu có ít nhất 6 ký tự
        if (password.length < 6) {
            errors.push('Mật khẩu phải ít nhất 6 ký tự');
        }
        // Kiểm tra mật khẩu mạnh
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;
        if (!passwordRegex.test(password)) {
            errors.push('Mật khẩu phải có chữ hoa, chữ thường, số và ký tự đặc biệt');
        }
        // Kiểm tra mật khẩu và confirmPassword có khớp không
        if (password !== confirmPassword) {
            errors.push('Mật khẩu không khớp');
        }
        // Kiểm tra người dùng có đồng ý với điều khoản không
        if (!agree) {

            errors.push('Bạn phải đồng ý với điều khoản');
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
                await register(formData.username, formData.email,
                    formData.password);
                toast.success('Đăng ký thành công!');
                router.push('/site/auth/login');
            } catch (err) {
                toast.error(err.message || 'Đăng ký thất bại');
            }
    };

    return (

        <div className="flex items-center justify-center min-h-screen bg-black">
            <ToastContainer />
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-4xl font-bold text-center text-white mb-6">Đăng Ký</h1>
                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block text-white text-lg font-medium mb-2">Họ Tên</label>
                        <input onChange={handleChange} type="text" name="username" className="w-full p-4 text-lg border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập tên của bạn" value={formData.username} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-lg font-medium mb-2">Email</label>
                        <input onChange={handleChange} type="email" name="email" className="w-full p-4 text-lg border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập email của bạn" value={formData.email} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-lg font-medium mb-2">Mật khẩu</label>
                        <input onChange={handleChange} type="password" name="password" className="w-full p-4 text-lg border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập mật khẩu" value={formData.password} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-lg font-medium mb-2">Xác nhận mật khẩu</label>
                        <input onChange={handleChange} type="password" name="confirmPassword" className="w-full p-4 text-lg border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập lại mật khẩu" value={formData.confirmPassword} />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-4 text-lg rounded-lg hover:bg-blue-600 transition">Đăng ký</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
