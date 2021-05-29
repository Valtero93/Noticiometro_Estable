function isSameUser(req, res, next) {
  try {
    const { id } = req.params;

    if (req.auth.id !== Number(id)) {
      throw new Error("No puedes hacer esto a este usuario");
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { isSameUser };
