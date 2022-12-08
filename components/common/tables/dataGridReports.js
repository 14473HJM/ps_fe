import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


export default function DataGridReport({columns, rows}) {

    const [pageSize, setPageSize] = React.useState(5);

    return (
        <Box sx={{ height: pageSize * 75, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}

                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination

                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                components={{
                    Toolbar: GridToolbar,
                }}
            />
        </Box>
    );
}