import { useState } from "react";

const useDialogHooks = () => {
  const [openDialogs, setOpenDialogs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  
  const openDialog = (dialogName,isRefresh= false) => {
    setRefresh(isRefresh);
    setOpenDialogs((prevDialogs) => [...prevDialogs, dialogName]);
  };

  const closeDialog = (dialogName) => {
    setOpenDialogs((prevDialogs) =>
      prevDialogs.filter((name) => name !== dialogName)
    );
  };

  const isDialogOpen = (dialogName) => {
    return openDialogs.includes(dialogName);
  };

  return {
    openDialog,
    closeDialog,
    isDialogOpen,
    refresh,
  };
};

export default useDialogHooks;
