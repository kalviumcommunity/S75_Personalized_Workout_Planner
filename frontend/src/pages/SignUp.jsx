import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../utils/api';
import { toast } from 'react-toastify';

function SignUp() {

  const [formData,setFormData] = useState({name:"",email:"",password:"",fitnessGoal:""});
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      await API.post("/auth/register",formData);
      navigate("/");
      toast.success("Signed-up successfully")
    } catch (error) {
      setError(error.response?.data?.message || "SignUp failed")
      toast.error("Sign-up Failed")
    }
  }
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>

      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h2 className='text-2xl font-bold text-center mb-6'>SignUp</h2>
        {error && <p className='text-red-500 text-center'>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input 
          type="text" 
          name='name' 
          placeholder='Name'
          onChange={handleChange} 
          className='w-full p-2 border rounded mb-4' 
          required
          />
          <input 
          type="email" 
          name='email' 
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
          <select name="fitnessGoal" onChange={handleChange} className='w-full p-2 border rounded mb-4' required>
            <option value="" ><i>Select fitnessGoal</i></option>
            <option value="weight loss">Weight Loss</option>
            <option value="muscle gain">Muscle Gain</option>
            <option value="endurance">Endurance</option>
            <option value="general fitness">General Fitness</option>
          </select>

          <button type="submit" className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600'>
            Sign Up
          </button>
        </form>

        <p className='mt-4 text-center text-gray-600'>
          Already have an account ? 
          <Link to="/" className='ml-1 text-green-500'>
           Login
          </Link>
        </p>
      </div>
      
    </div>
  );
};

export default SignUp;