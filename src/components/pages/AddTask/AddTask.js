import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
		event.preventDefault();

		const form = event.target;
		const date = new Date();
        const title = form.title.value;
		const message = form.message.value;
        
		console.log(message,title);

		const task = {
            title,
			message,
			date,
		};
		console.log(task);

		fetch(" http://localhost:5000/addTask", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(task),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.acknowledged) {
					toast.success("Task added successfully");
					form.reset();
					navigate("/all");
				}
			})
			.catch((err) => console.error(err));
	};
    return (
        <div className="my-16">
			<h2 className="text-center text-3xl text-bold">Todo List</h2>
			<form
				onSubmit={handleSubmit}
				className="w-1/3 mx-auto text-black gap-2 mt-10"
			>
				<label className="sr-only" htmlFor="message">
					Title
				</label>
				<input
					className="w-full rounded-md border-gray-500 text-sm border p-4"
					placeholder="Title"
					rows="8"
					id="title"
					name="title"
				></input>
				<textarea
					className="w-full rounded-md border-gray-500 text-sm border mt-2"
					placeholder="Description"
					rows="8"
					id="message"
					name="message"
				></textarea>

				<input
					className="btn bg-teal-600 text-white p-4 rounded-md justify-center items-center"
					type="submit"
					value="add task"
				/>
			</form>
		</div>
    );
};

export default AddTask;