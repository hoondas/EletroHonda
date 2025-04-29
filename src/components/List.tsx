import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ItemComponent, { Item as ItemType } from './item.tsx';

interface ListProps {
  items: ItemType[];
  onEditClick: (item: ItemType) => void;
  onDeleteClick: (item: ItemType) => void;
}

interface ItemData {
  items: ItemType[];
  onEditClick: (item: ItemType) => void;
  onDeleteClick: (item: ItemType) => void;
}

function renderRow({ index, style, data }: ListChildComponentProps<ItemData>) {
  const item = data.items[index];
  const { onEditClick, onDeleteClick } = data;

  return (
    <ListItem style={style} key={item.id} component="div" disablePadding>
      <ListItemButton sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ItemComponent item={item} />
        <Box>
          <IconButton edge="start" color="inherit" aria-label="edit" sx={{ mr: 1 }} onClick={() => onEditClick(item)}>
            <EditIcon />
          </IconButton>
          <IconButton edge="start" color="inherit" aria-label="delete" sx={{ mr: 1 }} onClick={() => onDeleteClick(item)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </ListItemButton>
    </ListItem>
  );
}

export default function List({ items, onEditClick, onDeleteClick }: ListProps) {
  const [listWidth, setListWidth] = React.useState(300);
  const boxRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (boxRef.current) {
      setListWidth(boxRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (boxRef.current) {
        setListWidth(boxRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box
      ref={boxRef}
      sx={{
        width: '100%',
        height: 200, 
        bgcolor: 'background.paper',
        overflow: 'auto', 
        border: '1px solid #e0e0e0',  
        borderRadius: 1,  
      }}
    >
      {items.length > 0 ? (
        <FixedSizeList
          height={200} 
          width={listWidth}
          itemSize={46}
          itemCount={items.length}
          itemData={{ items, onEditClick, onDeleteClick }}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      ) : (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          Nenhum item cadastrado
        </Box>
      )}
    </Box>
  );
}