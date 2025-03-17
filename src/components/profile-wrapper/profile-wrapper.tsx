import styles from './profile-wrapper.module.css';
import { ProfileTabs } from "./profile-tabs/profile-tabs.tsx";
import React from "react";

interface Props {
    children: React.ReactNode
}
export function ProfileWrapper({ children }: Props) {
    return (
        <div className={`${styles.Profile} container`}>
            <ProfileTabs/>
            <div className={styles.wrapper}>
                { children }
            </div>
        </div>
    )
}