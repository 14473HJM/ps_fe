import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {getSession, useSession} from "next-auth/react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import {visuallyHidden} from "@mui/utils";
import TableSortLabel from "@mui/material/TableSortLabel";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ConfigTable({columns, rows, setRows, getOne, getAll, putApi, postApi, deleteApi, title, description }) {

    const [rowOnDelete, setRowOnDelete] = React.useState(0);
    const [rowDeleteIndex, setRowDeleteIndex] = React.useState(0);
    const [openDialog, setOpenDialog] = React.useState(false);
    const {data: session, status} = useSession();
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalRow, setModalRow] = React.useState(null);
    const [modalSaveDisabled, setModalSaveDisabled] = React.useState(true);
    const [openSnackbarOK, setOpenSnackbarOK] = React.useState(false);
    const [openSnackbarError, setOpenSnackbarError] = React.useState(false);
    const [seeDeleted, setSeeDeleted] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');

    const handleChangeSwitchDeleted = (event) => {
        setSeeDeleted(event.target.checked);
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    //MODAL HANDLERS
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
        setModalSaveDisabled(true);
    };
    const handleSubmitModal = async (event) => {
        event.preventDefault();
        let response;
        if(modalRow.id == null) {
            response = await postApi(session, modalRow);
        } else {
            response = await putApi(session, modalRow);
        }
        if (response && response.ok) {
            const row = await response.json();
            rows.push(row);
            setRows(rows);
            console.log(rows);
            handleOpenSnackbar("S")
        } else {
            handleOpenSnackbar("E")
        }
        handleCloseModal();
    };
    const handleChangeRow = (event) => {
        event.preventDefault();
        const value = event.target.value;
        const field = event.target.name;
        //modalRow[field] = value;
        setModalRow({...modalRow, [field]:value});
        console.log(modalRow);
    }
    const handleNew = (event) => {
        event.preventDefault();
        setModalRow(getEmptyRow());
        handleOpenModal();
    }
    const getEmptyRow = () => {
        let row = {};
        columns.map((column) =>
            row[column.id] = null
        )
        return row;
    }
    const handleActionEnabled = () => {
        let disabled = false;
        columns.map((column) => {
             if(column.required && modalRow[column.name] == null) {
                 disabled = true;
             }
        });
        setModalSaveDisabled(disabled);
    }
    //UPDATE-DELETE_CREATE HANDLERS
    const handleEdit = (event, row) => {
        event.preventDefault();
        setModalRow(row);
        handleOpenModal();
    }
    const handleDelete = (event, row, index) => {
        event.preventDefault();
        console.log(row);
        setRowOnDelete(row);
        setRowDeleteIndex(index);
        handleClickOpenDialog();
    }
    const handleConfirmationDelete = async (event) => {
        event.preventDefault();
        const response = await deleteApi(session, rowOnDelete);
        if (response && response.ok) {
            rows.splice(rowDeleteIndex, 1);
            rowOnDelete.recordStatus = 'DELETED';
            rows.push(rowOnDelete);
            setRows(rows);
            console.log(rows);
            handleOpenSnackbar("S")
        } else {
            handleOpenSnackbar("E")
        }
        handleCloseDialog(event);
    }
    //DIALOG HANDLERS
    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = (event) => {
        event.preventDefault();
        setOpenDialog(false);
        setRowDeleteIndex(0);
    };
    //SNACKBARS HANDLERS
    const handleOpenSnackbar = (t) => {
        if(t === "E") {
            setOpenSnackbarError(true);
        } else if (t === "S") {
            setOpenSnackbarOK(true);
        }
    };
    const handleCloseSnackbar = (event, reason, t) => {
        if(t === "E") {
            if (reason === 'clickaway') {
                return;
            }
            setOpenSnackbarError(false);
        } else if (t === "S") {
            if (reason === 'clickaway') {
                return;
            }
            setOpenSnackbarOK(false);
        }
    };
    //PAGING & SORTING
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    };
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    };
    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <React.Fragment >
            <Box sx={{display: 'flex', mr: 10}}>
                <Typography component="h1" variant="h5" color="primary" gutterBottom mr={4}>
                    {title}
                </Typography>
                <Fab color="success" aria-label="add" size="medium" sx={{mt: -1.5}}
                     onClick={handleNew}>
                    <AddIcon />
                </Fab>
            </Box>
            <br/>
            <Typography component="body1" variant="body1" color="info" gutterBottom>
                {description}
            </Typography>

            <Box sx={{display: 'flex', mr: 10, mt:3}}>
            <FormControlLabel control={
                <Switch color="error" checked={seeDeleted} onChange={handleChangeSwitchDeleted}/>
            } label="Ver Borrados" />
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
            </Box>
            <TableContainer >
            <Table size={dense ? 'small' : 'medium'} sx={{mt:5}} >
                <TableHead>
                    <TableRow>
                    {columns.map((column) =>
                        column.visible ?
                        <TableCell
                            key={column.id}
                            id={column.id}
                            variant={'head'}
                            sortDirection={orderBy === column.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === column.id}
                                direction={orderBy === column.id ? order : 'asc'}
                                onClick={createSortHandler(column.id)}
                            >
                                {column.label}
                                {orderBy === column.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                            {/*{column.label}*/}

                        </TableCell>
                            : null
                    )}
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => //{
                    //{rows ? rows.map((row, index) =>
                        row.recordStatus != 'DELETED' && !seeDeleted ?
                        <TableRow key={row.id}>
                            {columns.map((c, index) => (
                                c.visible ?
                                    // eslint-disable-next-line react/jsx-key
                                <TableCell>{row[c.id]}</TableCell>
                                    : null
                            ))}
                            <TableCell width={150}>
                                <Box sx={{ '& > :not(style)': { m: 1 }, display: 'inline' }}>
                                    <React.Fragment>
                                        <Fab color="primary" aria-label="edit" size="small">
                                            <EditIcon fontSize={"small"} onClick={(e) => handleEdit(e, rows[index])}/>
                                        </Fab>
                                        <Fab color="error" aria-label="edit" size="small">
                                            <DeleteIcon fontSize={"small"} onClick={(e) => handleDelete(e, rows[index], index)}/>
                                        </Fab>
                                    </React.Fragment>
                                </Box>
                            </TableCell>
                        </TableRow>
                            : seeDeleted ?
                            <TableRow key={row.id}>
                                {columns.map((c, index) => (
                                    c.visible ?
                                        row.recordStatus != 'DELETED' ?
                                        // eslint-disable-next-line react/jsx-key
                                        <TableCell>{row[c.id]}</TableCell>
                                            : <TableCell sx={{ bgcolor: 'pink' }}>{row[c.id]}</TableCell>
                                        : null
                                ))}
                                {row.recordStatus != 'DELETED' ?
                                <TableCell width={150}>
                                    <Box sx={{ '& > :not(style)': { m: 1 }, display: 'inline' }}>
                                        <React.Fragment>
                                            <Fab color="primary" aria-label="edit" size="small">
                                                <EditIcon fontSize={"small"} onClick={(e) => handleEdit(e, rows[index])}/>
                                            </Fab>
                                            <Fab color="error" aria-label="edit" size="small">
                                                <DeleteIcon fontSize={"small"} onClick={(e) => handleDelete(e, rows[index], index)}/>
                                            </Fab>
                                        </React.Fragment>
                                    </Box>
                                </TableCell>
                                    :
                                <TableCell width={150} sx={{ bgcolor: 'pink' }}>
                                    <Box sx={{ '& > :not(style)': { m: 1 }, display: 'inline' }}>
                                        <React.Fragment>
                                            <Fab color="primary" aria-label="edit" size="small">
                                                <EditIcon fontSize={"small"} onClick={(e) => handleEdit(e, rows[index])}/>
                                            </Fab>
                                        </React.Fragment>
                                    </Box>
                                </TableCell>
                                }
                            </TableRow>
                            : null
                    ) //: null
                    }
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"¿Seguro que desea borrar esta configuración?"}
                </DialogTitle>
                <DialogTitle id="alert-dialog-title">
                    Object ID  {rowOnDelete.name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Esta acción hará que ya no este disponible esta opción para nuevos proyectos,
                        pero seguirá apareciendo en los proyectos que ya la tengan en uso.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="error">Cancelar</Button>
                    <Button onClick={handleConfirmationDelete} autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                onLoad={handleActionEnabled}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        {title}
                    </Typography>
                    {columns.map((column) => (
                    <Grid item xs={12} sm={12} m={2} id={column.id}>
                        <TextField
                            required={column.required}
                            disabled={column.disabled}
                            id={column.id}
                            name={column.name}
                            label={column.label}
                            onChange={handleChangeRow}
                            onBlur={handleActionEnabled}
                            fullWidth
                            autoComplete="value"
                            variant="standard"
                            inputProps={{maxlength: column.maxlength}}
                            value={modalRow ? modalRow[column.name] : null}
                        />
                    </Grid>
                    ))}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                        <Button
                            variant="contained"
                            sx={{ mt: 3, ml: 1 }}
                            disabled={false}
                            color="error"
                            onClick={handleCloseModal}
                        >Cancelar</Button>
                        <Button
                            variant="contained"
                            sx={{ mt: 3, ml: 1 }}
                            disabled={modalSaveDisabled}
                            type={"submit"}
                            onClick={handleSubmitModal}
                        >Guardar</Button>
                    </Box>
                </Box>
            </Modal>
            <Snackbar
                open={openSnackbarOK}
                autoHideDuration={6000}
                onClose={(e, r) => handleCloseSnackbar(e, r, 'S')}
                anchorOrigin={{vertical: 'bottom', horizontal: 'bottom'}}
            >
                <Alert onClose={(e, r) => handleCloseSnackbar(e, r, 'S')} severity="success" sx={{ width: '100%' }}>
                    Operación realizada con exito!
                </Alert>
            </Snackbar>
            <Snackbar
                open={openSnackbarError}
                autoHideDuration={6000}
                onClose={(e, r) => handleCloseSnackbar(e, r, 'E')}
                anchorOrigin={{vertical: 'bottom', horizontal: 'bottom'}}
            >
                <Alert onClose={(e, r) => handleCloseSnackbar(e, r, 'E')} severity="error" sx={{ width: '100%' }}>
                    Hubo un error al procesar la operación
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}


