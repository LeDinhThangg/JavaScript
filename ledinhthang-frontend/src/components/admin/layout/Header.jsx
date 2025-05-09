"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Header() {

    const [user, setUser] = useState(null);
    useEffect(() => {
        // Lấy thông tin người dùng từ localStorage khi component được mount
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));

        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        // Xóa role khỏi cookie
        document.cookie = 'role=; path=/;'
        
        window.location.href = '/site/auth/login';
    }

    return (
        <div className="navbar bg-amber-400 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow  ">
                        <li>
                            <Link href='/site'>Home</Link>
                        </li>
                        <li>
                            <Link href='/site/about'>About</Link>
                        </li>
                        <li>
                            <a>Thông Tin</a>
                            <ul className="p-2">
                                <li>
                                    <Link href=''>Chinh sach ban hang</Link>
                                </li>
                                <li>
                                    <Link href=''>Chinh sach van chuyen</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link href='/site/contact'>contact</Link>
                        </li>
                    </ul>
                </div>
                <Image
                    src="/images/logo.jpg"
                    width={100}
                    height={100}
                    alt='Logo'
                    className='shadow-amber-950 shadow-2xl rounded-lg' />
            </div>
            <div className="navbar-center hidden lg:flex">

            </div>
            <div className="navbar-end">

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {user?.username}
                        </div>
                    </div>
                    {user && <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>

                            <Link href='/site/auth/profile' className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>

                        </li>
                        <li>
                            <Link href='/site/auth/settings' className="justify-between">
                                Setting
                            </Link>
                        </li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>}

                </div>
                {!user && <div><Link href='/site/auth/login'>Login</Link></div>}
            </div>
        </div>
    )
}