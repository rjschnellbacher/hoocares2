if(Meteor.isClient) {
	Template.reason.events({

		'click .reason-button': function (e) {
			e.preventDefault();

	    Session.set("reason",e.target.innerText);
	    
	    Router.go("/contactInfo");
	  }
	});
}