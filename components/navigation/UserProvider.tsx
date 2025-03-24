import { getUser } from "@/api/userSession";
import User from "@/interfaces/User";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

export const UserContext = createContext<{ user: User, setUser: Dispatch<SetStateAction<User>> }>({ user: {} as User, setUser: () => {}});

export default function UserProvider(props: any) {
    const [user, setUser] = useState<User>({} as User);
    const [userUpdated, setUserUpdated] = useState(false);
    useEffect(() => { getUser().then((user) => { setUser(user); }) }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );
};