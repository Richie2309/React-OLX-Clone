import { createContext, useState } from "react";

export const PostContext = createContext(null)

export default function PContext({ children }) {
    const [viewProducts, setViewProducts] = useState(null);
    return (
        <PostContext.Provider value={{ viewProducts, setViewProducts }}>
            {children}
        </PostContext.Provider>
    )
}