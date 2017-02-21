var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var AppStore = assign({},EventEmitter.prototype,{
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(cb){
		this.on(CHANGE_EVENT,cb);
	},
	removeChangeListener: function(cb){
		this.remove(CHANGE_EVENT,cb);
	}
});

module.exports = AppStore;