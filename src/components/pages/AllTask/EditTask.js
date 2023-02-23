import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import { coolGray } from "tailwindcss/colors";

const EditTask = () => {
	const loadData = useLoaderData();
	const { title, message, _id } = loadData;
	// console.log(loadData)
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const navigate = useNavigate();

	const handleUpdateTask = (data) => {
		// event.preventDefault();
		// console.log(data)
		const updatedTitle = data.title;
		const updatedMessage = data.message;

		fetch(`  https://todo-app-server-ten.vercel.app/edit/${_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ updatedTitle, updatedMessage }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.matchedCount > 0) {
					toast.success("Task updated");
					// event.target.reset();
					// data.reset();
					navigate("/details");
				}
			});
	};
	return (
		<div className="my-16">
			<h2 className="text-center">Task </h2>
			<form
				onSubmit={handleSubmit(handleUpdateTask)}
				className="w-1/2 mx-auto bg-slate-200 my-8 p-8 rounded-lg"
			>
				<div className="form-control max-w-lg">
					<input
						{...register("title", {
							minLength: {
								value: 50,
								message: "Title should be max 50 characters",
							},
						})}
						type="text"
						placeholder="Type here"
						className="input input-bordered"
						defaultValue={title}
					/>
					{errors.title && (
						<p className="text-red-500">{errors.title?.message}</p>
					)}
				</div>

				<div className="form-control w-full max-w-lg mt-4">
					<textarea
						{...register("message", {
							minLength: {
								value: 120,
								message: "Message should be max 120 characters",
							},
						})}
						type="text"
						placeholder="Type here"
						className="input input-bordered mb-4 p-10"
						defaultValue={message}
					/>

					{errors.message && (
						<p className="text-red-500">{errors.message?.message}</p>
					)}

					<input
						className="btn btn-info w-full mb-4"
						value="Save change"
						type="submit"
					/>
				</div>
			</form>
		</div>
	);
};

export default EditTask;
