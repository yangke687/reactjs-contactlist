var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var AddForm = React.createClass({
	handleSubmit: function(evt){
		evt.preventDefault();
		var contact = {
			name: this.refs.name.value.trim(),
			phone: this.refs.phone.value.trim(),
			email: this.refs.email.value.trim(),
		};
		AppActions.saveContact( contact );
	},
	render: function(){
		return (
			<div>
				<div className="well">
					<h3>Add Contact</h3>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<input type="text" ref="name" className="form-control" placeholder="Add Contact Name"/>
						</div>
						<div className="form-group">
							<input type="text" ref="phone" className="form-control" placeholder="Add Phone Number"/>
						</div>
						<div className="form-group">
							<input type="text" ref="email" className="form-control" placeholder="Add Email Address"/>
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
			</div>
		);
	}
});

module.exports = AddForm;