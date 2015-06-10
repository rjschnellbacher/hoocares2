if(Meteor.isClient) {
	Template.getStarted.events({

		'click .program-button': function (e) {
			e.preventDefault();

			console.log("e: ", e);
	    Session.set("program",this.value);
	    console.log("Session.get('program'): ", Session.get('program'));

	    Router.go("/reason");
	  }
	});
}