import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FaRegCircleCheck, FaEye, FaEyeSlash } from "react-icons/fa6";
import PasswordList from "./components/PasswordList";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

function App() {
  // 1. Initialize State from Local Storage (Safe check included)
  const [Passwords, setPasswords] = useState(() => {
    try {
      const saved = localStorage.getItem("passwords");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      return [];
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  // 2. Automatically save to Local Storage whenever 'Passwords' changes
  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(Passwords));
  }, [Passwords]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const { register, handleSubmit, watch, reset, setValue, setError, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Check for duplicates
    const isSameUrlAndPassword = Passwords.some(({ url, name }) => url === data.url && name === data.name);

    if (isSameUrlAndPassword) {
      setError("same", { message: "Same Url And Name Combination Already Exists!" });
      handleToast("⚠️ Same Url And Name Combination Already Exists!");
      return; 
    }

    // Add new password with a unique ID (logic replaced fetch)
    const newEntry = { ...data, id: uuidv4() };
    setPasswords([...Passwords, newEntry]);
    
    handleToast("Password Saved!");
    reset(); // Clear form
  };

  const [isToast, setisToast] = useState({ value: false, message: "" });
  const toastbox = useRef(null);

  const handleToast = (message, password) => {
    if (message === "Password Copied!" || message === "Name Copied!" || message === "URL Copied!") {
      navigator.clipboard.writeText(password);
    }
    setisToast({ value: true, message });
    
    // Safety check for ref
    if (toastbox.current) {
        toastbox.current.style.display = "flex";
        setTimeout(() => {
            setisToast({ value: false, message: "" });
            if (toastbox.current) toastbox.current.style.display = "none";
        }, 3000);
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Navbar />
        <main className="   text-xl  " style={{ padding: " 0 16px" }}>
          {/* Form */}
          <div
            className="bg-black border border-white text-white rounded-lg shadow-md w-full"
            style={{ padding: "24px", margin: "20px auto" }}
          >
            <h2 className="text-2xl font-bold text-center " style={{ marginBottom: "16px" }}>Save a Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="   gap-4 flex flex-col w-full items-center" style={{ padding: "16px" }}>
              {/* URL Input */}
              <div className="w-full" >
                <label className="block mb-1 text-gray-300">Website URL</label>
                <input
                  type="url"
                  name="url"
                  {...register("url", { required: { value: true, message: "Enter Url" } })}
                  placeholder="https://example.com"
                  className="w-full rounded bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-gray-500"
                  style={{ padding: "10px", marginBottom: "8px" }}
                />

              </div>
              {errors.url &&
                <div className="bg-red-500 text-white p-3 rounded-lg flex items-center gap-2 shadow-md" style={{ marginTop: "10px", padding: "12px" }}  >
                  <span className="text-lg">⚠️</span>
                  <p className="flex-grow">{errors.url.message}</p>
                </div>
              }
              {/* Name Input */}
              <div className="nameAndPass flex justify-around items-center w-full  ">

                <div className="w-1/3">
                  <label className="block mb-1 text-gray-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    {...register("name", { required: { value: true, message: "Enter Name" }, minLength: { value: 3, message: "Min Length is 3" }, maxLength: { value: 10, message: "Max Length is 10" } })}
                    placeholder="Enter name"
                    className="w-full rounded bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-gray-500"
                    style={{ padding: "10px", marginBottom: "8px" }}
                  />
                  {errors.name &&
                    <div className="bg-red-500 text-white p-3 rounded-lg flex items-center gap-2 shadow-md" style={{ marginTop: "10px", padding: "12px" }}  >
                      <span className="text-lg">⚠️</span>
                      <p className="flex-grow">{errors.name.message}</p>
                    </div>
                  }
                </div>

                {/* Password Input */}
                <div className="w-1/3 relative">
                  <label className="block mb-1 text-gray-300">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      {...register("password", {
                        required: { value: true, message: "Enter Password" },
                        minLength: { value: 3, message: "Min Length is 3" },
                        maxLength: { value: 10, message: "Max Length is 10" },
                      })}
                      placeholder="Enter password"
                      className="w-full rounded bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-gray-500 pr-10"
                      style={{ padding: "10px", marginBottom: "8px" }}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                {errors.password &&
                  <div className="bg-red-500 text-white p-3 rounded-lg flex items-center gap-2 shadow-md" style={{ marginTop: "10px", padding: "12px" }}  >
                    <span className="text-lg">⚠️</span>
                    <p className="flex-grow">{errors.password.message}</p>
                  </div>
                }
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-1/3 bg-blue-600 transition-all cursor-pointer hover:bg-blue-700  text-white font-bold rounded"

                style={{ padding: "12px", marginTop: "12px" }}
              >
                Save Password
              </button>

              {errors.same &&
                <div className="bg-red-500 text-white p-3 rounded-lg flex items-center gap-2 shadow-md" style={{ marginTop: "10px", padding: "12px" }}  >
                  <span className="text-lg">⚠️</span>
                  <p className="flex-grow">{errors.same.message}</p>
                </div>}
            </form>
          </div>

          <PasswordList handleToast={handleToast} Passwords={Passwords} setPasswords={setPasswords} setValue={setValue} />


        </main>
        <Footer />
      </div>

      <div ref={toastbox} className="toastbox bg-gray-900 hidden absolute top-[30px] right-[30px]  flex-col items-center overflow-hidden " style={{ padding: "20px " }}>

        {isToast.value &&
          <div className="toast w-[350px] h-[80px] text-xl flex items-center text-white bg-gray-600 shadow-[0_0_20px_rgba(0,0,0,0.3)] " style={{ margin: "15px 0" }}>

            <FaRegCircleCheck className="text-4xl  text-green-400" style={{ margin: "0 20px" }} /> {isToast.message}
          </div>
        }


      </div>
    </>
  );
}

export default App;
