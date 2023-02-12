import { getRoles } from "@testing-library/react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard";
import Homepage from "./homepage";
import Login from "./login";
import PrivateRoute from "./privateRoute/index-";
import Registration from "./registration";
import { fetchService } from "./service/fetchService";
import { useLocalStorage } from "./util/useLocalStorage";
import jwt_decode from "jwt-decode";
import EmployeeDashboard from "./employeeDashboard";
import AddProduct from "./addProductView";
import CredentialsReset from "./credentialsReset";
import ViewCarts from "./viewCarts";
import ViewTransaction from "./viewTransaction";
import ViewProfile from "./viewProfile";

function App() {

  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [roles, setRoles] = useState(getRolesFromJwt());

  function getRolesFromJwt() { 
    if (jwt) {
      const jwtDecoded = jwt_decode(jwt);
      return jwtDecoded.authorities
    } 
    return [];
  }

  return (
    <Routes>
      <Route path="/viewProfile" element={
        <PrivateRoute>
          <ViewProfile />
        </PrivateRoute>
      }></Route>
      <Route path="/transactions/:id" element={
        <PrivateRoute>
          <ViewTransaction />
        </PrivateRoute>
      }></Route>
      <Route path="/viewCarts" element={
        <PrivateRoute>
          <ViewCarts/>
        </PrivateRoute>
      }></Route>
      <Route path="/products/:id" element={
        <PrivateRoute>
          <AddProduct />
        </PrivateRoute>
      }></Route>
      <Route path="/dashboard" element={
        roles.includes("ROLE_EMPLOYEE") ? 
        (
          <PrivateRoute>
            <EmployeeDashboard/>
          </PrivateRoute>
        ) :
        (
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        )
      }>
      </Route>
      <Route path="/register" element={<Registration/>}></Route>
      <Route path="/credentialsReset" element={<CredentialsReset/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/" element={<Homepage/>}></Route>
    </Routes>
  );
}

export default App;
