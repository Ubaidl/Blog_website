import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
     const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided  or user has no token or  user is not logged in.",
      });
    }
    console.log(req.cookies);
console.log(req.cookies?.token);
 console.log("SECRET WHEN VERIFYING:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    console.log("yeh mera decode ha",decoded)

    next();
  } catch (error) {
  console.log("JWT ERROR:", error);

  return res.status(401).json({
    message: "Invalid token",
  });
}
};

export default verifyToken;