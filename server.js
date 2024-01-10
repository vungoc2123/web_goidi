const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./src/serviceAccountKey.json');
const { getMessaging } = require('firebase-admin/messaging');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { getDatabase } = require('firebase-admin/database');
const { number } = require('prop-types');



// Khởi tạo Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://duan-90921-default-rtdb.firebaseio.com",
  storageBucket: 'duan-90921.appspot.com'
});

const db = getDatabase();
const bucket = admin.storage().bucket();
const app = express();
const port = 8000;

app.use(express.json());

app.use(bodyParser.json());

const usersFilePath = 'account.json';

const corsOptions = {
  origin: 'http://localhost:3000', // Chỉ cho phép truy cập từ domain này
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204, // Mã trạng thái HTTP được trả về cho các yêu cầu OPTIONS (preflight requests)
};

// Đọc dữ liệu từ file JSON
const readUsersFromFile = () => {
  const usersData = fs.readFileSync(usersFilePath);
  return JSON.parse(usersData);
};

// Ghi dữ liệu vào file JSON
const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};


app.use(cors(corsOptions));

app.get('/users', (req, res) => {
  var { name, limit } = req.query;
  const ref = db.ref('/users');
  if (name) {
    ref.orderByChild('name').startAt(name).endAt(name + '\uf8ff').limitToFirst(Number(limit)).once('value')
      .then(snapshot => {
        const users = Object.values(snapshot.val());
        res.status(200).send(users);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
      });
  } else {
    ref.orderByKey().limitToFirst(Number(limit)).once('value')
      .then(snapshot => {
        const users = Object.values(snapshot.val());
        res.status(200).send(users);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
      });
  }
})

app.post('/users/:userKey', async (req, res) => {
  const { userKey, name, phone, password, role, token, soLan } = req.body;
  const updatedData = {
    id: userKey,
    name: name,
    phone: phone,
    password: password,
    role: Number(role),
    token: token,
    soLan: Number(soLan),
  }
  console.log(req.body)

  const dishRef = db.ref(`/users/${userKey}`);
  dishRef.update(updatedData)
    .then(() => {
      res.status(200).send('User updated successfully');
    })
    .catch(error => {
      console.error('Error updating table:', error);
      res.status(500).send('Internal Server Error');
    });
})

app.get('/dishs', (req, res) => {
  var { name, limit } = req.query;
  const ref = db.ref('/Dish');
  if (name) {
    ref.orderByChild('ten').startAt(name).endAt(name + '\uf8ff').limitToFirst(Number(limit)).once('value')
      .then(snapshot => {
        const dishs = Object.values(snapshot.val());
        res.status(200).send(dishs);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách món ăn:', error);
      });
  } else {
    ref.orderByKey().limitToFirst(Number(limit)).once('value')
      .then(snapshot => {
        const dishs = Object.values(snapshot.val());
        res.status(200).send(dishs);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách món ăn:', error);
      });
  }
})

app.post('/dishs/:dishKey', async (req, res) => {
  const { dishKey, name, price, img, quantity } = req.body;
  const updatedData = {
    ten: name,
    gia: Number(price),
    img: img,
    id: dishKey,
    soLuong: quantity
  }
  console.log(req.body)

  const dishRef = db.ref(`/Dish/${dishKey}`);
  dishRef.update(updatedData)
    .then(() => {
      res.status(200).send('Dish updated successfully');
    })
    .catch(error => {
      console.error('Error updating dish:', error);
      res.status(500).send('Internal Server Error');
    });
})

app.get('/tables', (req, res) => {
  var { number, limit } = req.query;
  const ref = db.ref('/tables');
  if (number) {
    ref.orderByChild('number').equalTo(Number(number)).limitToFirst(Number(limit)).once('value')
      .then(snapshot => {

        const tables = Object.values(snapshot.val());
        res.status(200).send(tables);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách bàn:', error);
      });
  } else {
    ref.orderByKey().limitToFirst(Number(limit)).once('value')
      .then(snapshot => {
        const tables = Object.values(snapshot.val());
        res.status(200).send(tables);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách bàn:', error);
      });
  }
})

app.post('/tables/:tableKey', async (req, res) => {
  const { tableKey, number, seat } = req.body;
  const updatedData = {
    number: Number(number),
    seat: Number(seat),
    id: tableKey,
  }
  console.log(req.body)

  const dishRef = db.ref(`/tables/${tableKey}`);
  dishRef.update(updatedData)
    .then(() => {
      res.status(200).send('Table updated successfully');
    })
    .catch(error => {
      console.error('Error updating table:', error);
      res.status(500).send('Internal Server Error');
    });
})

app.get('/feedbacks', (req, res) => {
  var { name, limit } = req.query;
  const ref = db.ref('/feedbacks');
  ref.orderByKey().limitToFirst(Number(limit)).once('value')
    .then(snapshot => {
  
      const feedbacks = Object.values(snapshot.val());
      res.status(200).send(feedbacks);
    })
    .catch(error => {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
    });
})

app.get('/revenue', (req, res) => {
  var { dateStart, dateEnd } = req.query;
  const dateStart1 = dateStart.split("-");
  const dateStart2 = `${dateStart1[2]}/${dateStart1[1]}/${dateStart1[0]}`;
  const dateEnd1 = dateEnd.split("-");
  const dateEnd2 = `${dateEnd1[2]}/${dateEnd1[1]}/${dateEnd1[0]}`;
  const ref = db.ref('/orders');
  ref.once('value')
    .then(snapshot => {
      const bills = Object.values(snapshot.val() || {});
      const filteredBills = bills.filter(bill => {
        return bill.date >= dateStart2 && bill.date <= dateEnd2;
      });
      let listBill = filteredBills.filter(bill => bill.status === 2);
      let revenue = 0;
      for(let i =0; i < listBill.length; i ++){
          revenue += listBill.at(i).total;
      }
      res.status(200).json({revenue});
    })
    .catch(error => {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
    });
})

app.post('/send-notification', (req, res) => {
  const { title, body, tokens, users } = req.body;
  const ref = db.ref('/Notifications');
  const currentTimeInSeconds = new Date().getTime();
  const newData = {
    id: '',
    message: body,
    status: 'false',
    time: currentTimeInSeconds.toString(),
    type: 'admin'
  }

  for (let i = 0; i < users.length; i++) {
    ref.child(users.at(i)).push(newData);
    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: tokens.at(i)
    };
    getMessaging().send(message)
      .then((response) => {
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  }
  res.status(200).send("Successfully sent message");
});

// Function to generate JWT token
const generateToken = (user) => {
  const payload = {
    username: user.username,
    // Add any additional user data to the payload as needed
  };

  const options = {
    expiresIn: '8h', // Token expiration time
  };

  return jwt.sign(payload, 'tknksnkfks2673nds', options);
};

// Middleware to check JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, 'tknksnkfks2673nds', (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

// Đăng nhập
app.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  const users = readUsersFromFile();
  const user = users.find((u) => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = generateToken(user);
    res.json({ success: true, message: 'Đăng nhập thành công', token });
  } else {
    res.status(401).json({ success: false, message: 'Thông tin không chính xác' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
