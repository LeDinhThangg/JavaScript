"use client"
import React, { useEffect, useState } from "react";
import BrandSelect from "./BrandSelect";
import CategorySelect from "./CategorySelect";
import { createProduct, getProductById, updateProduct } from './../../../services/productService';
const ProductEditForm = ({ id }) => {

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


    useEffect(() => {

        const fetchProductDetails = async () => {
            try {
                const response = await getProductById(id, { 'populate': '*' });
                const product = response.data;
                const attributes = product.attributes;
                console.log(attributes)
                setProductData({

                    productName: attributes.productName,
                    description: attributes.description,
                    price: attributes.price,
                    image: attributes.image?.data?.map(image => image.id),
                    brand: attributes.brand?.data?.id ?? "",
                    category: attributes.category?.data?.id ?? "",
                    view: attributes.view,
                    sold: attributes.sold,
                    status: attributes.status,
                    feature: attributes.feature,
                    ingredient: attributes.ingredient,
                    instruction: attributes.instruction
                });
            } catch (error) {
                console.error("Error fetching product details:", error);

            }
        };
        if (id) {
            fetchProductDetails();
        }
    }, [id]);


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
            const response = await updateProduct(productData);
            console.log("Sản phẩm đã được cập nhật :", response);
            setCreating(false);
            resetForm();

        } catch (error) {
            console.error("Lỗi khi tạo sản phẩm:", error);
        }
    };



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
            <h2 className="text-2xl font-bold mb-4">Cập nhật Sản Phẩm</h2>
            <form onSubmit={handleSubmit}>
                <table className="w-full border-collapse border border-gray-300 text-lg">
                    <tbody>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Tên Sản Phẩm: </td>
                            <td><input type="text" onChange={handleInputChange} value={productData.productName} id="productName" name="productName" required className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Mô tả:</td>
                            <td><textarea id="description" onChange={handleInputChange} value={productData.productName} name="description" className="w-full p-2 border border-gray-300 rounded" defaultValue={""} /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Giá:</td>
                            <td><input type="number" min='10' onChange={handleInputChange} value={productData.price} id="price" name="price" className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Image</td>
                            <td><input type="text" id="image" onChange={handleInputChange} value={productData.image} name="image" className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Brand:</td>
                            <td>
                                <BrandSelect handleInputChange={handleInputChange} id={productData.brand} />
                            </td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Category:</td>
                            <td>
                                <CategorySelect handleInputChange={handleInputChange} id={productData.category} />
                            </td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Lượt xem:</td>
                            <td><input type="number" onChange={handleInputChange} id="view" value={productData.view} name="view" className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Đã bán:</td>
                            <td><input type="number" onChange={handleInputChange} value={productData.sold} id="sold" name="sold" className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Trạng thái:</td>
                            <td>
                                <select id="status" onChange={handleInputChange} name="status" value={productData.status} className="w-full p-2 border border-gray-300 rounded" >
                                    <option value="">Chọn </option>
                                    <option value="In stock">In Stock</option>
                                    <option value="Out stock">Out Stock</option>
                                </select>
                            </td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Tính năng:</td>
                            <td><textarea id="feature" onChange={handleInputChange} value={productData.feature} name="feature" className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Thành phần:</td>
                            <td><textarea id="ingredient" onChange={handleInputChange} value={productData.ingredient} name="ingredient" className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Hướng dẫn sử dụng:</td>
                            <td><textarea id="instruction" onChange={handleInputChange} value={productData.instruction} name="instruction" className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Tóm tắt:</td>
                            <td><input type="text" id="summary" onChange={handleInputChange} value={productData.suamry} name="summary" className="w-full p-2 border border-gray-300 rounded" /></td>
                        </tr>

                    </tbody>
                </table>
                <div className="mt-4 text-center">
                    <button type="submit" className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">{creating ? "Đang Xử lý" : "Cập nhật Sản phẩm"}</button>
                </div>
            </form>
        </div>


    );
};

export default ProductEditForm;