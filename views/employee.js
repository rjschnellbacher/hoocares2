if (Meteor.isClient) {
  Template.visitorList.helpers({
    visitors: function() {
      return [
        {
          first_name: 'John',
          last_name: 'Doe',
          program: 'TANF',
          reason: 'Applying for Services',
          status: 'Waiting'
        },
        {
          first_name: 'Jane',
          last_name: 'Doe',
          program: 'SNAP',
          reason: 'Applying for Services',
          status: 'Waiting'
        },
        {
          first_name: 'Jerry',
          last_name: 'Doe',
          program: 'Medicaid',
          reason: 'Applying for Services',
          status: 'Waiting'
        },
      ];
    },
  });

  Template.helpingList.helpers({
    visitors: function() {
      return [
        {
          first_name: 'John',
          last_name: 'Doe',
          program: 'TANF',
          reason: 'Applying for Services',
          employee: 'Francis Bacon'
        },
        {
          first_name: 'Jane',
          last_name: 'Doe',
          program: 'SNAP',
          reason: 'Applying for Services',
          employee: 'Jon Keats'
        },
        {
          first_name: 'Jerry',
          last_name: 'Doe',
          program: 'Medicaid',
          reason: 'Applying for Services',
          employee: 'Walt Whitman'
        },
      ];
    },
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

Accounts.config({
  forbidClientAccountCreation: true,
  loginExpirationInDays: 1
});
