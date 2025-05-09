import Footer from "@/components/admin/layout/Footer";
import Header from "@/components/admin/layout/Header";
import Sidebar from "@/components/admin/layout/Sidebar";


export default function AdminLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">


            {children}

        </div>

    )

}