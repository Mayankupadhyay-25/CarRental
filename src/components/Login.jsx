import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast'

const Login = () => {
    const { setShowLogin, axios, setToken, setUser, setIsOwner, navigate } = useAppContext();

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [role, setRole] = React.useState("user");

    const onsubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const payload = state === "register" 
                ? { name, email, password, role } 
                : { email, password };

            const { data } = await axios.post(`/api/users/${state}`, payload);

            if (data.success) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                if (data.user) {
                    setUser(data.user);
                    const isUserOwner = data.user.role?.toLowerCase() === 'owner';
                    setIsOwner(isUserOwner);
                    if (isUserOwner) {
                        navigate('/owner');
                    } else {
                        navigate('/');
                    }
                }
                setShowLogin(false);
                toast.success(state === "register" ? "Account created successfully" : "Logged in successfully");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

  return (
    <div onClick={() => setShowLogin(false)} className='fixed top-0 bottom-0 left-0
     right-0 z-100 flex items-center text-sm text-gray-500 bg-black/50'>

         <form onSubmit={onsubmitHandler} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-10 w-80 sm:w-[380px] text-gray-500 rounded-xl shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-semibold m-auto text-gray-800">
                <span className="text-primary">Car Rental</span> {state === "login" ? "Login" : "Sign Up"}
            </p>

            {state === "register" && (
                <>
                    <div className="w-full">
                        <label className="text-xs font-medium text-gray-600">Register As</label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                            <button
                                type="button"
                                onClick={() => setRole("user")}
                                className={`py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                                    role === "user"
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                Customer
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("owner")}
                                className={`py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                                    role === "owner"
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                Car Owner
                            </button>
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="text-xs font-medium text-gray-600">Full Name</label>
                        <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter your full name" className="border border-gray-200 rounded-lg w-full p-2.5 mt-1 outline-primary" type="text" required />
                    </div>
                </>
            )}

            <div className="w-full">
                <label className="text-xs font-medium text-gray-600">Email Address</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your email" className="border border-gray-200 rounded-lg w-full p-2.5 mt-1 outline-primary" type="email" required />
            </div>

            <div className="w-full">
                <label className="text-xs font-medium text-gray-600">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="At least 8 characters" className="border border-gray-200 rounded-lg w-full p-2.5 mt-1 outline-primary" type="password" required />
            </div>

            {state === "register" ? (
                <p className="text-xs text-gray-500">
                    Already have an account? <span onClick={() => setState("login")} className="text-primary font-medium cursor-pointer underline">Log in here</span>
                </p>
            ) : (
                <p className="text-xs text-gray-500">
                    Don't have an account? <span onClick={() => setState("register")} className="text-primary font-medium cursor-pointer underline">Create an account</span>
                </p>
            )}

            <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2.5 rounded-lg font-medium cursor-pointer shadow-sm mt-1">
                {state === "register" ? `Create ${role === "owner" ? "Owner" : "Customer"} Account` : "Login"}
            </button>
        </form>
    </div>
  )
}   
export default Login