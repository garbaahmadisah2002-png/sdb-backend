const bcrypt = require("bcryptjs");

const users = []; // TEMP STORAGE (no DB yet)

exports.register = (req, res) => {
    const { username, password } = req.body;
    const hashed = bcrypt.hashSync(password, 10);

    users.push({ username, password: hashed });

    res.json({
        message: "User registered",
        user: { username }
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) return res.status(400).json({ message: "User not found" });

    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    res.json({ message: "Login successful" });
};
