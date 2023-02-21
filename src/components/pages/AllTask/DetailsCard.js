import React from 'react';
import { HiArchiveBoxXMark,HiPencil } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const DetailsCard = ({task,handleDelete}) => {
    const {title, message,date, _id} = task
    return (
        <div className="card bg-base-100 text-black shadow-xl p-5">
			<div className="card-body items-center text-center">
				<h2 className="card-title">{title}</h2>
				<p>{message}</p>
				<div className="card-actions justify-end mt-4">
					<button onClick={() => handleDelete(_id)} className="btn btn-error text-white"><HiArchiveBoxXMark className='text-2xl'/></button>
					<Link to={`/edit/${_id}`} className="btn btn-info"><HiPencil className="text-2xl"/></Link>
				</div>
			</div>
		</div>
    );
};

export default DetailsCard;