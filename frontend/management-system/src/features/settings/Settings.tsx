
import SettingBody from "./SettingBody";
import { useContext } from "react";
import { VerifyContext } from "../../app/VerifyContext";
interface SettingProps {
}

export default function Setting({}: SettingProps) {
  const { user, admin } = useContext(VerifyContext);
  return (
    <>
      <SettingBody admin={admin} name={user?.name} email={user?.email} pageTitle="Settings" />
    </>
  );
}
