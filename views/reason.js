if(Meteor.isClient) {
	Template.reason.events({

		'click .reason-button': function (e) {
			e.preventDefault();

			console.log("this.value: ", this.value);
	    Session.set("reason",this.value);
	    console.log("Session.get('program'): ", Session.get('program'));
			console.log("Session.get('reason'): ", Session.get('reason'));
	    Router.go("/contactInfo");
	  }
	});
}