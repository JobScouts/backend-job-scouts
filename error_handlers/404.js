module.exports = (req , res , next) => {
    res.status(404).send(
    {
      status: 404,
      responseText: "Page not found",
      Method : req.Method,
      end_point : req.url
    });
  }