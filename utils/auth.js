const withAuth = async (req, res, next) => {
    // TODO: If the user is not logged in, redirect the user to the login page
    if (!req.session.loggedIn) {
      await req.session.destroy();
      res.redirect('/login');
    }
    // TODO: If the user is logged in, allow them to proceed
    else {
      next();
    }
  };
  
  module.exports = withAuth;