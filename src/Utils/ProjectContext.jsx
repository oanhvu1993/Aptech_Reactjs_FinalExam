import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { DataContext } from "./Function"


ProjectContext.propTypes = {
    children: PropTypes.node
}

export default function ProjectContext({ children }) {
    const cartLocal = JSON.parse(localStorage.getItem("cartItemLocal"));
    const favoriteLocal = JSON.parse(localStorage.getItem("favoriteItemLocal"));
    const [data, setData] = useState([]);
    const [cartItem, setCartItem] = useState(cartLocal?.length <= 0 || cartLocal == null ? [] : cartLocal);
    const [favoriteItems, setFavoriteItems] = useState(favoriteLocal?.length <= 0 || favoriteLocal == null ? [] : favoriteLocal);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        localStorage.setItem("favoriteItemLocal", JSON.stringify(favoriteItems))

    }, [favoriteItems])

    useEffect(() => {
        let sumQuantity = 0;
        let sumTotal = 0;
        cartItem.map((item) => {
            sumQuantity = sumQuantity + item.quantity
            sumTotal = sumTotal + (item.quantity * item.data.price)
        })
        setTotalQuantity(sumQuantity)
        setSubTotal(sumTotal);
        localStorage.setItem("cartItemLocal", JSON.stringify(cartItem))
    }, [cartItem])

    const handleUpdateQuantity = (type, dataId) => {
        if (type == 'ins') {
            const nextCartItem = cartItem.map((item) => {
                if (item.data.documentId == dataId) {
                    return { ...item, quantity: item.quantity + 1 }
                } else {
                    return item
                }
            });
            setCartItem(nextCartItem);
        }
        if (type == "dec") {
            const nextCartItem = cartItem.map((item) => {
                if (item.data.documentId == dataId) {
                    return item.quantity == 1 ? item : { ...item, quantity: item.quantity - 1 }
                } else {
                    return item
                }
            });
            setCartItem(nextCartItem);
        }
    }
    return (
        <DataContext.Provider value={{
            data,
            setData,
            cartItem,
            setCartItem,
            totalQuantity,
            setTotalQuantity,
            subTotal,
            setSubTotal,
            handleUpdateQuantity,
            favoriteItems,
            setFavoriteItems,
            update,
            setUpdate
        }}>
            {children}
        </DataContext.Provider>
    )
}