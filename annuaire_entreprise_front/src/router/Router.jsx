import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import BackOffice from '../pages/BackOffice';
import Layout from '../components/layouts/Layout';
import Search from '../pages/Search';
import Site from '../pages/Site';
import Error from '../pages/Error';

const Router = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/admin' element={<BackOffice/>} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/sites' element={<Site />} />
                    <Route path='*' element={<Error />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default Router;