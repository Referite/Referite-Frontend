//TODO Implement thing like this https://github.com/sixfwa/react-fastapi/blob/main/frontend/src/context/UserContext.jsx
// See example request template on Login.ts file
// Note: using sessionStorage instead of localStorage
// Route will be 'http://127.0.0.1:8000/auth/users'

import { createContext, useEffect, useState } from "react";
export const UserContext = createContext<string | null>(null); //abosolutely no idea what I am doing here Please fix this.