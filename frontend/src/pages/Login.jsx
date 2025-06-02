import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../utils/api';
import { toast } from 'react-toastify';
// import { AuthContext } from '../context/AuthContext';

function Login() {
  // const { user } = useContext(AuthContext);
  const [formData,setFormData] = useState({email:"",password:""});
  const [error,setError] = useState("");
  const navigate = useNavigate();

  // useEffect(()=>{
  //   let token = localStorage.getItem("token");
  //   if(token){
  //     return navigate("/dashboard")
      
  //   }
  //   else if(!token){
  //     return localStorage.setItem("token",user);
  //   }
    
  // })

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.name] : e.target.value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const response = await API.post("/auth/login",formData);
      localStorage.setItem("token",response.data.token);
      //console.log("Login Token",response.data.token);
      navigate("/dashboard");
      toast.success("Logged-in Successfully")
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed")
      toast.error("Login Failed")
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>

      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
          <h2 className='text-2xl font-bold text-center mb-6'>
            Login
          </h2>
          {error && <p className='text-red-500 text-center'>{error}</p>}

          <form onSubmit={handleSubmit}>
            <input 
            type="email" 
            name="email" 
            placeholder='Email' 
            onChange={handleChange}
            className='w-full p-2 border rounded mb-4'
            required 
            />
            <input 
            type="password" 
            name='password' 
            placeholder='Password' 
            onChange={handleChange}
            className='w-full p-2 border rounded mb-4'
            required
            />
            <button type="submit" className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>
              Login
            </button>
          </form>
          
          <p className='mt-4 text-center text-gray-600'>
            Don't have an account ? 
            <Link to="/signup" className='ml-1 text-blue-500'>
             Sign Up
            </Link>
          </p>
      </div>

    </div>
  );
};

export default Login;