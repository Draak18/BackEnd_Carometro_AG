const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuração do storage do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta onde os arquivos serão armazenados
  },
  filename: (req, file, cb) => {
    
     uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configuração do middleware do multer
const upload = multer({ storage: storage });

// Rota para o upload de um único arquivo
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }
  res.send(`Arquivo ${req.file.filename} enviado com sucesso!`);
});

// Rota para o upload de múltiplos arquivos
app.post('/upload-multiple', upload.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }
  res.send(`Arquivos enviados com sucesso!`);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});