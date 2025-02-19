import { Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import { Toaster } from "react-hot-toast";


export default function DashboardLayout() {


  return (
    <>
      <div className="bg-slate-100 h-screen">
        <NavMenu />
        <section className="container h-full mx-auto p-4 sm:p-6 md:p-10">
          <Outlet />
        </section>
        <Toaster />
      </div>
    </>
  )
}
