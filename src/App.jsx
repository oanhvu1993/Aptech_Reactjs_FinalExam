import { Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutComponent from './component/LayoutComponent'
import HomePageComponent from './component/Home/HomePageComponent'
import CategoriesPageComponent from './component/Categories/CategoriesPageComponent'
import ProductDetailPageComponent from './component/Products/ProductDetailPageComponent'
import FavoritePageComponent from './component/Favorite/FavoritePageComponent'
import AboutPageComponent from './component/About/AboutPageComponent'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {


  return (
    <>
      <ToastContainer position="bottom-left" closeOnClick />
      <Routes>
        <Route path='/' element={<LayoutComponent />}>
          <Route index element={<HomePageComponent />} />
          <Route path='/Categories/' element={<CategoriesPageComponent />} />
          <Route path='/Categories/:id' element={<CategoriesPageComponent />} />
          <Route path='/About' element={<AboutPageComponent />} />
          <Route path='/Products/:id' element={<ProductDetailPageComponent />} />
          <Route path='/Favorites' element={<FavoritePageComponent />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
