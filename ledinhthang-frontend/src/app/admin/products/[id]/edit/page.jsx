"use client"
import ProductEditForm from "@/components/admin/products/ProductEditForm";
import { useParams } from "next/navigation";

export default function EditProduct() {
    const { id } = useParams()
    return (
        <div>
            <h1>chinh sua san pham</h1>
            <ProductEditForm id={id} />
        </div>
    );
}