import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import img from '../../../images/loginimage.jpg'

const Login = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const { signIn, loading } = useContext(AuthContext);
	const [loginError, setLoginError] = useState("");

	const navigate = useNavigate();

	const handleLogin = (data) => {
		console.log(data);
		setLoginError("");
		signIn(data.email, data.password)
			.then((result) => {
				const user = result.user;
				console.log(user);
				toast.success("Loged in successfully");
				navigate('/')
			})
			.catch((error) => {
				console.log(error.message);
				setLoginError(error.message);
			});
	};
	return (
		<div className="hero w-full my-20">
			<div className="hero-content gap-20 grid md:grid-cols-2 flex-col lg:flex-row">
				<div className="text-center lg:text-left">
					<img className="w-3/4" src={img} alt="" />
				</div>
				<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20 px-10">
					<h1 className="text-2xl font-bold text-center">Login now!</h1>
					<form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Email</span>
						</label>

						<input
							{...register("email",{required : "Email Address is required"})}
							type="text"
							placeholder="Type here"
							className="input input-bordered w-full max-w-xs"
						/>
                        {errors.email && <p className="text-red-500">{errors.email?.message}</p>}
					</div>

						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Password</span>
							</label>

							<input
								{...register("password", {
									required: "password is required",
									minLength: {
										value: 6,
										message: "password should be 6 characters logn",
									},
								})}
								type="password"
								placeholder="Type here"
								className="input input-bordered w-full max-w-xs mb-4"
							/>

							{errors.password && (
								<p className="text-red-500">{errors.password?.message}</p>
							)}

							<input
								className="btn btn-info w-full mb-4"
								value="Log In"
								type="submit"
							/>

							{loginError && <p className="text-red-500">{loginError}</p>}
						</div>
					</form>
					<small>
					<p>
						Already have an account ?
						<Link className="link link-hover text-secondary" to="/signup">
							Please sign up!
						</Link>
					</p>
				</small>
				</div>
			</div>
		</div>
		
	);
};

export default Login;
