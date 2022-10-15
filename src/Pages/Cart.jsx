import {Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { Navigate } from 'react-router-dom'
import { CartProduct } from './CartProduct'

export const Cart = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [navigate,setNavigate] = useState(0)
    const [cartProduct, setCartProduct] = useState([])

    let userId = localStorage.getItem("userId");
    const getProducts = ()=>{
        fetch(`http://localhost:3001/users/${userId}/cart`)
        .then(res=>res.json())
        .then(res=>setCartProduct(res))
        .catch(err=>console.log(err))
    }


    useEffect(() =>{
        getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    let isAuth = localStorage.getItem('isAuth') || false;
    const handleClick = () => {
        if(isAuth==="false"){
            setNavigate(1)
        }
        else{
            onOpen()
        }
    }

    if(navigate===1){
        return <Navigate to='/login'/>
    }

    return (
        <>
        <Text onClick={() => handleClick()}>
            <FaShoppingCart color="black" fontSize="22px"/>
        </Text>

        <Drawer onClose={onClose}  isOpen={isOpen} size="sm" border="1px solid black">
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton color="white" _hover={{ bg: "red" }} _active={{ bg: "red" }}fontSize="14px" />
            <DrawerHeader bg="red" color="white" p={2}>Your Cart(Cart)</DrawerHeader>
            <Text bg="black" p={2} color="white" fontSize="15px">Free Shipping sitewide | Cash On Delivery available for order value upto ₹3000</Text>
            <DrawerBody border="1px solid red" p={0}>
                <CartProduct cartProduct={cartProduct}/>
            </DrawerBody>
            <DrawerBody border="1px solid red">
                <Box width="100%" border="1px solid black">

                </Box>
            </DrawerBody>
            </DrawerContent>
        </Drawer>
        </>
    )
}
