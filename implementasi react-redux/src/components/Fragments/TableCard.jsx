import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

const TableCard = (props) => {
    const { products } = props
    const cart = useSelector((state) => state.cart.data)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        if(products.length > 0 && cart.length > 0) {
         const sum = cart.reduce((acc, item) => {
             const product = products.find(product => product.id === item.id)
             return acc + (product.price * item.qty)
         }, 0)
         setTotalPrice(sum)
         localStorage.setItem("cart", JSON.stringify(cart))
        }
     }, [cart, products])


     const totalPriceRef = useRef(null)

     useEffect(() => {
        if(cart.length > 0) {
            totalPriceRef.current.style.display = "table-row"
        } else {
         totalPriceRef.current.style.display = "none"
        }
     }, [cart])

    return (
        <table className="p- text-left table-auto border-separate border-spacing-x-5">
                        <thead>
                            <tr>
                                <th>Produt</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 && cart.map((item) => {
                              const product = products.find((product) => product.id === item.id)
                              return (
                                <tr key={item.id}>
                                    <td>{product.title.substring(0,25)}</td>
                                    <td>${" "} {product.price.toLocaleString("id-ID")}</td>
                                    <td>{item.qty}</td>
                                    <td>${' '} {(item.qty * product.price).toLocaleString("id-ID")}</td>
                                </tr>
                              )
                            })}
                            <tr ref={totalPriceRef}>
                                <td colSpan={3}>
                                    <b>Total price</b>
                                </td>
                                <td>
                                    <b>
                                        ${" "}{(totalPrice).toLocaleString("id-ID")}
                                    </b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
    )
}

export default TableCard