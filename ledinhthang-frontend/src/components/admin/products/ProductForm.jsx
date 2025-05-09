"use client"
import React, { useEffect, useState } from "react";
import BrandSelect from "./BrandSelect";
import CategorySelect from "./CategorySelect";
import { createProduct } from './../../../services/productService';

const ProductForm = () => {
    const [creating, setCreating] = useState(false);

    const [productData, setProductData] = useState({
        productName: "",
        description: "",
        price: 0,
        image: [],
        brand: "",
        category: "",
        view: 0,
        sold: 0,
        status: "",
        feature: "",
        ingredient: "",
        instruction: "",
        summary: ""
    })
    const validate = () => {
        const errors = {};
        if (!productData.productName.trim()) {

            errors.productName = "Tên sản phẩm không được để trống.";
        }
        if (!productData.description.trim()) {
            errors.description = "Mô tả không được để trống.";
        }
        if (productData.price <= 0) {
            errors.price = "Giá phải lớn hơn 0.";
        }

        if (!productData.brand.trim()) {
            errors.brand = "Thương hiệu không được để trống.";
        }
        if (!productData.category.trim()) {
            errors.category = "Danh mục không được để trống.";
        }
        if (productData.view < 0) {
            errors.view = "Lượt xem không được nhỏ hơn 0.";
        }
        if (productData.sold < 0) {
            errors.sold = "Số lượng đã bán không được nhỏ hơn 0.";
        }
        if (!productData.status.trim()) {
            errors.status = "Trạng thái không được để trống.";
        }
        if (!productData.feature.trim()) {
            errors.feature = "Tính năng không được để trống.";

        }
        if (!productData.ingredient.trim()) {
            errors.ingredient = "Thành phần không được để trống.";
        }
        if (!productData.instruction.trim()) {
            errors.instruction = "Hướng dẫn sử dụng không được để trống.";
        }
        if (!productData.summary.trim()) {
            errors.summary = "Tóm tắt không được để trống.";
        }
        return errors;
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name == "image") {
            setProductData(prevData => ({
                ...prevData,
                image: value.split(",")
            }));
        }
        else if (name == "price") {
            setProductData(prevData => ({

                ...prevData,
                price: parseInt(value)
            }));
        }
        else if (name == "view") {
            setProductData(prevData => ({
                ...prevData,
                view: parseInt(value)
            }));
        }
        else
            if (name == "sold") {
                setProductData(prevData => ({
                    ...prevData,
                    sold: parseInt(value)
                }));
            }
            else {
                setProductData(prevData => ({
                    ...prevData,
                    [name]: value
                }));
            }
    };


    const handleSubmit = async (event) => {

        event.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            // Xử lý hiển thị lỗi
            console.log(errors);
            return;
        }

        try {
            setCreating(true);
            const response = await createProduct(productData);
            console.log("Sản phẩm đã được tạo:", response);
            setCreating(false);
            resetForm();
            // Xử lý thành công, ví dụ: chuyển hướng đến trang danh sách sản phẩm
        } catch (error) {
            console.error("Lỗi khi tạo sản phẩm:", error);
        }
    };


    useEffect(() => {
        const inputs = document.querySelectorAll("input, textarea, select");

        inputs.forEach(input => {
            input.addEventListener("change", handleInputChange);

        });
    }, []);

    useEffect(() => {
        if (productData.productName === "" && productData.description === "") {
            const inputs = document.querySelectorAll("input, textarea, select");
            inputs.forEach(input => {
                input.value = "";
            });
        }
    }, [productData]);
    const resetForm = () => {
        setProductData({
            productName: "",
            description: "",
            price: 0,
            image: [],
            brand: "",
            category: "",
            view: 0,
            sold: 0,
            status: "",

            feature: "",
            ingredient: "",
            instruction: "",
            summary: ""
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-gray p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Thêm Sản Phẩm</h2>
            <form onSubmit={handleSubmit}>
                <table className="w-full border-collapse border border-gray-300 text-lg">
                    <tbody>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Tên Sản Phẩm: </td>
                            <td><input type="text" id="productName" name="productName" required className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Mô tả:</td>
                            <td><textarea id="description" name="description" className="w-full p-2 border border-gray-300 rounded" defaultValue={""} /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Giá:</td>
                            <td><input type="number" min='10' id="price" name="price" className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Image</td>
                            <td><input type="text" id="image" name="image" className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Brand:</td>
                            <td>
                                <BrandSelect handleInputChange={handleInputChange} />
                            </td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Category:</td>
                            <td>
                                <CategorySelect handleInputChange={handleInputChange} />
                            </td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Lượt xem:</td>
                            <td><input type="number" id="view" name="view" className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Đã bán:</td>
                            <td><input type="number" id="sold" name="sold" className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Trạng thái:</td>
                            <td>
                                <select id="status" name="status" className="w-full p-2 border border-gray-300 rounded" >
                                    <option value="">Chọn </option>
                                    <option value="In stock">In Stock</option>
                                    <option value="Out stock">Out Stock</option>
                                </select>
                            </td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Tính năng:</td>
                            <td><textarea id="feature" name="feature" className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Thành phần:</td>
                            <td><textarea id="ingredient" name="ingredient" className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Hướng dẫn sử dụng:</td>
                            <td><textarea id="instruction" name="instruction" className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Tóm tắt:</td>
                            <td><input type="text" id="summary" name="summary" className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                    </tbody>
                </table>
                <div className="mt-4 text-center">
                    <button type="submit" className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">{creating ? "Đang Xử lý" : "Tạo Sản phẩm"}</button>
                </div>
            </form>
        </div>


    );
};

export default ProductForm;