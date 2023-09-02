import { styled } from "styled-components";
import { Product } from "../components/BasicTable";
import { pxToRem } from "../helpers/functions";
import { DEFAULT_BORDER_RADIUS, DEFAULT_FONT_SIZE } from "../style/constants";

const ProductListItem = styled.li`
    cursor: pointer;
	border-radius: ${DEFAULT_BORDER_RADIUS};
	background-color: white;
	height: ${pxToRem(620)};
	padding-bottom: ${pxToRem(10)};
    max-width: ${pxToRem(400)};
	width: 100%;
	min-width: ${pxToRem(350)};
	margin: ${pxToRem(20)} ${pxToRem(10)};
	overflow: hidden;
	position: relative;

    &:hover {
        scale: 1.02;
    }
`

const ImageBox = styled.div`
	height: ${pxToRem(350)};
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	width: 100%;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
`;

const PostContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const PostText = styled.div`
	display: flex;
	flex-direction: column;
	align-items: left;
	padding: ${pxToRem(4)} ${pxToRem(6)};
	width: 90%;
	text-align: left;
	font-size: ${DEFAULT_FONT_SIZE};
	margin-bottom: ${pxToRem(6)};
	color: black;
`;

type Props = {
	product: Product
}

const ProductDetails = ({ product }: Props) => {

	return (
		<ProductListItem>
			<ImageBox style={{ backgroundImage: `url(${product.images[0]})` }} />
			<PostContent>
				<PostText>Id: {product.id}</PostText>
				<PostText>Title: {product.title}</PostText>
				<PostText>Description: {product.description}</PostText>
				<PostText>Price: {product.price}</PostText>
				<PostText>Rating: {product.rating}</PostText>
				<PostText>Stock: {product.stock}</PostText>
				<PostText>Category: {product.category}</PostText>
			</PostContent>
		</ProductListItem>
	)
}

export default ProductDetails;