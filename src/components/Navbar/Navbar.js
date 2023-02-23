import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
	const { user, logOut } = useContext(AuthContext);
	const navegate = useNavigate();
	const handleLogOut = () => {
		logOut()
			.then(() => {})
			.catch((err) => console.error(err));
			navegate('/login')
	};
	return (
		<div className="navbar bg-base-300">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<Link to="/">Add Task</Link>
						</li>

						<li>
							<Link to='/all'>All Task</Link>
						</li>
						<li>
							<Link to='/login'>Login</Link>
						</li>
					</ul>
				</div>
				<p className="btn btn-ghost normal-case text-xl">ToDo</p>
			</div>
			<div className="navbar-end hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					<li>
						<Link to='/'>Add Task</Link>
					</li>
					<li>
						<Link to='/all'>All Task</Link>
					</li>
					{
						user?.uid?
						<li>
							<button className="hover:bg-red-500 rounded-3xl" onClick={handleLogOut}>Sign Out</button>
						</li>
						:
						<li>
						<Link to='/login'>Login</Link>
					</li>

					}
					{/* <li>
						<Link to='/login'>Login</Link>
					</li> */}

					<li>
						{/* <div className="form-control">
							<input
								type="text"
								placeholder="Search"
								className="input input-bordered"
							/>
						</div> */}
					</li>
				</ul>
			</div>
			
		</div>
	);
};

export default Navbar;
