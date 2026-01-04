const { auth } = require("./auth");
const jwt = require("jsonwebtoken");

let refreshStore = new Set();
function createAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m", // 1 phút
  });
}
function createRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d", // 7 ngày
  });
}

const setCookies = (res, tokenType, maxAge, token) => {
  res.cookie(tokenType, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge,
  });
};

const authRoute = (app) => {
  app.post("/api/login", auth, (req, res) => {
    const payload = { userId: 123, role: "user" };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    refreshStore.add(refreshToken); // lưu lại để kiểm soát
    setCookies(res, "access_token", 15 * 60 * 1000, accessToken);
    setCookies(res, "refresh_token", 7 * 24 * 60 * 60 * 1000, refreshToken);

    res.status(200).json({ message: "Login successful 😎" });
  });

  //Refresh token
  app.get("/api/refresh-token", auth, (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    if (!refreshStore.has(refreshToken)) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err)
          return res.status(403).json({ message: "Invalid refresh token" });

        refreshStore.delete(refreshToken); // Xoá refresh token cũ
        const payload = { userId: decoded.userId, role: decoded.role };

        const newAccess = createAccessToken(payload);
        const newRefresh = createRefreshToken(payload);

        // lưu refresh mới
        refreshStore.add(newRefresh);
        setCookies(res, "access_token", 15 * 60 * 1000, newAccess);
        setCookies(res, "refresh_token", 7 * 24 * 60 * 60 * 1000, newRefresh);

        res.json({ message: "Refreshed 🔄" });
      }
    );
  });

  app.use("/api/get-me", auth, (req, res) => {
    const user = { id: req.user.userId, role: req.user.role };
    return res.json({ user });
  });

  app.post("/api/logout", (req, res) => {
    const refresh = req.cookies.refresh_token;
    refreshStore.delete(refresh);
  
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
  
    res.json({ message: "Logged out 👋" });
  });
};

module.exports = { authRoute };
