/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from "classnames/bind";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Autocomplete,
  TextField,
  Dialog,
  DialogTitle,
  LinearProgress,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import moment from "moment";
import { useCallback, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import styles from "./ProductWrapper.module.scss";
import { useGetAllProduct, useGetProductById } from "queries/product";
import { useDeleteProduct } from "mutations/product";
import { ProductModel } from "types/Product";

const cx = classNames.bind(styles);

export const ProductWrapper = () => {
  const [status, setStatus] = useState<string | null>("");
  const [client, setClient] = useState<ProductModel | null>(null);
  const [dayFrom, setDayFrom] = useState<Dayjs | null>();
  const [dayTo, setDayTo] = useState<Dayjs | null>();
  const [invoice, setInvoice] = useState("");
  const [productid, setProductid] = useState(0);
  const [dialogToggle, setDialogToggle] = useState(false);
  const [dialogToggleDelete, setDialogToggleDelete] = useState(false);
  const [productidDelete, setProductidDelete] = useState(0);

  const navigate = useNavigate();

  const {
    data: products = [],
    isLoading: isLoadingAllProduct,
    refetch,
  } = useGetAllProduct();
  const { data: productById } = useGetProductById(productid);
  const { mutateAsync } = useDeleteProduct();

  const handleOpenDialog = (id: number) => {
    setProductid(id);
    setDialogToggle(true);
  };

  const handleOpenDialogDelete = (id: number) => {
    setProductidDelete(id);
    setDialogToggleDelete(true);
  };

  const handleClear = () => {
    setStatus(null);
    setClient(null);
    setDayFrom(null);
    setDayTo(null);
    setInvoice("");
  };

  const handleDeleteProduct = useCallback(async () => {
    try {
      await mutateAsync(productidDelete);

      enqueueSnackbar("Delete product successful!", {
        variant: "success",
      });

      refetch();

      setDialogToggleDelete(false);
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar("Delete product failure!", {
        variant: "error",
      });
    }
  }, [productidDelete]);

  const handleNavigateHome = useCallback(() => {
    navigate(`/`);
  }, [navigate]);

  return (
    <div className={cx("container")}>
      <TableContainer component={Paper} className={cx("table")}>
        <div className={cx("heading")}>
          <Typography className={cx("title")}>
            Payroll Transactions List
          </Typography>
        </div>
        <div className={cx("filterHead")}>
          <Autocomplete
            className={cx("itemInput")}
            aria-placeholder="Status"
            onChange={(event, item) => {
              setStatus(item);
            }}
            options={["PENDING", "FULFILLED", "PROCESSING", "RECEIVED"]}
            value={status || null}
            sx={{ width: 130 }}
            disablePortal
            renderInput={params => <TextField {...params} label="Status" />}
          />
          <Autocomplete
            className={cx("itemInput")}
            aria-placeholder="Client"
            onChange={(event, item) => {
              setClient(item);
            }}
            options={products}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.client}
                </li>
              );
            }}
            getOptionLabel={option => option?.client}
            value={client || null}
            sx={{ width: 130 }}
            disablePortal
            renderInput={params => <TextField {...params} label="Client" />}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className={cx("itemInput")}
              label="From"
              sx={{ width: 150 }}
              value={dayFrom || null}
              onChange={newValue => setDayFrom(newValue)}
            />
            <DatePicker
              className={cx("itemInput")}
              sx={{ width: 150 }}
              label="To"
              value={dayTo || null}
              onChange={newValue => setDayTo(newValue)}
            />
          </LocalizationProvider>

          <TextField
            label="Invoice #"
            variant="outlined"
            sx={{ width: 130 }}
            className={cx("itemInput")}
            value={invoice}
            onChange={e => setInvoice(e.target.value)}
          />
          <Button className={cx("btnApply")} onClick={handleNavigateHome}>
            Home
          </Button>
          <Button className={cx("btnClear")} onClick={handleClear}>
            Clear
          </Button>
        </div>
        {isLoadingAllProduct && <LinearProgress className={cx("loading")} />}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Client</TableCell>
              <TableCell align="right">Currency</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Invoice #</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .filter(item => {
                return invoice === " " ? item : item.invoice.includes(invoice);
              })
              .filter(item => {
                return status === null
                  ? item
                  : item.status.includes(status as string);
              })
              .filter(item => {
                return client === null
                  ? item
                  : item.client.includes(client?.client as string);
              })
              .filter(item => {
                return dayFrom == null && dayTo == null
                  ? item
                  : dayjs(item.createAt) >= (dayFrom as Dayjs) &&
                      dayjs(item.createAt) <= (dayTo as Dayjs);
              })
              .map(row => (
                <TableRow
                  key={row.id}
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className={cx(`${row.status.toLowerCase()}`)}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell align="right">
                    {moment(row?.createAt).format("DD MMM YYYY ")}
                  </TableCell>
                  <TableCell align="right">{row.client}</TableCell>
                  <TableCell align="right">{row.currency}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                  <TableCell align="right">{row.invoice}</TableCell>

                  <TableCell align="right">
                    <Button onClick={() => handleOpenDialog(row?.id)}>
                      Show
                    </Button>
                  </TableCell>

                  <TableCell align="right">
                    <DeleteForeverIcon
                      className={cx("deleteBtn")}
                      onClick={() => handleOpenDialogDelete(row?.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogToggle} className={cx("dialogDetail")}>
        <div className={cx("contentDialog")}>
          <div className={cx("header")}>
            <DialogTitle>Product Detail</DialogTitle>
            <Clear
              className={cx("clearIcon")}
              onClick={() => setDialogToggle(false)}
            />
          </div>
          <div className={cx("productDetail")}>
            <div className={cx("item")}>
              <Typography className={cx("key")}>Status : </Typography>
              <Typography
                className={cx(`${productById?.status.toLowerCase()}`, "value")}
              >
                {productById?.status}
              </Typography>
            </div>
            <div className={cx("item")}>
              <Typography className={cx("key")}>Currency : </Typography>
              <Typography className={cx("value")}>
                {productById?.currency}
              </Typography>
            </div>
            <div className={cx("item")}>
              <Typography className={cx("key")}>FundingMethod : </Typography>
              <Typography className={cx("value")}>
                {productById?.fundingMethod}
              </Typography>
            </div>
            <div className={cx("item")}>
              <Typography className={cx("key")}>Total : </Typography>
              <Typography className={cx("value")}>
                {productById?.total}
              </Typography>
            </div>

            <div className={cx("item")}>
              <Typography className={cx("key")}>Order : </Typography>
              <Typography className={cx("value")}>
                {productById?.order}
              </Typography>
            </div>
            <div className={cx("item")}>
              <Typography className={cx("key")}>Client : </Typography>
              <Typography className={cx("value")}>
                {productById?.client}
              </Typography>
            </div>
            <div className={cx("item")}>
              <Typography className={cx("key")}>Invoice : </Typography>
              <Typography className={cx("value")}>
                {productById?.invoice}
              </Typography>
            </div>
            <div className={cx("item")}>
              <Typography className={cx("key")}>Created At : </Typography>
              <Typography className={cx("value")}>
                {moment(productById?.createAt).format("DD MMM YYYY ")}
              </Typography>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog open={dialogToggleDelete}>
        <div className={cx("contenDialogDelete")}>
          <Typography className={cx("titleDialog")}>
            Bạn có chắc chắn muốn xóa ?
          </Typography>
          <div className={cx("btnWrapper")}>
            <Button
              className={cx("btnDialog")}
              sx={{ border: "1px solid rgb(93, 93, 234)" }}
              onClick={handleDeleteProduct}
            >
              Có
            </Button>
            <Button
              className={cx("btnDialog")}
              sx={{ border: "1px solid red", color: "red" }}
              onClick={() => setDialogToggleDelete(false)}
            >
              Không
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
