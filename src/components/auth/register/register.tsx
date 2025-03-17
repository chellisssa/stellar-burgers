import { BaseForm } from "../../common/base-form/base-form.tsx";
import { AUTH_PLACEHOLDERS, AUTH_TITLES, BUTTON_NAMES, LINK_TEXTS } from "../../../utils/constants/auth.ts";
import { Dispatch, SetStateAction, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { BaseTextLink } from "../../common/base-text-link/base-text-link.tsx";
import { sendRegister } from "../../../services/actions/auth.ts";
import { isValidEmail } from "../../../utils/is-valid-email.ts";
import { useAppDispatch } from "../../../hooks/services.ts";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constants/routes.ts";

interface InputChildrenProps {
    name: string;
    email: string;
    password: string;
    error: string;
    setName: Dispatch<SetStateAction<string>>;
    setEmail: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
    setError: Dispatch<SetStateAction<string>>;
}
function InputChildren({ name, email, password, error, setName, setEmail, setPassword, setError}: InputChildrenProps) {
    useEffect(() => {
        if (error) setError('');
    }, [email]);

    return (
        <>
            <Input
                type="text"
                placeholder={AUTH_PLACEHOLDERS.name}
                onChange={e => setName(e.target.value)}
                value={name}
                name="name"
                error={false}
                size="default"
            />
            <Input
                type="email"
                placeholder={AUTH_PLACEHOLDERS.email}
                onChange={e => setEmail(e.target.value)}
                value={email}
                name="email"
                error={!!error}
                errorText={error}
                size="default"
            />
            <Input
                type="password"
                placeholder={AUTH_PLACEHOLDERS.password}
                onChange={e => setPassword(e.target.value)}
                icon="ShowIcon"
                value={password}
                name="password"
                error={false}
                size="default"
            />
        </>
    )
}

function LinkChildren() {
    return (
        <BaseTextLink
            text={LINK_TEXTS.login.text}
            linkName={LINK_TEXTS.login.link}
            linkUrl={LINK_TEXTS.login.url}
        />
    )
}

export function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (e: SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await dispatch(sendRegister({ name, email, password }));
            navigate(ROUTES.login);
        } catch (err) {
            setError(err as string);
        } finally {
            setIsLoading(false);
        }
    }, [name, email, password]);

    return (
        <section className="auth-page">
            <BaseForm
                title={AUTH_TITLES.register}
                inputChildren={<InputChildren
                    name={name}
                    email={email}
                    password={password}
                    setName={setName}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    error={error}
                    setError={setError}
                />}
                buttonName={BUTTON_NAMES.register}
                linkChildren={<LinkChildren/>}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                isDisabled={!isValidEmail(email)}
            />
        </section>
    )
}