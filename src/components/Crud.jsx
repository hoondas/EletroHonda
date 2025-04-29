import React, { useEffect } from "react";
import { useState } from "react";
import List from "./List.tsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export default function Crud() {
  const [id, setId] = useState(null);
  const [exibirFormulario, setExibirFormulario] = useState(false);
  const [items, setItems] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [serie, setSerie] = useState("");
  const [especificacoes, setEspecificacoes] = useState("");

  //GET para buscar os items no srvd
  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  //POST do item para o srvd
  const enviaItem = (novoItem) => {
    fetch("http://localhost:5000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoItem),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems([...items, data]);

        setNome("");
        setPreco("");
        setFabricante("");
        setSerie("");
        setEspecificacoes("");
      });
    console.log(novoItem);
  };

  //put do item para o srvd
  const alteraItem = (id, item) => {
    fetch(`http://localhost:5000/items/${parseInt(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(items.map((i) => (i.id === id ? data : i)));

        setNome("");
        setPreco("");
        setFabricante("");
        setSerie("");
        setEspecificacoes("");
        setId(null);
      });
    console.log(item);
  };

  const deletaItem = (item) => {
    const id = item.id;

    fetch(`http://localhost:5000/items/${parseInt(id)}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setItems(items.filter((i) => i.id !== id));
      });
  };

  const puxaDadosEdit = (item) => {
    setId(item.id);
    setNome(item.nome);
    setPreco(item.preco);
    setFabricante(item.fabricante);
    setSerie(item.serie);
    setEspecificacoes(item.especificacoes);
    setExibirFormulario(true);
    const dados = { nome, preco, fabricante, serie, especificacoes };
    console.log("Objeto antes da alteração:", { id, dados });
  };

  //Handle para lidar com a exibição e ocultação do forms
  const handleClick = () => {
    setExibirFormulario((prev) => !prev);
  };

  return (
    <Box sx={{ padding: 2, height: "calc(100vh - 64px)", overflow: "auto" }}>
      <Box sx={{ position: "relative" }}>
        <List
          items={items}
          onEditClick={puxaDadosEdit}
          onDeleteClick={deletaItem}
        />
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "right",
            mt: 0.5,
            color: "text.secondary",
            fontSize: "0.75rem",
            fontStyle: "italic",
          }}
        >
          Passe o mouse por cima do item para mais detalhes.
        </Typography>
      </Box>
      <Button
        onClick={handleClick}
        sx={{ marginTop: 3 }}
        variant="contained"
        color="success"
      >
        {exibirFormulario ? "Ocultar Formulário" : "Inserir novo dispositivo"}
      </Button>

      {exibirFormulario && (
        <Box>
          <Box sx={{ marginTop: 4 }}>
            <h2>Informações do eletrônico:</h2>
          </Box>
          <Box>
            <TextField
              id="outlined-multiline-flexible"
              label="Nome"
              multiline
              maxRows={4}
              size="small"
              sx={{ marginTop: 1, width: "150px" }}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Preço"
              multiline
              maxRows={4}
              size="small"
              value={preco}
              sx={{ marginTop: 1, width: "110px", marginLeft: "20px" }}
              onChange={(e) => setPreco(e.target.value)}
            />
          </Box>
          <Box>
            <FormControl sx={{ marginTop: 1, width: "150px" }}>
              <InputLabel id="demo-simple-select-label">Fabricante</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Fabricante"
                size="small"
                value={fabricante}
                onChange={(e) => setFabricante(e.target.value)}
              >
                <MenuItem value={"branco"}>Branco</MenuItem>
                <MenuItem value={"preto"}>Preto</MenuItem>
                <MenuItem value={"cinza"}>Cinza</MenuItem>
                <MenuItem value={"azul"}>Azul</MenuItem>
                <MenuItem value={"vermelho"}>Vermelho</MenuItem>
                <MenuItem value={"verde"}>Verde</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="outlined-multiline-flexible"
              label="No. Série"
              multiline
              maxRows={4}
              size="small"
              value={serie}
              sx={{ marginTop: 1, width: "150px", marginLeft: "20px" }}
              onChange={(e) => setSerie(e.target.value)}
            />
          </Box>
          <Box>
            <TextField
              id="outlined-multiline-flexible"
              label="Especificações"
              multiline
              maxRows={4}
              sx={{ marginTop: 1, width: "320px" }}
              value={especificacoes}
              onChange={(e) => setEspecificacoes(e.target.value)}
            />
          </Box>
          <Button
            sx={{ marginTop: 1 }}
            variant="contained"
            color="success"
            onClick={() => {
              const dados = { nome, preco, fabricante, serie, especificacoes };
              console.log("Objeto pós alteração:", { id, dados });

              if (id) {
                alteraItem(id, dados);
              } else {
                enviaItem(dados);
              }
            }}
          >
            {id ? "Atualizar" : "Cadastrar"}
          </Button>
        </Box>
      )}
    </Box>
  );
}
