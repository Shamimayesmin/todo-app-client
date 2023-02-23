import Home from "../components/Home/Home";
import AllTask from "../components/pages/AllTask/AllTask";
import Details from "../components/pages/AllTask/Details";
import EditTask from "../components/pages/AllTask/EditTask";
import Login from "../components/pages/Login/Login";
import SignUp from "../components/pages/SignUp/SignUp";
import Main from "../layout/Main";
import PrivateRoute from "./PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");
// const { default: Main } = require("../layout/Main");

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Main></Main>,
		children: [
			{
				path: "/",
				element: (
					<PrivateRoute>
						<Home></Home>
					</PrivateRoute>
				),
			},
			{
				path: "/signup",
				element: <SignUp></SignUp>,
			},
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/all",
				element: (
					<PrivateRoute>
						<AllTask></AllTask>
					</PrivateRoute>
				),
			},
			{
				path: "/details",
				element: <Details></Details>,
			},
			{
				path: "/edit/:id",
				loader: ({ params }) =>
					fetch(` https://todo-app-server-ten.vercel.app/edit/${params.id}`),
				element: <EditTask></EditTask>,
			},
		],
	},
]);
