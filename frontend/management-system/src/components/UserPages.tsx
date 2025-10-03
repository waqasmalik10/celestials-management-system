import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/UserPages/Dahboard/DashboardPage";
import Setting from "../pages/UserPages/Settings/Settings";
import Employees from "../pages/UserPages/Employee/Employees";
import Departments from "../pages/UserPages/Departments/Deparrtments";
import EmployeeDetailsPage from "../pages/UserPages/Employee/EmployeeDetails/EmployeeDetailsPage";
import DepartmentDetailsPage from "../pages/UserPages/Departments/DepartmentDetails/DepartmentDetailsPage";
import CompanyPolicyPage from "../pages/UserPages/CompanyPolicies/CompanyPolicyPage";
import { EmployeeContextProvider } from "../pages/UserPages/Employee/store/employeeContext";
import { DepartmentContextProvider } from "../pages/UserPages/Departments/store/DepartmentContext";
import { CompanyContextProvider } from "../pages/UserPages/CompanyPolicies/store/CompanyPolicyContext";
import NotFoundPage from "../pages/UserPages/NotFoundPage/NotFoundPage";
import LeavesDataPage from "../pages/UserPages/LeavesData/LeavesDataPage";
import LoanDataPage from "../pages/UserPages/LoanData/LoanDataPage";

interface UserPageProps {
  name: string;
  admin: boolean;
}

export default function UserPage(props: UserPageProps) {
  return (
    <CompanyContextProvider>
      <Routes>
        {!props.admin && (
          <>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        )}

        <Route path="/settings" element={<Setting />} />
        <Route path="/policy" element={<CompanyPolicyPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        {!props.admin && (
          <>
            <Route path="/leaves" element={<LeavesDataPage />} />{" "}
            <Route path="/loan" element={<LoanDataPage />} />{" "}
          </>
        )}
      </Routes>

      {props.admin ? (
        <>
          <EmployeeContextProvider>
            <DepartmentContextProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/departments" element={<Departments />} />
                <Route
                  path="/employee/details/:id"
                  element={<EmployeeDetailsPage />}
                />
                <Route
                  path="/departments/details/:id"
                  element={<DepartmentDetailsPage />}
                />
                
              </Routes>
            </DepartmentContextProvider>
          </EmployeeContextProvider>
        </>
      ) : null}
    </CompanyContextProvider>
  );
}
