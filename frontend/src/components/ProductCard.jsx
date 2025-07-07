import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems, removeCartItems, updateCartItemQuantity } from "../features/cartSlice";

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const quantity = cartItems[product._id] || 0;
    console.log(cartItems)
    const handleAdd = () => {
        dispatch(addCartItems({ productId: product._id }));
    };

    const handleIncrement = () => {
        dispatch(updateCartItemQuantity({ productId: product._id, quantity: quantity + 1 }));
    };

    const handleDecrement = () => {
        if (quantity === 1) {
            dispatch(removeCartItems({ productId: product._id }));
        } else {
            dispatch(updateCartItemQuantity({ productId: product._id, quantity: quantity - 1 }));
        }
    };

    return (
        <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image[0]} alt={product.name} />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        <img key={i} className="md:w-3.5 w-3" src={i<4?assets.star_icon:assets.star_dull_icon} alt="" />
                    ))}
                    <p>(4)</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-primary">
                        ${product.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">${product.price}</span>
                    </p>
                    <div className="text-primary">
                        { quantity === 0 ? (
                            <button className="flex items-center justify-center gap-1 bg-primary border border-primary md:w-[80px] w-[64px] h-[34px] rounded text-white cursor-pointer font-medium" onClick={handleAdd} >
                               <img src={assets.cart_icon} alt="" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/20 rounded select-none">
                                <button onClick={handleDecrement} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{quantity}</span>
                                <button onClick={handleIncrement} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;