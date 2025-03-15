import styles from "./profile-tabs.module.css";
import { PROFILE_TABS } from "../../../utils/constants/profile.ts";
import { Link, useLocation } from "react-router-dom";
import { AppThunkDispatch, useAppDispatch } from "../../../hooks/services.ts";
import { useState } from "react";
import { logOut } from "../../../services/actions/auth.ts";

export function ProfileTabs() {
    const location = useLocation();
    const dispatch = useAppDispatch<AppThunkDispatch>();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogOut= async () => {
        try {
            setIsLoading(true)
            await dispatch(logOut());
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    return (
        <ul className={styles.ProfileTabs}>
            {PROFILE_TABS.map(el => (
                <li
                    key={el.name}
                    className={`${styles.tab} ${location.pathname === el.link ? styles.active : ''} text text_type_main-medium`}
                >
                    {
                        el.link
                            ? <Link to={el.link}>{el.name}</Link>
                            : <div onClick={handleLogOut}>{el.name}{isLoading ? '...' : ''}</div>
                    }
                </li>
            ))}
        </ul>
    )
}
