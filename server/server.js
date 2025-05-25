const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const fs = require('fs').promises;
const cookieParser = require('cookie-parser');

// zezwolenie na dostęp tylko z tego adresu (5173), będzie potrzebne przy post
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,            //ustawia header access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

const json = require('./data.json')
const promotions = json.promotions
const products = json.products || []
const categories = json.categories || []
const usersFilePath = path.join(__dirname, 'users.json');


async function initUsersFile() {
    try {
        await fs.access(usersFilePath);
    } catch (error) {
        await fs.writeFile(usersFilePath, JSON.stringify({ users: [] }, null, 2), 'utf8');
    }
}

initUsersFile();

app.get('/promotions', (req, res) => res.json({ promotions }))

app.get('/promotion/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    const promotion = promotions.find(promotion => promotion.id === id)
    if (promotion) {
        res.json({ promotion })
    } else {
        res.status(404).send('Promotion not found')
    }
})


app.get("/product/:id", (req, res) => {
    const id = req.params.id
    const product = products.find(product => product.id === id)
    if (product) {
        res.json({ product })
    } else {
        res.status(404).send('Product not found')
    }
})

app.get('/products', (req, res) => {
    res.json({ products })
})

app.get('/categories', (req, res) => {
    res.json({ categories })
})

// app.get('/products/:category', (req, res) => {
//     const category = req.params.category
//     const filteredProducts = products.filter(product => product.category === category)
//     res.json({ products: filteredProducts })
// })


// app.get('/products/:category/:id', (req, res) => {
//     const category = req.params.category
//     const id = req.params.id
//     const product = products.find(product => product.category === category && product.id === id)
//     if (product) {
//         res.json({ product })
//     } else {
//         res.status(404).send('Product not found')
//     }
// })


app.post("/createUser", async (req, res) => {
    try {
        const data = await fs.readFile(usersFilePath, 'utf8');
        const usersData = JSON.parse(data);

        const { email, password } = req.body;

        const userExists = usersData.users.some(user => user.email === email);

        if (userExists) {
            res.json({ status: "exists" });
            return;
        }

        usersData.users.push({ email, password });

        await fs.writeFile(usersFilePath, JSON.stringify(usersData, null, 2), 'utf8');

        // Odpowiedź do klienta
        res.json({ status: "registered" });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ status: "error", message: error.message });
    }
})

app.post("/loginUser", async (req, res) => {
    try {
        const data = await fs.readFile(usersFilePath, 'utf8');
        const usersData = JSON.parse(data);

        const { email, password } = req.body;

        const user = usersData.users.find(user => user.email === email && user.password === password);

        if (user) {
            // Ustawienie ciastka z emailem użytkownika
            res.cookie('email', email, {
                maxAge: 900000,
                httpOnly: true,
                sameSite: 'none',
                secure: true
            });
            res.json({ status: "logged", email: email });
        } else {
            res.json({ status: "notlogged" });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ status: "error", message: error.message });
    }
})

app.post("/logoutUser", (req, res) => {
    // usunięcie cookie
    res.clearCookie('email');
    // ustandaryzowana odpowiedz
    res.json({ status: "logout" });
})

app.get("/getCurrentUser", async (req, res) => {
    // pobranie emaila z ciastka
    const email = req.cookies.email;

    if (!email) {
        res.json({ status: "unauthorized" });
        return;
    }

    try {
        const data = await fs.readFile(usersFilePath, 'utf8');
        const usersData = JSON.parse(data);

        const found = usersData.users.some(user => user.email === email);

        if (found) {
            res.json({ status: "authorized", email: email });
        } else {
            res.clearCookie('email');
            res.json({ status: "unauthorized" });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ status: "error", message: error.message });
    }
})

app.listen(3000, () => console.log('Server running on port 3000'))