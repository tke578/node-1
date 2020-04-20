import React, { useState, useEffect} from "react";
import Container from "react-bootstrap/Container"
import Jumbotron from "react-bootstrap/Jumbotron"
import TableIndex from "./SearchForm"


class App extends React.Component {
	render () {
		return (
			<Container className="p-3">
				<TableIndex></TableIndex>
			</Container>
			)
	};
}

export default App