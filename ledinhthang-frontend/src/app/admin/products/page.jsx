"use client"
import ProductItem from "@/components/admin/products/ProductItem";
import FilterBox from "@/components/site/filters/FilterBox";
import Loading from "@/components/ui/loading";
import Pagination from "@/components/ui/pagination";
import generatePagination from "@/lib/pagin";
import { getProducts } from "@/services/productService";
import { useEffect, useState } from "react";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchKey, setSearchKey] = useState(null);
    const [viewOption, setViewOption] = useState("live");
    const [reload, setReload] = useState(0);




    useEffect(() => {
        const fetchProducts = async () => {
            let params = {
                'populate': '*',
                'pagination[page]': page,
                'pagination[pageSize]': pageSize,
                "filters[productName][$contains]": searchKey,
                "publicationState": viewOption,

            }
            try {
                setLoading(true);
                let data = await getProducts(params);
                setProducts(data.data);
                setPageCount(data.meta.pagination.pageCount);
                console.log(data)
                setPage(data.meta.pagination.page);
                setLoading(false);
            } catch (error) {
                setError("Lỗi!!!!!")
                console.log(error);
            }
        }
        fetchProducts();
    }, [page, searchKey, viewOption, reload]);
    if (loading) return <Loading />;
    if (error) return <p className='text-red-400'>{error}   </p>
    let pages = generatePagination(page, pageCount);

    return (
        <div className="overflow-x-auto">
            < h1 > Danh sách sản phẩm </h1 >
            <FilterBox setSearchKey={setSearchKey} setViewOption={setViewOption} />

            <table className="table table-md table-pin-rows table-pin-cols">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Published</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (products.length > 0) ? products.map((p, i) => <ProductItem reload={reload} setReload={setReload} product={p} key={p.id} stt={(page - 1) * 10 + i + 1} />) : <p>No product found</p>
                    }
                </tbody>
            </table>
            <Pagination pages={pages} pageCount={pageCount} setPage={setPage} />
        </div>
    )

}