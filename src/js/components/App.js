var React = require('react');
var AppStore = require('../stores/AppStore');
var AddForm = require('./AddForm.js');

function getAppState(){
	return {
		contacts: AppStore.getContacts()
	}
}

var App = React.createClass({

	getInitialState:function(){
		return getAppState();
	},
	componentDidMount: function(){
		AppStore.addChangeListener(this._onChange);
	},
	componentWillUnmout:function(){
		AppStore.removeChangeListener(this._onChange);
	},
	_onChange:function(){
		this.setState(getAppState());
	},
	render: function(){
		console.log( "here", this.state.contacts );
		return (
			<div>
				<AddForm />
			</div>
		);
	}
}); 

module.exports = App;