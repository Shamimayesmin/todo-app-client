import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DetailsCard from "./DetailsCard";

const Details = () => {
	const [loading, setLoading] = useState(true);
	const [tasks, setTasks] = useState([]);
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		fetch("http://localhost:5000/addTask")
			.then((res) => res.json())
			.then((data) => {
				// console.log(data)
				setTasks(data);
				setLoading(false);
			});
	}, [setLoading]);

    const handleDelete = (id) => {
		const procced = window.confirm("Do you want to delete this task");
		if (procced) {
			fetch(`http://localhost:5000/addTask/${id}`, {
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

        {
            tasks &&
            tasks?.map((task) =><DetailsCard key={task._id} task={task} handleDelete={handleDelete}></DetailsCard>)
        }
        
    </div>
		
	);
};

export default Details;
