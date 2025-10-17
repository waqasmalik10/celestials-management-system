import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Setting from "../pages/Settings";

interface UserPageProps {
  name: string;
  admin: boolean;
}

export default function UserPage({admin}: UserPageProps) {
  return (
    <>
      <Routes>
        {/* {!admin && (
          <>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        )} */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>

      {/* {admin ? (
        <>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </>
      ) : null} */}
    </>
  );
}
