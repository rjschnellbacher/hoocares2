Template.thankYou.events({

  'click .thankYou-button': function (e) {
    e.preventDefault();

    var office = Session.get("office");

    Router.go("/"+office);
  }
});
