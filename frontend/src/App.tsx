import React from "react";
import { toast, Toaster } from "sonner";

import Routes from "./routes/rouer";

const App = () => {
  return (
    <div>
      <Toaster richColors closeButton />
      <Routes />
    </div>
  );
};

export default App;
