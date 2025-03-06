import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

const Filters = ({ orderBy, orderDirection, onOrderByChange, onOrderDirectionChange }) => {
  return (
    <Box 
      id="filters-container" 
      sx={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: 2, 
        justifyContent: "space-between", 
        width: "100%",
        maxWidth: 500, // Puedes ajustar este valor según tu diseño
        margin: "auto"
      }}
    >
      <FormControl variant="outlined" size="small" sx={{ width: "100%", maxWidth: 200 }}>
        <InputLabel>Order by</InputLabel>
        <Select
          value={orderBy}
          onChange={onOrderByChange}
          label="Ordenar por"
        >
          <MenuItem value="created_at">Creation date</MenuItem>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="is_completed">State</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" size="small" sx={{ width: "100%", maxWidth: 200 }}>
        <InputLabel>Direction</InputLabel>
        <Select
          value={orderDirection}
          onChange={onOrderDirectionChange}
          label="Dirección"
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;
