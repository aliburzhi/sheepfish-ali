import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import { BasicTable } from "../components/BasicTable";
import { AddProductModal } from "../components/modals/AddProductModal";
import { fetchProducts } from "../redux/productsOperation/productsOperation";
import { store } from "../redux/store";
import { DEFAULT_BACKGROUND_COLOR } from "../style/constants";

const Wrapper = styled.div`
    width: 100%;
    background-color: ${DEFAULT_BACKGROUND_COLOR};
    text-align: center;
`;

export type Product = {
    description: string;
    id: number;
    category: string;
    price: number;
    rating: number;
    stock: number;
    title: string;
    images: string[];
}

export type State = {
    products: {
        data: Product[]
        status: string;
        error: string | null;
    },
    addPostModal?: boolean
}
export type AddDispatch = typeof store.dispatch;

const Products = () => {
    const productsList: Product[] = useSelector((state: State) => state.products.data)
    const dispatch = useDispatch<AddDispatch>();

    useEffect(() => {
        if (productsList.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, productsList]);


    return <Wrapper>
        {productsList ?
            <div>
                <BasicTable products={productsList} />
            </div> : (
                <ClipLoader
                    color='blue'
                    size={80}
                    aria-label="Loading Spinner"
                />
            )}
        <AddProductModal />
    </Wrapper>
}

export default Products