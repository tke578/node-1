import React from 'react'

function PostString({postString}) {
	return(
		<div className="form-group">
			<div className="col-xs-2">
				<label className="font-weight-bold">Descripton of Post:</label>
			</div>
			<div className="col-xs-4 col-sm-4">
				<input type="text" 
					onChange={(e) => {
							postString(e.target.value)
						}
					}
				/>
			</div>
		</div>
	);
}

export default PostString