import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContext, useContext } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'
import { dummyCarData } from '../assets/assets';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext();

export const AppProvider = ({children})=>{
    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY

    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [loading, setLoading] = useState(true)
    const [showLogin , setShowLogin] = useState(false)
    const [pickupDate, setPickupData] = useState('')
    const [returnDate, setReturnDate] = useState('')

    const [cars, setCars] = useState(dummyCarData || [])

    //function to check if user is logged in 
    const fetchUser = async()=>{
        try{
            const {data} = await axios.get('/api/users/data')
            if (data.success){
                setUser(data.user)
                setIsOwner(data.user.role?.toLowerCase() === 'owner')
            }else{
                navigate('/')
            }
        }catch(error){
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    // Function to change user role to owner
    const changeRole = async () => {
        try {
            const { data } = await axios.post('/api/owner/change-role')
            if (data.success) {
                setIsOwner(true)
                setUser(prev => prev ? ({ ...prev, role: 'owner' }) : prev)
                toast.success(data.message || 'Switched to owner mode')
                navigate('/owner')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to logout the user 
    const logout = ()=>{
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        axios.defaults.headers.common['Authorization'] = ''
        toast.success('Logged out successfully')
    }

    // useEffect to retrieve the token from localStorage
    useEffect(()=>{
        const token = localStorage.getItem('token')
        setToken(token)
        fetchCars()
    }, [])

    // Function to fetch all cars from the server 
    const fetchCars = async()=>{
        try{
            const {data} = await axios.get('/api/users/cars')
            if (data?.success && Array.isArray(data.cars) && data.cars.length > 0) {
                setCars(data.cars)
            }
        }catch(error){
            console.log("Could not fetch cars from server:", error.message)
        }
    }
    // useEffect to fetch user data when token is available 
     useEffect(()=>{
        if(token){
            axios.defaults.headers.common['Authorization'] = token
            fetchUser()
        } else {
            setLoading(false)
        }
    },[token])

    const value = {
        navigate, currency, axios, user, setUser, token, setToken, isOwner, setIsOwner, fetchUser, showLogin, 
        setShowLogin, pickupDate, setPickupData, returnDate, setReturnDate, cars, setCars, fetchCars, logout, loading, changeRole
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
    
}
export const useAppContext =( )=>{
    return useContext(AppContext)

}