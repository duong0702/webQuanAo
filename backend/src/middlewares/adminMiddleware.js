export const isAdmin = (req, res, next) => {
  console.log("isAdmin middleware - checking role");
  console.log("req.user:", req.user);
  console.log("req.user?.role:", req.user?.role);

  if (req.user && req.user.role === "admin") {
    console.log("User is admin, proceeding");
    next();
  } else {
    console.log("User is NOT admin, rejecting");
    res.status(403).json({ message: "Admin only" });
  }
};
