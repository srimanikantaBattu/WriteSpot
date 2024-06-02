import React from 'react'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './RootLayout'
import DeletePost from './components/Deletepost/Deletepost'
import ErrorPage from './components/ErrorPage'
import Home from './components/Home/Home'
import CreatePost from './components/CreatePost/CreatePost'
import Login from './components/Login/Login'
import EditPost from './components/Editpost/Editpost'
import Register from './components/Register/Register'
import PostDetails from './components/PostDetails/PostDetails'
import UserProfile from './components/UserProfile/UserProfile'
import Authors from './components/Authors/Authors'
import Dashboard from './components/Dashboard/Dashboard'
import AuthorPosts from './components/Authorposts/AuthorPosts'
import CategoryPosts from './components/CategoryPosts/CategoryPosts'
import Logout from './components/Logout/Logout'
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element : <RootLayout />,
      errorElement: <ErrorPage />,
      children:[
{index:true, element:<Home />},
{path:"posts/:id" , element:<PostDetails />},
{path:"register" , element:<Register />},
{path:"login" , element:<Login />},
{path:"profile/:id" , element:<UserProfile />},
{path:"authors" , element:<Authors />},
{path:"create" , element:<CreatePost />},
{path:"posts/:id/edit" , element:<EditPost />},
{path:"posts/categories/:category" , element:<CategoryPosts />},
{path:"posts/users/:id" , element:<AuthorPosts />},
{path:"myposts/:id" , element:<Dashboard />},
{path:"logout" , element:<Logout />},
{path:"posts/:id/delete" , element:<DeletePost />},

      ]
    }
  ])
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App