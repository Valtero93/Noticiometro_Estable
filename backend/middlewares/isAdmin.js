function isAdmin(req, res, next) {
  try {
    if (req.auth.rol !== "admin") {
      throw new Error("Solo el administrador puede hacer esto");
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { isAdmin };
