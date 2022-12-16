import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { GridPrintExportOptions } from '@mui/x-data-grid';


export default function DataGridReport({columns, rows}) {

    const [pageSize, setPageSize] = React.useState(5);

    return (
        <Box sx={{ display: 'flex', height: '100%',flexGrow: 1 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight {...rows}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination

                //checkboxSelection
                //disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                components={{
                    Toolbar: GridToolbar,
                }}
                componentsProps={{
                    GridToolbar: {
                        printOptions:{
                            pageStyle: '.MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }',
                        }
                    },
                    toolbar: { printOptions: { disableToolbarButton: true } },
                }}
            />
        </Box>

    );
}