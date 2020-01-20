import React, { useState } from "react";
import { Drawer } from "@material-ui/core";
import loginBgMb from "../../assets/index-bg-mb.jpg";
import brandMb from "../../assets/brand-mb.jpg";
import AppButton from "../../misc/AppButton";

import "./LoginMobile.scss";

const LoginMobile = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleAppButtonClick = e => {
    console.log(e);
    setOpenDrawer(true);
  };

  return (
    <div
      style={{ backgroundImage: `url(${loginBgMb})` }}
      className="login login--mobile"
    >
      <img
        className="login--mobile-brand"
        src={brandMb}
        alt="reactMusic - brand"
      />
      <div className="login--mobile__btn-wrapper">
        <AppButton btnLabel="Entrar" btnHandleClick={handleAppButtonClick} />
        <AppButton
          btnLabel="Criar nova conta"
          btnHandleClick={handleAppButtonClick}
        />
      </div>
      {/* Form Drawer */}
      <Drawer
        open={openDrawer}
        anchor="bottom"
        onClose={e => setOpenDrawer(false)}
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. In,
        distinctio? Nobis rem minus molestias dolorem libero modi velit qui
        corporis necessitatibus. Recusandae reprehenderit optio nesciunt aliquid
        fugit laborum nostrum nemo.
      </Drawer>
    </div>
  );
};

export default LoginMobile;
