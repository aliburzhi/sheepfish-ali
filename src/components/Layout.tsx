import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import { pxToRem } from '../helpers/functions';
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_BORDER_RADIUS, DEFAULT_FONT_SIZE } from '../style/constants';

const NavList = styled.ul`
    width: 100%;
    background-color: ${DEFAULT_BACKGROUND_COLOR};
    list-style: none;
    display: flex;
    font-size: ${DEFAULT_FONT_SIZE};
    margin: 0;
    min-height: ${pxToRem(60)};
    justify-content: center;
    align-items: center;
    justify-content: space-evenly;
    padding: 0;
`

const StyledLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  border: 1px solid transparent;
  padding: ${pxToRem(6)};
  border-radius: ${DEFAULT_BORDER_RADIUS};

  &.active {
    color: orange;
    text-decoration: none;
    border: 1px solid orange;
  }
  &:hover { 
    opacity: 0.8;
  }
`;

export const Layout = () => {
    return (
        <nav>
            <NavList>
                <li>
                    <StyledLink to="/">Home</StyledLink>
                </li>
                <li>
                    <StyledLink to="/products">Products</StyledLink>
                </li>
            </NavList>
            <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
            </Suspense>
        </nav >
    )
}