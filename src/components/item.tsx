import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";

export interface Item {
  id?: number;
  nome: string;
  preco: string;
  fabricante: string;
  serie: string;
  especificacoes: string;
}

export default function Item({ item }: { item: Item }) {

  const info = (
    <Box sx={{ p: 1 }}>
      <Typography variant="subtitle2">Preço: R$ {item.preco}</Typography>
      <Typography variant="subtitle2">Fabricante: {item.fabricante}</Typography>
      <Typography variant="subtitle2">Nº Série: {item.serie}</Typography>
      <Typography variant="subtitle2">Especificações: {item.especificacoes}</Typography>
    </Box>
  );

  return (
    <Tooltip title={info} arrow placement="top">
      <Typography 
        variant="body1" 
        noWrap 
        sx={{ 
          maxWidth: "80%", 
          overflow: "hidden", 
          textOverflow: "ellipsis" 
        }}
      >
        {item.nome}
      </Typography>
    </Tooltip>
  );
}