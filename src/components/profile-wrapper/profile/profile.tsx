import styles from "./profile.module.css";
import { AUTH_PLACEHOLDERS } from "../../../utils/constants/auth.ts";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { SyntheticEvent, useEffect, useState } from "react";
import { AppThunkDispatch, useAppDispatch, useAppSelector } from "../../../hooks/services.ts";
import { updateUser } from "../../../services/actions/auth.ts";

export function Profile() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const dispatch = useAppDispatch<AppThunkDispatch>();
    const user = useAppSelector(state => state.auth.user);

    useEffect(() => {
        if (user.name) {
            setName(user.name as string);
        }
        if (user.email) {
            setEmail(user.email as string);
        }
    }, []);

    useEffect(() => {
        setIsChanged(name !== user.name || email !== user.email || !!password);
    }, [name, email, password, user]);

    function handleSave(e: SyntheticEvent<Element, Event>) {
        e.preventDefault();
        dispatch(updateUser({ email, name, password }));
    }

    function handleReset(e: SyntheticEvent<Element, Event>) {
        e.preventDefault();
        setName(user.name as string);
        setEmail(user.email as string);
    }

    return (
        <form className={styles.Profile}>
            <Input
                type="text"
                placeholder={AUTH_PLACEHOLDERS.name}
                onChange={e => setName(e.target.value)}
                value={name}
                name="name"
                error={false}
                size="default"
                icon="EditIcon"
            />
            <Input
                type="email"
                placeholder={AUTH_PLACEHOLDERS.email}
                onChange={e => setEmail(e.target.value)}
                value={email}
                name="email"
                size="default"
                icon="EditIcon"
            />
            <Input
                type="password"
                placeholder={AUTH_PLACEHOLDERS.password}
                onChange={e => setPassword(e.target.value)}
                icon="EditIcon"
                value={password}
                name="password"
                error={false}
                size="default"
            />
            { isChanged &&
                <div className={styles.buttonWrapper}>
                    <Button
                        htmlType="reset"
                        type="secondary"
                        size="medium"
                        onClick={handleReset}
                    >
                        Отмена
                    </Button>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        onClick={handleSave}
                    >
                        Сохранить
                    </Button>
                </div>
            }
        </form>
    )
}