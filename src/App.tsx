import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '@/routes/home/Home'
import ProfilePage from '@/routes/profile/ProfilePage';
import AccountPage from '@/routes/accounts/AccoutPage';
import AuthPage from '@/routes/auth/AuthPage';
import { useContext, useEffect } from 'react';
import { Context } from './main';
import { observer } from 'mobx-react-lite'
import { IUser } from './models/IUser';
import Layout from './components/Layout';

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/profile",
                element: <ProfilePage />,
            },
            {
                path: "/accounts/:id",
                element: <AccountPage />,
            },
            {
                path: '/auth',
                element: <AuthPage />
            }
        ]
    }
    
])

const App = () => {
    const { store } = useContext(Context);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        const userItem = localStorage.getItem("user")
        if(userItem) {
            const user:IUser = JSON.parse(userItem)
            store.setUser(user)
        }
    }, []);
    return (
        <RouterProvider router={router} />
    );
}

export default observer(App);