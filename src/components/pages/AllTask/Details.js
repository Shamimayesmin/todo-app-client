import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import DetailsCard from "./DetailsCard";


const Details = () => {
	
	const [loading, setLoading] = useState(true);
	const [tasks, setTasks] = useState([]);
	

	useEffect(() => {
		fetch(" https://todo-app-server-ten.vercel.app/addTask")
			.then((res) => res.json())
			.then((data) => {
				// console.log(data)
				setTasks(data);
				setLoading(false);
			});
	}, [setLoading]);

	if (loading) {
		return (
			<div className="flex items-center">
				<div className="mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-400"></div>
			</div>
		);
	}

	const handleDelete = (id) => {
		const procced = window.confirm("Do you want to delete this task");
		if (procced) {
			fetch(` https://todo-app-server-ten.vercel.app/addTask/${id}`, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					if (data.deletedCount > 0) {
						toast.success("deleted successfully");
						const remaining = tasks.filter((ta) => ta._id !== id);
						setTasks(remaining);
					}
				});
		}
	};
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-14">
			{tasks &&
				tasks?.map((task) => (
					<DetailsCard
						key={task._id}
						task={task}
						handleDelete={handleDelete}
					></DetailsCard>
				))}
		</div>
	);
};

export default Details;
