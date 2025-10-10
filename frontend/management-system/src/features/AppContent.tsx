import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import SignUp from "./auth/SignUp";
import UserPage from "../components/UserPages";
import SideBar from "../components/SideBar";
import sliderArrow from "../assets/images/sliderArrow.svg";
import NavBar from "../components/NavBar";
import { VerifyContext } from "../app/VerifyContext";
import Footer from "../components/Footer";

export default function AppContent() {
  const modalRef = useRef<HTMLDivElement>(null);
  const { user, setUser, admin } = useContext(VerifyContext);
  const [sliderOpen, setSliderOpen] = useState(() => window.innerWidth >= 1280);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleSlider = useCallback(() => {
    setHasInteracted(true);
    setSliderOpen((prev) => !prev);
    document.body.style.overflow = "auto";
  }, []);
  

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setSliderOpen(window.innerWidth >= 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleLogOut() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  useEffect(() => {
    if(window.innerWidth < 1280 && sliderOpen) {
      document.body.style.overflow = "hidden";
      const handleClickOutside = (event: MouseEvent) => {
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
        ) {
          toggleSlider && toggleSlider();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
    
  }, [toggleSlider, sliderOpen])

  return (
    <>
      {!user ? (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <div className="bodyBackground h-full min-h-screen">
          <div
            ref={modalRef}
            className={`w-full min-w-[345px] max-w-[345px] fixed h-screen sideBarBackground modalBoxShadow py-5 pb-24 z-[9999] ${window.innerWidth < 1280 ? "-left-[400px]": ""}    ${
              hasInteracted ? (!sliderOpen ? "sliderClose" : "sliderOpen") : ""
            }`}
          >
            <div className="w-full h-screen relative">
              <SideBar
                admin={admin}
                name={user?.name}
                sidebarEmail={user?.email}
                sideBarLogout={handleLogOut}
              />
              <button
              type="button"
                onClick={toggleSlider}
                className={`absolute top-[23px] transition-all -right-[13px] rotate-0`}
              >
                <img src={sliderArrow} alt="arrow" className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div
            className={` ml-auto px-5 lg:px-8 2xl:px-[160px] transition-all duration-[0.6s] relative min-h-screen pb-6 ${
              !sliderOpen ? "w-full" : "w-full xl:w-[calc(100%-345px)]"
            } ${window.innerWidth < 1280 && sliderOpen ? "blur-[10px]": "blur-0"}`} 
          >
            <NavBar sideBarClosed={toggleSlider} />
            <Routes>
              <Route
                path="/*"
                element={<UserPage admin={admin} name={user?.name || ""} />}
              />
            </Routes>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
