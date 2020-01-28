import React from "react";


function PostType({postType}){
	const postTypeList = {"": "Choose a value type", "valid": "Valid", "invalid": "In-valid", "expired": "Expired"}
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
					{
					 	Object.keys(postTypeList).map(key => <option key={key} value={key}>{postTypeList[key]}</option>)
					}
				</select>
			</div>
		</div>
	);
}

export default PostType