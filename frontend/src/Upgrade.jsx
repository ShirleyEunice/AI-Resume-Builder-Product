import React from 'react'
import { Button } from './components/ui/button'
import API from './api/axios'

const Upgrade = () => {

    const handleUpgrade = async ()=>{
        try {
            const response = await API.post("/payment/create-checkout-session");
            window.location.href = response.data.url;
        } catch (error) {
            
        }
    }
  return (
    <Button 
    onClick={handleUpgrade}
    className="bg-purple-600 text-white px-4 py-2 rounded">Upgrade to Premium</Button>
  )
}

export default Upgrade