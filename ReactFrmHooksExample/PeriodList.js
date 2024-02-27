import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";
import {
  Paper,
  Typography,
  Stack,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  TablePagination,
  Box,
  IconButton,
  TableSortLabel,
} from "@mui/material";
import AddCircleRounded from "@mui/icons-material/AddCircleRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import DeleteRounded from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { visuallyHidden } from "@mui/utils";
import PaginationActions from "../../components/table/PaginationActions";
import styles from "../../css/common.module.css";
import API from "../../config/axios";
import { toast } from "react-hot-toast";
import debounce from "lodash.debounce";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";

export default function PeriodList() {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(10);
  const [search, setSearch] = useState("");
  const abortController = useRef(new AbortController());
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletePeriodId, setDeletePeriodId] = useState(null);
  const [isDeletingPeriod, setIsDeletingPeriod] = useState(false);

  const headCells = [
    {
      id: "Year",
      numeric: false,
      disablePadding: true,
      label: t("period.list_tbl.headers.year"),
      sortable: true,
    },
    {
      id: "period",
      numeric: false,
      disablePadding: true,
      label: t("period.list_tbl.headers.period"),
      sortable: true,
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: t("period.list_tbl.headers.status"),
      sortable: true,
    },
    {
      id: "action",
      numeric: false,
      disablePadding: true,
      label: t("period.list_tbl.headers.actions"),
      sortable: false,
    },
  ];

  const showNoData = !isLoading && rows.length === 0 ? true : false;
  const skipRows = page * rowsPerPage;
  const totalColumns = headCells.length + 1;

  const createSortHandler = (property) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getPeriodList = (searchVal = "") => {
    // Cancel the previous request
    abortController.current.abort();
    abortController.current = new AbortController();

    setIsLoading(true);

    API.get("users/periods", {
      params: {
        pagination: true,
        page: page + 1,
        rowsPerPage: rowsPerPage,
        sortBy: orderBy,
        descending: order === "asc" ? false : true,
        filter: searchVal,
      },
      signal: abortController.current.signal,
    })
      .then((res) => {
        const resData = res.data;

        if (resData.status) {
          setRows(resData.data.results);
          setTotalRows(resData.data.totalResults || 0);
          setPage(
            resData.data.page > resData.data.totalPages
              ? 0
              : resData.data.page - 1,
          );
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        if (!error.code || error.code !== "ERR_CANCELED") {
          toast.error("Something went wrong");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    getPeriodList(e.target.value);
  };

  const debounceSearchInput = useMemo(() => {
    return debounce(handleSearchChange, 300);
    // eslint-disable-next-line
  }, []);

  const showDeleteConfirmationDialog = (PeriodId) => {
    setDeletePeriodId(PeriodId);
    setShowDeleteDialog(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setShowDeleteDialog(false);
    setDeletePeriodId(null);
  };

  const deletePeriod = () => {
    setIsDeletingPeriod(true);

    const requestStartTime = Date.now();

    API.delete(`users/periods/${deletePeriodId}`)
      .then((res) => {
        const resData = res.data;

        if (resData.status) {
          toast.success(t("period.period_deleted_successfully"));
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        closeDeleteConfirmationDialog();
        getPeriodList();

        const requestEndTime = Date.now();
        const timeOutMileSeconds = requestEndTime - requestStartTime;

        if (timeOutMileSeconds > 300) {
          setIsDeletingPeriod(false);
        } else {
          setTimeout(() => {
            setIsDeletingPeriod(false);
          }, 300);
        }
      });
  };

  useEffect(() => {
    getPeriodList(search);

    return () => {
      abortController.current.abort();
    };
    // eslint-disable-next-line
  }, [page, order, orderBy, rowsPerPage]);

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ mb: 2 }}
        justifyContent="flex-start"
        alignItems={{ xs: "start", sm: "center" }}
        spacing={1}
      >
        <Typography component="h1" sx={{ fontSize: "20px", flexGrow: 1 }}>
          {t("period.title")}
        </Typography>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <TextField
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
            placeholder={t("search")}
            onChange={debounceSearchInput}
          />
          <Link to="/period/add">
            <Button
              variant="contained"
              startIcon={<AddCircleRounded />}
              disableElevation
              style={{
                height: "100%",
                backgroundColor: "#00c078", // Set the background color to green
                color: "#ffffff", // Set the text color to ensure readability
              }}
            >
              {t("period.add_period_btn_lbl")}
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Paper
        sx={{ backgroundColor: "primaryBg.light" }}
        className={styles.custom_container}
        elevation={2}
      >
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ borderRadius: "inherit" }}
        >
          <Table
            aria-label="custom pagination table"
            className={"custom-table br-0"}
            sx={{ backgroundColor: "primaryBg.light", minWidth: 600 }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: "80px",
                    minWidth: "80px",
                    textAlign: "center",
                  }}
                >
                  {t("period.list_tbl.headers.no")}
                </TableCell>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? "right" : "left"}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    {headCell.sortable ? (
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={createSortHandler(headCell.id)}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    ) : (
                      headCell.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell style={{ textAlign: "center" }}>
                    {skipRows + (index + 1)}
                  </TableCell>
                  <TableCell scope="row">{row.year}</TableCell>
                  <TableCell scope="row">{row.period}</TableCell>
                  <TableCell scope="row">
                    {row.status ? "Vergrendeld" : "Open"}
                  </TableCell>
                  <TableCell style={{ width: "100px" }} align="left">
                    <Stack direction="row" spacing={1}>
                      <Link
                        className="link"
                        color="inherit"
                        to={`/period/edit/${row.id}`}
                      >
                        <Tooltip title="Wijzigen" arrow>
                          <IconButton size="small" aria-label="edit">
                            <EditOutlinedIcon
                              className="edit_icon"
                              fontSize="medium"
                            />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <Tooltip title="Verwijderen" arrow>
                        <IconButton
                          variant="outlined"
                          color="error"
                          size="small"
                          sx={{
                            border: "2px solid currentColor",
                            width: "30px",
                            height: "30px",
                          }}
                          onClick={() => showDeleteConfirmationDialog(row.id)}
                        >
                          <DeleteRounded fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}

              {showNoData && (
                <TableRow>
                  <TableCell colSpan={totalColumns}>
                    <Typography
                      sx={{ width: "100%", textAlign: "center", color: "grey" }}
                      variant="body2"
                    >
                      Geen gegevens aanwezig
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className={styles.custom_tbl_pagination}>
          <TablePagination
            as="div"
            rowsPerPageOptions={[
              1,
              5,
              10,
              25,
              50,
              { label: "All", value: 99999999 },
            ]}
            labelRowsPerPage={t("rows_per_page")}
            colSpan={totalColumns}
            count={totalRows}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            ActionsComponent={PaginationActions}
          />
        </Box>
      </Paper>
      <DeleteConfirmationDialog
        open={showDeleteDialog}
        title={t("period.delete_period")}
        description={t("period.delete_selected_period")}
        onClose={closeDeleteConfirmationDialog}
        onDelete={deletePeriod}
        isDeletingData={isDeletingPeriod}
      />
    </>
  );
}
