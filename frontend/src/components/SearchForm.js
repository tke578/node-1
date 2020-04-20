import React, {useState, useEffect} from "react";
import axios from 'axios';
import moment from "moment"


import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostType from "../hooks/PostType"
import PostDate from "../hooks/PostDate"
import PostString from "../hooks/PostString"
import Spinner from "react-bootstrap/Spinner"
import ListTable from "../components/ListTable"
import Button from "react-bootstrap/Button"

function SearchForm(){
	const [searchQuery, setSearchQuery] = useState({});
	const [collection, setCollection] = useState(null);
	const [lastDocID, setLastDocID] = useState(null);
	// const [errorOnApi, setErroronApi] = useState(false);

	useEffect(()=>{
		if (Object.keys(searchQuery).length === 0){
			return;
		}
		// debuggerr;
		// console.log("This is the response")
		// console.log(collection);
		console.log("This is search searchQuery " + JSON.stringify(searchQuery));
		// console.log('last id '+ lastDocID)
		
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

	}

	function getLastDocID(collection){
		if(collection){
			setLastDocID(collection[collection.length-1]["_id"])
		}
	}

	function parseDate(date){;
		return moment(date).format('MM-DD-YYYY')
	}

	function submitForm(){
		if(Object.keys(searchQuery).length > 0){

			axios.get("http://localhost:8080/search",{
				params: {
					post_status: 	JSON.stringify(searchQuery.post_types),
					post_time: 		parseDate(searchQuery.post_date),
					description:    searchQuery.post_descripton
				} 	
				})
				.then(response => {
					// debugger;
					setCollection(response.data.data);
					console.log(response);
					getLastDocID(response.data.data)
				})
				.catch(error => {
					// setErroronApi(true)
					
					console.log(error);
				});
		}
		
	}

	function refresh(){
		window.location.reload();
	}

	function fetchMore(){
		axios.get("http://localhost:8080/search", {
			params: {
					last_doc_id: lastDocID,
					post_status: JSON.stringify(searchQuery.post_types)
				}
			})
			.then(response => {
				setCollection(collection.concat(response.data.data));


				// setResponse(response.data.data);
				console.log(response);
				getLastDocID(response.data.data)
			})
			.catch(error => {
				// setErroronApi(true)
				
				console.log(error);
			});
		// setCollection(collection.concat(collection));
		console.log(lastDocID);
	}


	useEffect(() =>{
		// setNewTodo(list)
		axios.get("http://localhost:8080/search")
			.then(response => {
				setCollection(response.data.data);
				console.log(response);
				getLastDocID(response.data.data)
			})
			.catch(error => {
				// setErroronApi(true)
				
				console.log(error);
			});

		// console.log("This is new todo "+ newTodo);
	}, []);
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
				<Row>
					<Col md={{ span:1 , offset: 9 }}>
						<Button onClick={submitForm} variant="info">Search</Button>

					</Col>
					<Col md={{ span:1 }}>
						<Button onClick={refresh} variant="danger">Reset</Button>

					</Col>
					
				</Row>
				
			</Jumbotron>
			{collection
				? 
				[
					<ListTable key="1"collection={collection}></ListTable>,
					<Button key="2" onClick={fetchMore}variant="success">View more</Button>
				]
				
				: <Spinner animation="grow" size="lg"/>

			}	
			
		</div>
	);
}

export default SearchForm