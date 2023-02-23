import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const AllTask = () => {
	const [loading, setLoading] = useState(true);
	const [tasks, setTasks] = useState([]);
	const [checked, setChecked] = useState(false);
	const [searchData, setSearchData] = useState([]);
	const [filterVal, setFilterVal] = useState("");
	useEffect(() => {
		fetch(" https://todo-app-server-ten.vercel.app/addTask")
			.then((res) => res.json())
			.then((data) => {
				// console.log(data)
				setTasks(data);
				setSearchData(data);
				setLoading(false);
			});
	}, [setLoading]);

	// filter task
	const filterComplete = (item) => {
		const updateFilter = tasks.filter((com) => {
			return com.complete === item;
		});
		setTasks(updateFilter);
	};
	const filterActive = (ite) => {
		const updateFilter = tasks.filter((act) => {
			return act.status === ite;
		});
		setTasks(updateFilter);
	};

	// handle searchbar
	const handleFilterSearch = (e) => {
		if (e.target.value == "") {
			setTasks(searchData);
		} else {
			const filterResult = searchData.filter((item) =>
				item.title.toLowerCase().includes(e.target.value.toLowerCase())
			);
			// setTasks(filterResult)
			if (filterResult.length > 0) {
				setTasks(filterResult);
			} else {
				setTasks([{ title: "No Task" }]);
			}
		}
		setFilterVal(e.target.value);
	};

	//handle checkbox
	const handleCheckbox = (id) => {
		fetch(` https://todo-app-server-ten.vercel.app/addTask/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ checked: checked }),
		})
			.then((res) => res.json())

			.then((data) => {
				console.log(data);
				if (data.modifiedCount > 0) {
					// refetch();
					toast.success(`task completed successfully`);
					const reamaining = tasks.map((ta) => {
						if (ta._id === id) {
							ta.complete = !ta.complete;
						}
						return ta;
					});
					setChecked(reamaining);
				}
			});
	};

	if (loading) {
		return (
			<div className="flex items-center">
				<div className="mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-400"></div>
			</div>
		);
	}

	//className={task?.complete === 'true' && "line-through"}
	//{`/details/${task._id}`}
	return (
		<div className="my-16">
			<div className="form-control w-1/3 mx-auto mb-20">
				<input
					type="text"
					value={filterVal}
					onInput={(e) => handleFilterSearch(e)}
					placeholder="Search"
					className="input input-bordered"
				/>
				<div className="mt-10">
					<button
						className="mr-5 btn btn-secondary"
						onClick={() => setTasks(tasks)}
					>
						All
					</button>
					<button
						className="mr-5 btn btn-error"
						onClick={() => filterComplete("true")}
					>
						Complete
					</button>
					<button
						className="btn bg-green-400"
						onClick={() => filterActive("active")}
					>
						Active
					</button>
				</div>
			</div>
			<div className="overflow-x-auto">
				<table className="table w-2/3 mx-auto">
					<tbody>
						{tasks &&
							tasks?.map((task) => (
								<tr key={task._id} className="border border-black rounded-lg">
									<td style={{textDecoration: task?.complete === "true" ? "line-through" : null}}>{task.title}</td>
									<td>
										{task.title && !task.complete && (
											<button className="rounded-lg btn-sm text-green-400">
												Active
											</button>
										)}
										{task.title && task.complete && (
											<button className=" text-red-400 btn-sm">
												completed
											</button>
										)}
									</td>
									<td>
										<label>
											<input
												onChange={() => handleCheckbox(task._id)}
												type="checkbox"
												id="checkbox"
												checked={task?.checked}
												disabled={task?.complete === "true" && checked}
												className="checkbox checkbox-primary"
											/>
										</label>
									</td>
									<td>
										<Link to="/details">
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
