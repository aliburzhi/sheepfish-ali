import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Layout } from './components/Layout';
import { pxToRem } from './helpers/functions';
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_FONT_SIZE } from './style/constants';

export const GlobalStyles = createGlobalStyle`
	html {
		background-color: ${DEFAULT_BACKGROUND_COLOR};
	}

	body {
		font-size: ${DEFAULT_FONT_SIZE};
		// min-height: 100vh;
		height: 100vh;
		color: white;
		box-sizing: border-box;
		scroll-behavior: smooth;
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
		margin: 0 auto;
		padding: 0 ${pxToRem(20)} ${pxToRem(40)};
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		background: ${DEFAULT_BACKGROUND_COLOR}
	}

	*::-webkit-scrollbar {
		display: none;
	}
`;

const Home = lazy(() => import('./components/Home'))
const Products = lazy(() => import('./pages/Products'));

function App() {
  return (
    <div>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path='products' element={<Products />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
