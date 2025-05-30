const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const fs = require('fs').promises;
const cookieParser = require('cookie-parser');

// zezwolenie na dostęp tylko z tego adresu (5173), będzie potrzebne przy post
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

const json = require('./data.json')
const promotions = json.promotions || []
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
    const { name, category, fuel_type, drivetrain, transmission, min_price, max_price, _sort, _order } = req.query;
    console.log('Search params:', req.query);

    let filteredProducts = [...products];

    if (name) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (category) {
        filteredProducts = filteredProducts.filter(product =>
            product.category === category
        );
    }

    if (fuel_type) {
        filteredProducts = filteredProducts.filter(product =>
            product.specification && product.specification.fuel_type === fuel_type
        );
    }

    if (drivetrain) {
        filteredProducts = filteredProducts.filter(product =>
            product.specification && product.specification.drivetrain === drivetrain
        );
    }

    if (transmission) {
        filteredProducts = filteredProducts.filter(product =>
            product.specification && product.specification.transmission === transmission
        );
    }

    if (min_price) {
        filteredProducts = filteredProducts.filter(product =>
            product.price >= parseInt(min_price)
        );
    }

    if (max_price) {
        filteredProducts = filteredProducts.filter(product =>
            product.price <= parseInt(max_price)
        );
    }

    if (_sort && _order) {
        filteredProducts.sort((a, b) => {
            let aVal = a[_sort];
            let bVal = b[_sort];

            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (_order === 'asc') {
                if (aVal < bVal) return -1;
                if (aVal > bVal) return 1;
                return 0;
            } else {
                if (aVal < bVal) return 1;
                if (aVal > bVal) return -1;
                return 0;

            }
        });
    }

    res.json({ products: filteredProducts });
})

app.get('/categories', (req, res) => {
    res.json({ categories })
})

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
            res.cookie('email', email, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: false,
                sameSite: 'lax',
                secure: false,
                path: '/'
            });
            res.json({ status: "authorized", email: email });
        } else {
            res.json({ status: "unauthorized" });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ status: "error", message: error.message });
    }
})

app.post("/logoutUser", (req, res) => {
    res.clearCookie('email', {
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
        secure: false
    });
    res.json({ status: "logout" });
})

app.get("/getCurrentUser", async (req, res) => {
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
            res.json({ status: "unauthorized" });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ status: "error", message: error.message });
    }
})


userCookieValidation = (req, res, next) => {
    const email = req.cookies.email;
    if (!email) {

        res.json({ status: "unauthorized" });
        return
    }
    fs.readFile(usersFilePath, 'utf8')
        .then(data => {
            const usersData = JSON.parse(data);
            const found = usersData.users.some(user => user.email === email);
            if (found) {
                next();
            } else {
                res.json({ status: "unauthorized" });
            }
        })
        .catch(error => {
            console.error('Server error:', error);
            res.status(500).json({ status: "error", message: error.message });
        });
}


app.listen(3000, () => console.log('Server running on port 3000'))