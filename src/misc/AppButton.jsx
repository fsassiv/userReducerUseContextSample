import React from "react";
import { Button } from "@material-ui/core";

function AppButton({ btnLabel, btnHandleClick }) {
  return (
    <Button
      variant="contained"
      color="primary"
      display="block"
      disableElevation
      onClick={btnHandleClick}
      style={{ height: "40px", fontWeight: "lighter", width: "100%" }}
    >
      {btnLabel}
    </Button>
  );
}

export default AppButton;
