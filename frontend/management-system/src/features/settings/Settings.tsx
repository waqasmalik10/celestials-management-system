
import SettingBody from "./SettingBody";
import { useContext } from "react";
import { VerifyContext } from "../../app/VerifyContext";
interface SettingProps {
}

export default function Setting({}: SettingProps) {
  const { user, admin } = useContext(VerifyContext);
  return (
    <>
     <div className="mt-[50px]">
      <h1 className="font-popins text-left text-4xl font-semibold text-white mb-[53px]">
        Settings
      </h1>
      <SettingBody admin={admin} name={user?.name} email={user?.email} />
      </div>
    </>
  );
}
