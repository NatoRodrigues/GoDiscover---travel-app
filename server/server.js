const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const apiKey = 'AIzaSyC_8XFbSDxQPUjTO3_grlJ_QGg9MP3hoHA';
const app = express();
const axios = require('axios');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));



// Configuração do pacote express-session
app.use(session({
  secret: 'segredo', // Chave secreta para a sessão
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'Lax',
  },
}));

// Middleware para tratar o corpo das requisições como JSON
app.use(bodyParser.json());

// Use o middleware `cors`ss
app.use(cors());


// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test_login2'
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão ao banco de dados estabelecida com sucesso!');
  }
});

// Rota de cadastro
app.post('/cadastro', (req, res) => {
  const { email, senha, confirmarSenha } = req.body;

  if (senha !== confirmarSenha) {
    return res.status(400).json({ message: 'As senhas não são iguais' });
  }

  const checkEmailQuery = 'SELECT * FROM usuarios WHERE email = ?';
  connection.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      console.error('Erro ao verificar o email:', err);
      return res.status(500).json({ message: 'Erro ao cadastrar usuário - email' });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'O email já está cadastrado' });
    }

    const salt = bcrypt.genSaltSync(10);
    console.log('Salt:', salt);
    if (!senha || !salt) {
      console.error('Erro ao criar o salt');
      return res.status(500).json({ message: 'Erro ao cadastrar usuário - bloco do salt' });
    }

    const senhaCriptografada = bcrypt.hashSync(senha, salt);
    const insertUserQuery = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
    connection.query(insertUserQuery, [email, senhaCriptografada], (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar usuário: erro', err);
        return res.status(500).json({ message: 'Erro ao cadastrar usuário erro insecao' });
      }

      console.log('Usuário cadastrado com sucesso!');
      req.session.loggedIn = true;
      req.session.email = email; // Substituir result.insertId por email
      console.log('Sessão:', req.session.email);
      return res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
    });
  });
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Executar a consulta SQL para obter a senha criptografada do usuário
  const sql = 'SELECT senha FROM usuarios WHERE email = ?';
  connection.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Erro ao realizar login:', err);
      res.status(500).json({ message: 'Erro ao realizar login' });
    } else {
      if (result.length > 0) {
        const hashedPassword = result[0].senha;

        // Comparar a senha fornecida com a senha criptografada
        bcrypt.compare(senha, hashedPassword, (err, isMatch) => {
          if (err) {
            console.error('Erro ao realizar login:', err);
            res.status(500).json({ message: 'Erro ao realizar login' });
          } else if (isMatch) {
            console.log('Login realizado com sucesso!');
            // Se as credenciais forem válidas, inicie a sessão
            req.session.loggedIn = true;
            req.session.email = email; // Atribuir o valor do e-mail à sessão

            console.log('Email do usuário logado:', email);
            console.log('Sessão iniciada:', req.session.email);

            res.status(200).json({ message: 'Login realizado com sucesso!' });
          } else {
            console.log('Credenciais inválidas!');
            res.status(401).json({ message: 'Credenciais inválidas' });
          }
        });
      } else {
        console.log('Credenciais inválidas!');
        res.status(401).json({ message: 'Credenciais inválidas' });
      }
    }
  });
});

app.post('/adicionarLocal', (req, res) => {
  const { nome, categoria, pais, cidade, estado, endereco } = req.body;

  // Verifica se todos os campos necessários estão presentes
  if (!nome || !categoria || !pais || !cidade || !estado || !endereco || !req.file) {
    res.status(400).json({ error: 'Preencha todas as informações antes de adicionar o local' });
    return;
  }

  const query = 'INSERT INTO local (nome, categoria, pais, cidade, estado, endereco) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [nome, categoria, pais, cidade, estado, endereco], (error, results, fields) => {
    if (error) {
      console.log('Erro ao adicionar local:', error);
      res.status(500).json({ error: 'Erro ao adicionar local' });
      return;
    }

    console.log('Local adicionado com sucesso');
    res.status(200).json({ success: 'Local adicionado com sucesso' });
  });
});

app.post('/upload', upload.single('imagem'), (req, res) => {
  const { mimetype, buffer } = req.file;

  const sql = 'INSERT INTO local (imagem) VALUES (?)';
  const values = [Buffer.from(buffer, 'base64')];

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.log('Erro ao inserir imagem no banco de dados:', error);
      res.status(500).json({ error: 'Erro ao inserir imagem no banco de dados' });
    } else {
      console.log('Imagem inserida no banco de dados com sucesso');
      res.status(200).json({ success: 'Imagem inserida no banco de dados com sucesso' });
    }
  });
});

// Rota de logout
app.post('/logout', (req, res) => {
  const userEmail = req.session.email; // Obtém o email da sessão

  // Verifica se o email da sessão está definido
  if (!userEmail) {
    // Destrua a sessão
    req.session.destroy((err) => {
      if (err) {
        console.error('Erro ao encerrar a sessão:', err);
        return res.status(500).json({ message: 'Erro ao encerrar a sessão' });
      }

      console.log('Sessão encerrada para o usuário:', req.session.email);
      return res.status(200).json({ message: 'Logout realizado com sucesso!' });
    });
  } else {
    return res.status(500).json({ message: 'Erro ao encerrar a sessão' });
  }
});

app.delete('/deleteAccount', (req, res) => {
  const { email, senha } = req.session; // Obtém o email e senha do usuário logado a partir da sessão

  // Executa a consulta para excluir a conta do usuário
  connection.query('DELETE FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (error, results) => {
    if (error) {
      console.error('Erro ao excluir a conta:', error);
      res.status(500).json({ message: 'Erro ao excluir a conta' });
    } else {
      // Verifica se algum registro foi afetado pela exclusão
      if (results.affectedRows > 0) {
        res.status(200).json({ message: 'Conta excluída com sucesso!' });
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
      }
    }
  });
});
// Rota Discover
app.get('/Discover', (req, res) => {
  // Aqui você pode fornecer a lógica para renderizar a página de descoberta ou enviar um arquivo HTML correspondente
  res.render('Discover'); // Exemplo usando uma template engine como o EJS
});


// Iniciar o servidor
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
