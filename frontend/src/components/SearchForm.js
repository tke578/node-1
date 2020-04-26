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
import Alert from "react-bootstrap/Alert"

function SearchForm(){
	const [initialLoading, setInitialLoading]   = useState(null);
	const [searchQuery, setSearchQuery] 		= useState({});
	const [collection, setCollection] 			= useState(null);
	const [lastDocID, setLastDocID] 			= useState(null);
	const [errorAPImsg, setErrorAPImsg] 		= useState(null);
	// const apiEndpoint 							= {process.env.REACT_APP_API_ENDPOINT}
	const [loadingSearchBtn, setLoadingSearchBtn] = useState(false);

	const InitialLoading = () => {
		if(initialLoading){
			return(<Spinner animation="grow" size="lg"/>);
		}else{
			return('');
		}
		
	}

	const apiEndpoint = () => process.env.REACT_APP_API_ENDPOINT;

	useEffect(()=>{
		if (Object.keys(searchQuery).length === 0){
			return;
		}
  	}, [searchQuery]); //watch list for changes
	

	function updatePostType(post_type){
		if (post_type.length > 0){
			setSearchQuery({...searchQuery, post_types: post_type});
		}
	}

	function updatePostDate(date){
		if (date.length > 0){
			setSearchQuery({...searchQuery, post_date: date});
		}
	}

	function updatePostString(string){
		if (string.length > 0){
			setSearchQuery({...searchQuery, post_descripton: string})
		}
	}

	function getLastDocID(collection){
		if(collection.length > 0){
			setLastDocID(collection[collection.length-1]["_id"])
		}
	}

	function parseDate(date){
		if(date){
			return moment(date).format('MM-DD-YYYY');
		}
		
	}

	function submitForm(){
		
		if(Object.keys(searchQuery).length > 0){
			setLoadingSearchBtn(true);
			axios.get(apiEndpoint(),{
				params: {
					post_status: 	JSON.stringify(searchQuery.post_types),
					post_time: 		parseDate(searchQuery.post_date),
					description:    searchQuery.post_descripton
				} 	
				})
				.then(response => {
					if(response.data.data.length > 0){
						setCollection(response.data.data);
						getLastDocID(response.data.data)
						setLoadingSearchBtn(false);
					}else{
						setCollection(null);
						setLoadingSearchBtn(false);
					}

					
				})
				.catch(error => {
					if(error.response){
						setErrorAPImsg(error.response.data.message)
					}
					setLoadingSearchBtn(false);
				});
		}
	}

	function refresh(){
		window.location.reload();
	}


	function fetchMore(){
		setLoadingSearchBtn(true);
		axios.get(apiEndpoint(), {
			params: {
					last_doc_id: 	lastDocID,
					post_status: 	JSON.stringify(searchQuery.post_types),
					post_time: 		parseDate(searchQuery.post_date),
					description:    searchQuery.post_descripton
				}
			})
			.then(response => {
				setCollection(collection.concat(response.data.data));
				getLastDocID(response.data.data)
				setLoadingSearchBtn(false);
			})
			.catch(error => {
				if(error.response){
					setErrorAPImsg(error.response.data.message)
				}
				setLoadingSearchBtn(false);
			});
	}


	useEffect(() =>{
		setInitialLoading(true);
		axios.get(apiEndpoint(), {
			})
			.then(response => {
				setCollection(response.data.data);
				getLastDocID(response.data.data)
				setInitialLoading(false);
			})
			.catch(error => {
				if(error.response){
					setErrorAPImsg(error.response.data.message)
				}
				setInitialLoading(false);
			});
	}, []);


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
						<Button disabled={loadingSearchBtn} onClick={submitForm} variant="info">
						{
							loadingSearchBtn ? 'loading' : 'Search'
						}
						</Button>
					</Col>
					<Col md={{ span:1 }}>
						<Button onClick={refresh} variant="danger">Reset</Button>
					</Col>
				</Row>
			</Jumbotron>
			{errorAPImsg && <Alert variant="danger" onClose={() => setErrorAPImsg(null)} dismissible>{errorAPImsg}</Alert>}
			<InitialLoading/> 

			{collection
				? 
				[
					<ListTable key="1" collection={collection}></ListTable>,
					<Button key="2" disabled={loadingSearchBtn} onClick={fetchMore}variant="success">
					{
						loadingSearchBtn ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> : 'View More'
					}
					</Button>
				]
				: null
			}	
		</div>
	);
}

export default SearchForm