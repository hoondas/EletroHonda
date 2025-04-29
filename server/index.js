const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let items = [
  {
    id: 1,
    nome: "Produto Inicial",
    preco: "100,00",
    fabricante: "branco",
    serie: "123456",
    especificacoes: "Produto padrão do sistema",
  },
];

// Rota GET retorno dos itens
app.get("/items", (req, res) => {
  res.json(items);
});

// rota post
app.post("/items", (req, res) => {
  const novoItem = {
    id: items.length + 1,
    nome: req.body.nome,
    preco: req.body.preco,
    fabricante: req.body.fabricante,
    serie: req.body.serie,
    especificacoes: req.body.especificacoes,
  };
  items.push(novoItem);
  res.status(201).json(novoItem);
});

app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex((item) => item.id === id);

  if (itemIndex !== -1) {
    const itemRemovido = items.splice(itemIndex, 1)[0];
    res.json(itemRemovido);
  } else {
    res.status(404);
  }
});

app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex !== -1) {
    const itemAtualizado = {
      id: id,
      nome: req.body.nome,
      preco: req.body.preco,
      fabricante: req.body.fabricante,
      serie: req.body.serie,
      especificacoes: req.body.especificacoes,
    };
    
    items[itemIndex] = itemAtualizado;
    res.json(itemAtualizado);
  } else {
    res.status(404).json({ mensagem: "Item não encontrado" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodadno em http://localhost:${PORT}`);
});
