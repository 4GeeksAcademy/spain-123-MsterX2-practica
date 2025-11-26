// definir reducer
const initialStore = () => {
    return any
}
const ACTIONS = {
    increment: (s) => ({ count: s.count + 1 }),
    decrement: (s) => ({ count: s.count - 1 }),
};

function reducer(state, action) {
    return (ACTIONS[action.type] || (() => state))(state, action);
}

// usar reducer
const [store, dispatch] = useReducer(reducer, initialStore());


// navigate
import { BrowserRouter, Route, Routes } from "react-router-dom";
export const Layout = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<Demo />} path="/demo" />
                    <Route element={<Single />} path="/single/:theid" />
                    <Route element={<h1>Not found!</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

<Link to="/login">Take me to login</Link>


import { useNavigate } from "react-router-dom";

// Dentro del componente declaras useNavigate de esta manera:
const navigate = useNavigate();
<button onClick={() => navigate.push("/login")}>Take me to login</button>


import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore());
    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    return useContext(StoreContext);
}

import apiRequest from "./apiRequest"


const host = "https://playground.4geeks.com/contact";
export const initialStorasde = (data) => {
    return {
        "slug": "chanchitoFeliz",
        "contacts": []
    }
};

const CRUD = {
    add_task: (s, a) => null,
    delete_task: (a) => null,
    edit_task: (a) => null,
    delete_task: (a) => null
};


export default function storeReducer(store, action = {}) {
    return (CRUD[action.type] || (() => { throw Error("Unknown action.") }))(store, action)
}
