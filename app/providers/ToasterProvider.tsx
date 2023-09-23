"use client";

import { Toaster } from "react-hot-toast";

// we can't use <Toaster /> inside next.js pages directly coz with third party libraries like react-hot-toast they are client side components and are not configured to work inside next.js pages so we have to create a wrapper like this provider to include these components in pages
const ToasterProvider = () => {
  return <Toaster />;
};

export default ToasterProvider;
