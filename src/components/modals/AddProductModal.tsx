import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import * as Yup from "yup";
import { makeId, pxToRem } from "../../helpers/functions";
import { AddDispatch } from "../../pages/Products";
import { closeAddPostModal } from "../../redux/addPostModal/addPostModalSlice";
import { addProduct } from "../../redux/productsSlice/productsSlice";
import { DEFAULT_BORDER_RADIUS } from "../../style/constants";
import { Portal } from "./Portal";

const Title = styled.h1`
	margin: 0;
	margin-bottom: ${pxToRem(14)};
`

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	overflow-y: auto;

`;

const Container = styled.div`
	display: flex;
	width: 100%;
	max-height: 100%;
	flex-direction: column;
	align-items: center;

`

const Label = styled.label`
	display: block;
	text-align: left;
	width: ${pxToRem(250)};
	margin-right: ${pxToRem(6)};
	color: white;
`;

const Input = styled.input`
	background-color: transparent;
	border: 1px solid grey;
	border-radius: ${DEFAULT_BORDER_RADIUS};
	color: bisque;
	width: ${pxToRem(250)};
	height: ${pxToRem(35)};
	margin: ${pxToRem(4)}  0 ${pxToRem(12)};
	padding: 0 ${pxToRem(6)};

	&:focus {
		outline: none;
		border-color: white;
	}
`;

const SubmitBtn = styled.button`
	background-color: bisque;
	width: ${pxToRem(180)};
	height: ${pxToRem(35)};
	font-size: ${pxToRem(16)};
	border: 1px solid bisque;
	border-radius: ${DEFAULT_BORDER_RADIUS};
	margin-top: ${pxToRem(20)};
	color: black;
	padding: 0;
	cursor: pointer;

	&:disabled {
		background-color: transparent;
		border-color: grey;
		color: grey;
	}

`

const initialValues = {
	title: "",
	description: "",
	price: 0,
	rating: 0,
	stock: 0,
	category: '',
	images: '',
}

interface FormValues {
	title: string;
	description: string;
	price: number;
	rating: number;
	stock: number;
	category: string;
	images: string;
}

export const AddProductModal = () => {
	//@ts-ignore
	const isOpen: boolean = useSelector((state) => state.addPostModal);

	const [showModal, setShowModal] = useState<boolean>(isOpen);
	const dispatch = useDispatch<AddDispatch>();
	const handleClose = () => {
		dispatch(closeAddPostModal())
	};

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);


	const handleOnSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
		setSubmitting(true);
		const newId = Number(makeId(12));

		dispatch(addProduct({
			id: newId,
			title: values.title,
			description: values.description,
			price: values.price,
			rating: values.rating,
			stock: values.stock,
			category: values.category,
			images: [values.images],
		}))

		setSubmitting(false);
		handleClose()
	}

	return (
		<Portal isOpen={showModal} handleClose={handleClose} size="xl">
			<Formik
				initialValues={initialValues}
				validationSchema={Yup.object({
					title: Yup.string().min(3, "Minimum 3 symbols").matches(/[a-zA-Z]/, "Description can only contain Latin letters.").required("Required"),
					description: Yup.string()
						.matches(/[a-zA-Z]/, "Description can only contain Latin letters.")
						.required("Required")
						.min(3, "Min 3 symbols"),
					price: Yup.number().positive("Price must be greater than 0").max(100000, "Price must be less then 100 000").required("Required"),
					rating: Yup.number().positive("Rating must be greater than 0").max(5, "Rating can`t be more than 5").required("Required"),
					stock: Yup.number().min(1, "Stock must be greater than 1").max(100000, "Stock can`t be more than 100 000").required("Required"),
					category: Yup.string().matches(/[a-zA-Z]/, "Description can only contain Latin letters.").required("Required"),
					images: Yup.string().required("Required"),
				})}
				onSubmit={handleOnSubmit}
			>
				{formik => (
					<Wrapper>
						<Title>Product Form</Title>
						<Form>
							<Container>
								<Label htmlFor="title">Title</Label>
								<Input id="title" type="text" {...formik.getFieldProps("title")} max={50} />
								{formik.touched.title && formik.errors.title ? (
									<div style={{ width: "100%" }}>
										<p style={{ textAlign: "right", color: "indianred" }}>{formik.errors.title}</p>
									</div>
								) : null}

								<Label htmlFor="description">Description</Label>
								<Input
									id="description"
									type="text"
									{...formik.getFieldProps("description")}
								/>
								{formik.touched.description && formik.errors.description ? (
									<div style={{ width: "100%" }}>
										<p style={{ textAlign: "right", color: "indianred" }}>{formik.errors.description}</p>
									</div>
								) : null}

								<Label htmlFor="price">Price</Label>
								<Input
									id="price"
									type="number"
									{...formik.getFieldProps("price")}
								/>
								{formik.touched.price && formik.errors.price ? (
									<div style={{ width: "100%" }}>
										<p style={{ textAlign: "right", color: "indianred" }}>{formik.errors.price}</p>
									</div>
								) : null}

								<Label htmlFor="rating">Rating</Label>
								<Input
									id="rating"
									type="number"
									{...formik.getFieldProps("rating")}
								/>
								{formik.touched.rating && formik.errors.rating ? (
									<div style={{ width: "100%" }}>
										<p style={{ textAlign: "right", color: "indianred" }}>{formik.errors.rating}</p>
									</div>
								) : null}

								<Label htmlFor="stock">Stock</Label>
								<Input
									id="stock"
									type="number"
									{...formik.getFieldProps("stock")}
								/>
								{formik.touched.stock && formik.errors.stock ? (
									<div style={{ width: "100%" }}>
										<p style={{ textAlign: "right", color: "indianred" }}>{formik.errors.stock}</p>
									</div>
								) : null}

								<Label htmlFor="category">Category</Label>
								<Input

									id="category"
									type="text"
									{...formik.getFieldProps("category")}
								/>
								{formik.touched.category && formik.errors.category ? (
									<div style={{ width: "100%" }}>
										<p style={{ textAlign: "right", color: "indianred" }}>{formik.errors.category}</p>
									</div>
								) : null}

								<Label htmlFor="images">Image</Label>
								<Input

									id="images"
									type="text"
									{...formik.getFieldProps("images")}
								/>
								{formik.touched.images && formik.errors.images ? (
									<div style={{ width: "100%" }}>
										<p style={{ textAlign: "right", color: "indianred" }}>{formik.errors.images}</p>
									</div>
								) : null}

								<SubmitBtn type="submit" disabled={!formik.isValid || formik.isSubmitting}>
									{formik.isSubmitting ? <ClipLoader
										color='blue'
										size={25}
										aria-label="Loading Spinner"
									/> : 'Submit'}
								</SubmitBtn>
							</Container>
							<div
								style={{
									display: "flex",
									alignContent: "space-between",
									width: "100%",
									justifyContent: "space-between",
								}}
							>
							</div>
						</Form>
					</Wrapper>
				)}
			</Formik>
		</Portal>
	);
};
