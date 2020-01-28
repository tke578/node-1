import React from 'react';
import Container from "react-bootstrap/Container";
import TableIndex from "./TableIndex";


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