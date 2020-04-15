import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function PostDate({postDate}) {
	const [selectedDate, setSelectedDate] = useState('');


	return(
		<div className="form-group">
			<div className="col-xs-2 text-right">
				<label className="font-weight-bold">Date of Post:</label>
			</div>
			<div className="col-xs-4 col-sm-4">	
				<DatePicker
					selected={selectedDate}
					onChange={(event) => {
							const values = event;
							setSelectedDate(values);
							postDate(values.toDateString());
						}
					}
				/>
			</div>
		</div>
	);
}


export default PostDate