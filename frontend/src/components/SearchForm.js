import React, {useState, useEffect} from "react";
import axios from 'axios';

import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import PostType from "../hooks/PostType"
import PostDate from "../hooks/PostDate"
import PostString from "../hooks/PostString"
import Spinner from "react-bootstrap/Spinner"

function SearchForm(){
	const [searchQuery, setSearchQuery] = useState({});
	// const [errorOnApi, setErroronApi] = useState(false);
	// const BASE_URI = "http://localhost:8080";

	useEffect(()=>{
		if (Object.keys(searchQuery).length === 0){
			return;
		}
		// debugger;	
		console.log("This is search searchQuery " + JSON.stringify(searchQuery));
		
		// debugger;
    	
  	}, [searchQuery]); //watch list for changes
	

	function updatePostType(post_type){
		// debugger;
		if (post_type.length > 0){
			// debugger;
			setSearchQuery({...searchQuery, post_types: post_type});
		}
		// 
		// console.log("This is the selected post type " + );
	}

	function updatePostDate(date){
		// debugger;
		if (date.length > 0){
			// debugger;
			// setSearchQuery({...searchQuery, post_types: post_type});
			setSearchQuery({...searchQuery, post_date: date});
		}
		
	}

	function updatePostString(string){
		if (string.length > 0){
			setSearchQuery({...searchQuery, post_descripton: string})
		}

		// debugger
	}


	// useEffect(() =>{
	// 	// setNewTodo(list)
	// 	axios.get("https://financialmodelingprep.com/api/v3/financials/income-statement/sfix")
	// 		.then(response => {
	// 			console.log(response);
	// 		})
	// 		.catch(error => {
	// 			// setErroronApi(true)
				
	// 			console.log(error);
	// 		});

	// 	// console.log("This is new todo "+ newTodo);
	// }, []);
	// const list = options;
	// const postTypeOptions = Object.keys(postTypeList).map(key => <option key={key} value={key}>{postTypeList[key]}</option>)


	return(
		<div className="col-xs-12 col-sm-12">
			<Jumbotron>
				<form className="form-inline">
					<PostType postType={updatePostType}></PostType>
					<PostDate postDate={updatePostDate}></PostDate>
					<PostString postString={updatePostString}></PostString>
				
				</form>
			</Jumbotron>
			<Spinner animation="grow" />
		</div>
	);
}

export default SearchForm