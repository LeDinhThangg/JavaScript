import React from "react";
import Link from "next/link";
import { FaHome, FaProductHunt, FaFirstOrder, FaUser } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";

const Sidebar = () => {
    return (
        <div className="p-4 bg-gray-700 text-white h-full w-full">
            <ul className="menu bg-gray-600 rounded-lg w-full h-full text-xl font-semibold">

                {/*dsahboard*/}
                <li className="border-b border-gray-500">
                    <Link href="/admin" className="flex hover:bg-gray-500 p-3 block"> <FaHome /> Dashboard </Link>
                </li>

                {/*quan ly san pham */}
                <li className="border-b border-gray-700">
                    <details open>

                        <summary className="p-3 cursor-pointer hover:bg-gray-400">
                            < FaProductHunt /> Quản lý sản phẩm
                        </summary>

                        <ul className="ml-4 bg-gray-700 rounded-md">
                            <li className="border-b border-gray-700">
                                <Link href="/admin/products" className="hover:bg-gray-500 p-3 block">Danh sách sản phẩm</Link>
                            </li>
                            <li className="border-b border-gray-700">
                                <Link href="/admin/products/add" className="hover:bg-gray-500 p-3 block">Thêm sản phẩm</Link>
                            </li>
                        </ul>

                    </details>
                </li>

                {/*quan ly danh muc */}
                <li className="border-b border-gray-700">
                    <details open>

                        <summary className="p-3 cursor-pointer hover:bg-gray-400">
                            <TbCategory /> Quản lý danh mục
                        </summary>

                        <ul className="ml-4 bg-gray-700 rounded-md">
                            <li className="border-b border-gray-700">
                                <Link href="/admin/categories" className="hover:bg-gray-500 p-3 block">Danh sách các danh mục</Link>
                            </li>
                            <li className="border-b border-gray-700">
                                <Link href="/admin/categories/add" className="hover:bg-gray-500 p-3 block">Thêm danh mục</Link>
                            </li>
                        </ul>

                    </details>
                </li>

                {/*quan ly don hang */}
                <li className="border-b border-gray-700">
                    <details open>

                        <summary className="p-3 cursor-pointer hover:bg-gray-400 rounded-md">
                            <FaFirstOrder /> Quản lý đơn hàng
                        </summary>

                        <ul className="ml-4 bg-gray-700 rounded-md">
                            <li className="border-b border-gray-700">
                                <Link href="/admin/orders" className="hover:bg-gray-500 p-3 block">Danh sách đơn hàng</Link>
                            </li>

                        </ul>

                    </details>
                </li>

                {/*quan ly nguoi dung */}
                <li className="border-b border-gray-700">
                    <details open>

                        <summary className="p-3 cursor-pointer hover:bg-gray-400 rounded-md">
                            <FaUser /> Quản lý người dùng
                        </summary>

                        <ul className="ml-4 bg-gray-700 rounded-md">
                            <li className="border-b border-gray-700">
                                <Link href="/admin/users" className="hover:bg-gray-500 p-3 block">Danh sách người dùng</Link>
                            </li>

                        </ul>

                    </details>
                </li>




            </ul>
        </div>
    );
};

export default Sidebar;