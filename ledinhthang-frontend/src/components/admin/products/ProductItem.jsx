import API_CONFIG from "@/config/api";
import { deleteProduct, updateProduct } from "@/services/productService";
import Link from "next/link";
import React from "react";
import { FaEye, FaEyeSlash, FaTrash, FaEdit } from "react-icons/fa";
const ProductItem = (props) => {
    const { product, stt, reload, setReload } = props;
    const handlePublishToggle = (product) => {
        if (product.attributes.publishedAt == null) updateProduct(product.id,
            { publishedAt: new Date() })
        else updateProduct(product.id, { publishedAt: null })
        setReload(reload + 1);
    };
    const handleDelete = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(productId)
                .then(() => {
                    setReload(reload + 1);
                })
                .catch((error) => {
                    console.error("Error deleting product:", error);
                });
        }
    };
    return (
        <tr>
            <td>{stt}</td>
            <td>{product.attributes.productName}</td>
            <td ><img src={API_CONFIG.IMAGE_URL + product.attributes.image.data[0].attributes.url} className="h-20 object-contain" /></td>
            <td>{product.attributes.price}</td>
            <td >{product.attributes.publishedAt ? <FaEye onClick={() => { handlePublishToggle(product) }} /> : <FaEyeSlash onClick={() => { handlePublishToggle(product) }} />}</td>
            <td className=" flex gap-2"><FaTrash onClick={() => { handleDelete(product.id) }} className="hover:text-red-500 cursor-pointer" /> <FaEdit className="hover:text-blue-500 cursor-pointer" />
                <Link href={`/admin/products/${product.id}/edit`}>
                    <FaEdit className="hover:text-blue-500 cursor-pointer" />
                </Link>
            </td>
        </tr >
    );
};
export default ProductItem;