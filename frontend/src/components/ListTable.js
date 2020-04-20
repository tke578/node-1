import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Popover from "react-bootstrap/Popover"
import Moment from "react-moment";
import moment from "moment"

const CustomPopover = (data, url) =>{
	return(
		<Popover id="popover-basic">
	    <Popover.Title as="h3">Description/ <a target="_blank" rel="noopener noreferrer" href={url}>Link</a></Popover.Title>
	    <Popover.Content>{data}</Popover.Content>
	  	</Popover>
	)
};


function toDate(date_string){
	debugger;
}

function ListTable({collection}){
	const collectionItems = collection.map((posting, index) =>
		<tr key={index} id={posting.post_id}>
			<td>{index+=1}</td>
			<td>{posting.title}</td>
			<td>
				{ moment(posting.post_time).format('MM-DD-YYYY HH:MM')}
			</td>
			<td>{posting.address}</td>
			<td>{posting.region}</td>
			<td>{posting.price}</td>
			<td>
				<OverlayTrigger trigger="focus" placement="right" overlay={CustomPopover(posting.description, posting.url)}>
    				<Button variant="success">Click</Button>
  				</OverlayTrigger>
  			</td>
			<td>{posting.post_status}</td>
		</tr>
    );
    
	return(
		<div>
			<Table striped bordered hover>
			  <thead>
			    <tr>
			      <th>#</th>
			      <th>Title</th>
			      <th>Posted Date</th>
			      <th>District</th>
			      <th>City</th>
			      <th>Price</th>
			      <th>Description</th>
			      <th>Status</th>
			    </tr>
			  </thead>
			  <tbody>
			    {collectionItems}
			  </tbody>
			</Table>
		</div>
		
		
	)
}

export default ListTable