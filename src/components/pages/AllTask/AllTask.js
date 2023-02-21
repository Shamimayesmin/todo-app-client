import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const AllTask = () => {
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

	if (loading) {
		return (
			<div className="flex items-center">
				<div className="mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-400"></div>
			</div>
		);
	}

    


	const handleCheckbox = () => {
		console.log("the checkbox toggled");
	};

	return (
		<div className="my-16">
			<div className="overflow-x-auto">
				<table className="table w-2/3 mx-auto">
					<tbody>
						{tasks &&
							tasks?.map((task) => (
								<tr key={task._id} className="border border-black rounded-lg">
									<td>{task.title}</td>
									<td>
										<input
											onChange={handleCheckbox}
											type="checkbox"
											id="checkbox"
											checked='checkbox'
											className="checkbox checkbox-primary"
										/>
										
									</td>
									<td>
										<Link to='/details'>
                                        <button className="btn btn-info">Details</button>
                                        </Link>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllTask;
