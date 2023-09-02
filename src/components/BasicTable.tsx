import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import { ReactComponent as TrashIcon } from '../assets/trashTest.svg';
import { pxToRem } from '../helpers/functions';
import { openAddPostModal } from '../redux/addPostModal/addPostModalSlice';
import { removeProduct } from '../redux/productsSlice/productsSlice';
import { store } from '../redux/store';
import { DEFAULT_BORDER_RADIUS } from '../style/constants';
import { TitleComponent } from './TitleComponent';
const Wrapper = styled.div`
   display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    padding: ${pxToRem(6)} ${pxToRem(50)};
`

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const StyledTd = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
    height: ${pxToRem(50)};
`;

const StyledTh = styled.th`
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #0082D1;
    color: white;
`;

const StyledTr = styled.tr`
    &:hover {
        background-color: #E1C16E;
        color: black
    }
`;

const Input = styled.input`
    padding: ${pxToRem(10)} ${pxToRem(6)};
    border: 1px solid grey;
    border-radius: ${DEFAULT_BORDER_RADIUS};
    width: ${pxToRem(300)};
    background-color: transparent;
    color: #fff;
    margin-left: ${pxToRem(20)};

    &:focus {
        outline: none;
        border: 1px solid darkorange;
    }
`

const AddBtn = styled.button`
	background-color: transparent;
	width: ${pxToRem(180)};
	height: ${pxToRem(35)};
    color: white;
	font-size: ${pxToRem(16)};
	border: 1px solid white;
	border-radius: ${DEFAULT_BORDER_RADIUS};

	padding: 0;
	cursor: pointer;

	&:hover {
		scale: 1.05;
        border: 1px solid darkorange;
        color: darkorange;
        
	}

`;

const TitleBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${pxToRem(20)};
    width: 100%;
    justify-content: space-between;
    padding: 0 ${pxToRem(16)};
`

type columnsType = ColumnDef<any>[]

export type AddDispatch = typeof store.dispatch;

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

type Props = {
    products: Product[]
};

export const BasicTable = ({ products }: Props) => {

    const dispatch = useDispatch<AddDispatch>();
    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')
    const data = useMemo(() => products, [products])

    const handleRemoveProduct = (productId: string) => {
        const id = Number(productId);
        dispatch(removeProduct(id));
    };

    const columns: columnsType = [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Title',
            accessorKey: 'title',
        },
        {
            header: 'Description',
            accessorKey: 'description',
        },
        {
            header: 'Price',
            accessorKey: 'price',
        },

        {
            header: 'Rating',
            accessorKey: 'rating',
        },
        {
            header: 'Stock',
            accessorKey: 'stock',
        },
        {
            header: 'Category',
            accessorKey: 'category',
        },
        {
            header: 'Photo',
            accessorKey: 'images',
            cell: (data) => {
                return (

                    <img
                        {...{
                            style: { cursor: 'pointer', width: '50px', height: '50px' },
                            src: data.row.original.images[0] ?? '',
                            alt: 'imagePhoto'
                        }}
                    />
                )
            },
        },
        {
            header: 'Delete',
            accessorKey: 'delete',
            cell: (data) => {
                return (
                    <p onClick={() => handleRemoveProduct(data.row.original.id)}>
                        <TrashIcon style={{ width: '20px', cursor: 'pointer', }} />
                    </p>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering
        },
        //@ts-ignore
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering
    })

    return <Wrapper>
        <TitleBox>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <TitleComponent type={1} text={'Market Place'} size={30} />
                <Input type='text' value={filtering} onChange={(e) => setFiltering(e.target.value)} placeholder='Search product...' />
            </div>
            <AddBtn onClick={() => dispatch(openAddPostModal())}>Add product</AddBtn>
        </TitleBox>
        <StyledTable>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <StyledTr key={headerGroup.id}>
                        {headerGroup.headers.map(header =>
                            <StyledTh onClick={header.column.getToggleSortingHandler()} key={header.id} style={{ backgroundColor: header.column.columnDef.header === 'Delete' ? 'red' : '#0082D1' }}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {
                                    { asc: '⬆️', desc: '⬇️' }[header.column.getIsSorted() as string ?? null]
                                }
                            </StyledTh>)}
                    </StyledTr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => <StyledTr key={row.id}>
                    {row.getVisibleCells().map(cell => <StyledTd key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </StyledTd>)}
                </StyledTr>)}
            </tbody>
            <tfoot>
                {table.getFooterGroups().map(footerGroup => (
                    <StyledTr key={footerGroup.id}>
                        {footerGroup.headers.map(footer => <StyledTh key={footer.id}>
                            {flexRender(footer.column.columnDef.footer, footer.getContext())}
                        </StyledTh>)}
                    </StyledTr>
                ))}
            </tfoot>
        </StyledTable>
    </Wrapper>
}