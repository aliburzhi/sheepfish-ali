import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import { hexToRgbA, pxToRem } from '../../helpers/functions';
import { useClickOutside } from '../../hooks/useClickOutSide';
import { DEFAULT_BORDER_RADIUS } from '../../style/constants';

const Wrapper = styled.div(
	() => css`
		position: fixed;
		inset: 0;
		background-color: ${hexToRgbA('#212426', '0.8')};
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		z-index: 1000;
	`
);

const Content = styled.div(
	({ size }: any) => css`
		background-color: #1C2125;
		width: ${pxToRem(size === 'xs' ? 480 : size === 'small' ? 450 : size === 'large' ? 685 : size === 'xl' ? 755 : 1300)};
		max-width: calc(100% - ${pxToRem(40)});
		display: flex;
		box-sizing: border-box;
		align-items: stretch;
		justify-content: flex-start;
		position: ${size === 'small' ? 'absolute' : 'relative'};
		top: ${size === 'small' ? pxToRem(90) : null};
		padding: ${pxToRem(48)} ${pxToRem(22)} ${pxToRem(24)};
		border-radius: ${DEFAULT_BORDER_RADIUS};
		border: 1px solid grey;
		box-shadow: ${pxToRem(10)} ${pxToRem(10)} ${pxToRem(20)} ${hexToRgbA('#0A0A0A')};
		height: calc(100% - ${pxToRem(40)});
		max-height: ${pxToRem(size === 'xs' ? 200 : size === 'small' ? 305 : size === 'large' ? 530 : size === 'xl' ? 690 : 750)};
	`
);

const BackButton = styled.div(
	() =>
		css`
			cursor: pointer;
			position: absolute;
			line-height: ${pxToRem(22)};
			top: 0;
			left: 0;
			padding: ${pxToRem(12)} ${pxToRem(22)};
			font-weight: 400;
			color: #ffffff;
		`
);

const CloseIcon = styled.div(() => {

	return css`
		cursor: pointer;
		position: absolute;
		line-height: ${pxToRem(22)};
		top: 0;
		font-weight: 400;
		font-size: ${pxToRem(10)};
		padding: ${pxToRem(12)} ${pxToRem(14)};
		left: unset;
		right: 0;
		color: #ffffff;
`;
});

const createWrapperAndAppendToBody = (wrapperId: string) => {
	const wrapperElement = document.createElement('div') as HTMLElement;
	wrapperElement.setAttribute('id', wrapperId);
	document.body.appendChild(wrapperElement);

	return wrapperElement;
};

type WrapperProps = {
	children: ReactNode;
	wrapperId: string;
};



const PortalWrapper = ({ children, wrapperId = 'react-portal-wrapper' }: WrapperProps) => {
	const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

	useLayoutEffect(() => {
		let element = document.getElementById(wrapperId) as HTMLElement;
		let systemCreated = false;
		if (!element) {
			systemCreated = true;
			element = createWrapperAndAppendToBody(wrapperId);
		}
		setWrapperElement(element);

		return () => {
			if (systemCreated && element.parentNode) {
				element.parentNode.removeChild(element);
			}
		};
	}, [wrapperId]);

	if (wrapperElement === null) return null;

	return createPortal(children, wrapperElement);
};

type Props = {
	children: ReactNode;
	isOpen: boolean;
	hasBackButton?: boolean;
	size?: string;
	handleClose: () => void;
	handleBack?: () => void;
	closeOutside?: boolean;
	themeMode?: string;
};

export const Portal = ({
	children,
	isOpen,
	hasBackButton = false,
	handleClose,
	size = 'small',
	handleBack,
	closeOutside = true,
	themeMode = 'auto'
}: Props) => {

	const domNode = useClickOutside(() => {
		if (isOpen && closeOutside) handleClick();
	});

	const handleClick = () => {
		handleClose();
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [isOpen]);

	useEffect(() => {
		const closeOnEscapeKey = (e: KeyboardEvent) => {
			if (isOpen && e.key === 'Escape') handleClick();
		};
		document.body.addEventListener('keydown', closeOnEscapeKey);

		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey);
		};
	});

	return isOpen ? (
		<PortalWrapper wrapperId="react-portal-modal-container">
			<Wrapper>
				{/* @ts-ignore */}
				<Content size={size} ref={closeOutside ? domNode : null}>
					{hasBackButton ? (
						<BackButton onClick={handleBack} color={themeMode}>
							&#8592; BACK
						</BackButton>
					) : null}
					<CloseIcon onClick={handleClick} color={themeMode}>
						&#x2715;
					</CloseIcon>
					{children}
				</Content>
			</Wrapper>
		</PortalWrapper>
	) : null;
};