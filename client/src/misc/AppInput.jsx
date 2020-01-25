import React from "react";
import { FormControl, Input } from "@material-ui/core";
import "./AppInput.scss";

const AppInput = ({
  inputPlaceholder,
  handleChange,
  inputTarget,
  inputValue
}) => {
  return (
    <FormControl>
      <Input
        onChange={({ target }) =>
          handleChange({ target: inputTarget, value: target.value })
        }
        placeholder={inputPlaceholder}
        value={inputValue}
        type={inputTarget === "confirmPassword" ? "password" : inputTarget}
        className="appInput"
      />
    </FormControl>
  );
};

export default AppInput;
