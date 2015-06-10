if(Meteor.isClient) {
	Template.getStarted.events({

		'click .program-button': function (e) {
			e.preventDefault();

	    Session.set("program",e.target.innerText);

	    Router.go("/reason");
	  }
	});
}