import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import LoginLayout from "./layouts/LoginLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import CreatePasswordView from "./views/Dashboard/CreatePasswordView";
import AllPasswordsView from "./views/Dashboard/AllPasswordsView";
import UpdatePasswordView from "./views/Dashboard/UpdatePasswordView";
import AdminView from "./views/Admin/AdminView";
import ProfileView from "./views/ProfileView";



export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginLayout/>}>
          <Route path="/login" element={<LoginView />}/>
          <Route path="/register" element={<RegisterView />}/>
        </Route>
      </Routes>

      <Routes>
        <Route element={<DashboardLayout/>}>
          <Route path="/passwords" element={<AllPasswordsView/>}/>
          <Route path="/passwords/new" element={<CreatePasswordView/>}/>
          <Route path="/passwords/edit/:passwordId" element={<UpdatePasswordView/>}/>
          <Route path="/admin/users" element={<AdminView/>}/>
          <Route path="/profile" element={<ProfileView/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
