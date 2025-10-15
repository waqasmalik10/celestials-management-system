import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../features/dashboard/DashboardPage";
import Setting from "../features/settings/Settings";
import Employees from "../features/employees/Employees";
import Departments from "../features/departments/Deparrtments";
import EmployeeDetailsPage from "../features/employees/EmployeeDetails/EmployeeDetailsPage";
import DepartmentDetailsPage from "../features/departments/DepartmentDetails/DepartmentDetailsPage";
import CompanyPolicyPage from "../features/company-policies/CompanyPolicyPage";
import { EmployeeContextProvider } from "../features/employees/store/employeeContext";
import { DepartmentContextProvider } from "../features/departments/store/DepartmentContext";
import { CompanyContextProvider } from "../features/company-policies/store/CompanyPolicyContext";
// import NotFoundPage from "../features/not-found/NotFoundPage";
import LeavesDataPage from "../features/leaves/LeavesDataPage";
import LoanDataPage from "../features/loans/LoanDataPage";

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
