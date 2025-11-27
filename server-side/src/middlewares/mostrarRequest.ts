export default function mostrarRequest(req, res, next) {
  console.log(req.method + " " + req.url);
  next();
}
