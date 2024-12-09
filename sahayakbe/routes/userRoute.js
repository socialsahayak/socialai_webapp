// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Extract token from cookies

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Invalid or expired token:', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Fetch User Info
router.get('/info', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ username: user.username, email: user.email });
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ error: 'Unable to fetch user information' });
  }
});
