import React, {useState, useEffect} from "react";
import axios from 'axios';

function PostType({postType}){
	const postTypeList = {"": "Choose a value type", "valid": "Valid", "invalid": "In-valid", "expired": "Expired"}
	const [statuses, setStatuses] = useState(null);
	useEffect(() =>{
		// setNewTodo(list)
		axios.get("http://localhost:8080/post_status_types")
			.then(response => {
				let statusObj = {"": "Chose a status type"};
				for (const status of response.data.statuses){
					statusObj[status] = status;
				}
				setStatuses(statusObj)
				// setResponse(response.data);
				console.log(response);
			})
			.catch(error => {
				// setErroronApi(true)
				
				console.log(error);
			});

		// console.log("This is new todo "+ newTodo);
	}, []);
	
	// postStatuses();
	// OLD
	// const [postTypeList, setPostTypeList] = useState({"": "Choose a value type", "valid": "Valid", "invalid": "In-valid", "expired": "Expired"});
	// const [selectedOptions, setSeletedOptions] = useState([]);


	// OLD
	// useEffect(()=>{
	// 	// debugger;
	// 	if(selectedOptions.length == 0){
	// 		return;
	// 	}
	// 	// debugger;
	// 	// someThing(selectedOptions)
 //    	console.log('This is the selectedOptions '+ selectedOptions);
 //  	},[selectedOptions]); //watch list for changes
	
 	// WAS USED ON CHAGN
	// function check(event){
	// 	setSeletedOptions([...event.target.selectedOptions].map(key => key.value));
	// 	// 	someThing(selectedOptions);
	// 	// console.log('Hi');
	// }

	return(
		<div className="form-group">
			<div className="col-xs-2 text-right">
				<label className="font-weight-bold">Type of Post:</label>
			</div>
			<div className="col-xs-4 col-sm-4">	
				<select multiple className="custom-select" 
						onChange={(event) => {
							const values = [...event.target.selectedOptions].map(key => key.value);
							postType(values);
							// debugger;	
							
						}
					}>
					{statuses 
						? Object.keys(statuses).map(key => <option key={key} value={key}>{statuses[key]}</option>)
						: 'blah'
					}
				</select>
			</div>
		</div>
	);
}

export default PostType