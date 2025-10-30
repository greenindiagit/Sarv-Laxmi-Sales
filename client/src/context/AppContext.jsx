import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BodyLoader from "../../src/component/Loader/BodyLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [bodyLoaderShow, setbodyLoaderShow] = useState(false);
  const [pagination, setpagination] = useState([]);
  const [servicePageName, setservicePageName] = useState([]);
  const [homePageData, sethomePageData] = useState([]);

  const SERVER_BASE_URL = import.meta.env.VITE_API_SERVER_BASE_URL;
  const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;

  // ✅ Base API URLs
  const apiUrl = () => {
    const base = SERVER_BASE_URL + "api/";
    const commurl = base + "common/";

    return {
      PRODUCTS: `${commurl}products`,
      PRODUCTTYPE: `${commurl}products/product-type`,
      ORDERS: `${commurl}orders`,
      Quotation: `${commurl}quote`,
      Banners: `${commurl}banners/banners`,
      ContactPost: `${commurl}contact-us`,
      productMaster: `${commurl}products/product-master`,
    };
  };

  // ✅ LocalStorage helpers
  const storage = {
    set: (key, value) => localStorage.setItem(key, value),
    get: (key) => localStorage.getItem(key),
    delete: (key) => localStorage.removeItem(key),
  };

  // ✅ Device Info
  const getDeviceInfo = () => ({
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    vendor: navigator.vendor,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
  });

  // ✅ API Call Function
  const postData = async (
    filedata,
    url,
    method,
    loaderShowHide = null,
    messageAlert = null,
    isFileUpload = false
  ) => {
    const deviceInfo = JSON.stringify(getDeviceInfo());
    let bodyData = null;

    if (isFileUpload) {
      bodyData = new FormData();
      for (const key in filedata) {
        const value = filedata[key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item instanceof File) {
              bodyData.append(key, item);
            } else if (typeof item === "object") {
              bodyData.append(`${key}[]`, JSON.stringify(item));
            } else {
              bodyData.append(`${key}[]`, item);
            }
          });
        } else if (value instanceof File) {
          bodyData.append(key, value);
        } else if (typeof value === "object" && value !== null) {
          bodyData.append(key, JSON.stringify(value));
        } else {
          bodyData.append(key, value);
        }
      }
      bodyData.append("device_detail", deviceInfo);
    } else {
      if (method === "POST" || method === "PUT") {
        bodyData = JSON.stringify({ ...filedata, device_detail: deviceInfo });
      } else if (["GET", "DELETE"].includes(method) && filedata) {
        const params = new URLSearchParams({
          ...filedata,
          device_detail: deviceInfo,
        }).toString();
        url += `?${params}`;
      }
    }

    if (!loaderShowHide) setbodyLoaderShow(true);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          ...(isFileUpload ? {} : { "Content-Type": "application/json" }),
          Authorization: "Bearer " + storage.get("token"),
        },
        body: ["POST", "PUT"].includes(method) ? bodyData : undefined,
      });

      return await responseCheck(response, messageAlert);
    } catch (error) {
      setbodyLoaderShow(false);
      console.error("API request failed:", error);
      toast.error("Network error");
      return error;
    }
  };

  // ✅ Response Handler
  const responseCheck = async (response, messageAlert) => {
    try {
      let result = await response.json().catch(() => ({}));

      //  console.log("Response:", result);
      setbodyLoaderShow(false);

      if (result.success === true) {
        if (result.pagination?.pages?.length > 0)
          setpagination(result.pagination);

        if (!messageAlert && result.message) toast.success(result.message);

        if (result?.token) {
          storage.set("token", result.token);
          storage.set("user", JSON.stringify(result?.user));
          toggleModal("loginModal", false);
        }
      } else {
        if (!messageAlert && result.message)
          toast.error(result.message || "Something went wrong");
      }

      return result;
    } catch (error) {
      setbodyLoaderShow(false);
      console.error("Invalid JSON response:", error);
      return error;
    }
  };

  // ✅ Convert File to Base64
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // ✅ Price Formatter
  const PriceFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);

  // ✅ Unique ID Generator
  const generateUniqueId = () => {
    let uniqueId = localStorage.getItem("uniqueId");
    let user = localStorage.getItem("user");

    if (!uniqueId) {
      uniqueId =
        Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
      localStorage.setItem("uniqueId", uniqueId);
    }

    if (user) {
      user = JSON.parse(user);
      uniqueId = user._id;
    }

    return uniqueId;
  };

  // ✅ Date Formatters
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().slice(0, 19).replace("T", " ");
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().slice(0, 10);
  };

  // ✅ Image Checker
 const imageCheck = (path, defaultImg = null) => {
  const baseUrl = SERVER_BASE_URL?.endsWith("/")
    ? SERVER_BASE_URL
    : `${SERVER_BASE_URL}/`;

  // 🧩 If no path, use default image
  if (!path) {
    return `${baseUrl}uploads/${defaultImg || "default.jpg"}`;
  }

  // 🧩 If path already starts with '/uploads', use it directly
  if (path.startsWith("/uploads")) {
    return `${baseUrl}${path.replace(/^\/+/, "")}`;
  }

  // 🧩 Try parsing JSON in case it's an array of image objects
  try {
    const decoded = JSON.parse(path);
    if (Array.isArray(decoded) && decoded[0]?.image_path) {
      return `${baseUrl}${decoded[0].image_path.replace(/^\/+/, "")}`;
    }
  } catch (e) {
    // ignore JSON parse errors
  }

  // 🧩 Fallback to direct string path
  return `${baseUrl}${path.replace(/^\/+/, "")}`;
};


  // ✅ Modals State
  const [modals, setModals] = useState({
    homeCategoryModal: false,
    loginModal: false,
    serviceManJoinModal: false,
    addressModal: false,
    BookignStartModal: false,
    ServiceDetailModal: false,
  });

  const toggleModal = (modalName, isOpen) => {
    setModals((prev) => ({
      ...prev,
      [modalName]: isOpen,
    }));
  };

  // ✅ Steps State
  const [steps, setsteps] = useState({
    location: true,
    additionalservice: false,
    datetime: false,
    personalinformation: false,
    cart: false,
    payment: false,
    confirmation: false,
  });

  const toggleStep = (stepName, isOpen) => {
    setsteps((prev) => ({
      ...prev,
      [stepName]: isOpen,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        apiUrl,
        SERVER_BASE_URL,
        VITE_APP_NAME,
        storage,
        postData,
        pagination,
        PriceFormat,
        generateUniqueId,
        formatDate,
        formatDateTime,
        imageCheck,
        convertToBase64,
        toggleModal,
        modals,
        toggleStep,
        steps,
      }}
    >
      {children}
      {bodyLoaderShow && <BodyLoader />}
      <ToastContainer />
    </AppContext.Provider>
  );
};
