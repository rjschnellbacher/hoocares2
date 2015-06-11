Template.getStarted.events({
  'click .program-button': function (e) {
    e.preventDefault();

    Session.set("program",e.target.innerText);

    var office = Router.current().route._path.substring(1);
    if (office === "")	office = "unknown"
    Session.set("office", office);

    Router.go("/reason");
  }
});
