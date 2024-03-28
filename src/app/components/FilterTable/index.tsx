import classNames from "classnames/bind";
import { Autocomplete, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import styles from "./FilterTable.module.scss";
import { useGetAllProduct } from "queries/product";
import { ProductModel } from "types/Product";

const cx = classNames.bind(styles);

export const FilterTable = () => {
  const [status, setStatus] = useState<string | null>("");
  const [client, setClient] = useState<ProductModel | null>();
  const [dayFrom, setDayFrom] = useState<Dayjs | null>();
  const [dayTo, setDayTo] = useState<Dayjs | null>();
  const [invoice, setInvoice] = useState("");

  const { data: products = [] } = useGetAllProduct();

  return (
    <div className={cx("container")}>
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
          value={dayFrom}
          onChange={newValue => setDayFrom(newValue)}
        />
        <DatePicker
          className={cx("itemInput")}
          sx={{ width: 150 }}
          label="To"
          value={dayTo}
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
      <Button className={cx("btnApply")}>Apply</Button>
      <Button className={cx("btnClear")}>Clear</Button>
    </div>
  );
};
