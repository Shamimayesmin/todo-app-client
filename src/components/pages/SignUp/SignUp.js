import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const SignUp = () => {
    const { register,formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUserProfile, } = useContext(AuthContext);

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignUp = (data) => {
		console.log(data);
		setError("");

		createUser(data.email, data.password)
			.then((result) => {
				const user = result.user;
				console.log(user);

                handleUpdteUserProfile(data.name,data.email)
				toast.success("user created successfully");
				navigate('/');
			})
			.catch((error) => {
				console.log(error);
				setError(error.message);
			});
	};

    const handleUpdteUserProfile = (name,email) =>{
        const profile = {
            displayName :name,
            email : email,
            
        }
        updateUserProfile(profile)
        .then(() =>{})
        .catch(error => console.error(error))
    }
    return (
        <div className="h-[800px] flex justify-center items-center">
        <div className="w-96 rounded-lg p-7 shadow-2xl">
            <h2 className="text-2xl text-center">Sign Up</h2>
            <form onSubmit={handleSubmit(handleSignUp)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>

                    <input
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.name && (
                        <p className="text-red-500">{errors.name?.message}</p>
                    )}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>

                    <input
                        {...register("email", { required: "Email is required" })}
                        type="email"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email?.message}</p>
                    )}
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
                                message: "password should be 6 characters long",
                            },

                            pattern: {
                                value:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                                message: "password should contain atleast one uppercase one lowercase and a number",
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
                        value="Sign Up"
                        type="submit"
                    />

                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </form>
            <small>
                <p>
                    Already have an account ?
                    <Link className="link link-hover text-secondary" to="/login">
                        Please Login
                    </Link>
                </p>
            </small>
            {/* <div className="divider">OR</div>
            <button
                onClick={handleGoogleSignIn}
                className="btn btn-outline hover:bg-pink-300 mb-3 w-full"
            >
                CONTINUE WITH GOOGLE
            </button> */}
        </div>
    </div>
    );
};

export default SignUp;