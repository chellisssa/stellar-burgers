import { BaseForm } from "../../common/base-form/base-form.tsx";
import { AUTH_PLACEHOLDERS, AUTH_TITLES, BUTTON_NAMES, LINK_TEXTS } from "../../../utils/constants/auth.ts";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Dispatch, SetStateAction, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { BaseTextLink } from "../../common/base-text-link/base-text-link.tsx";
import { AppThunkDispatch, useAppDispatch } from "../../../hooks/services.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { sendLogin } from "../../../services/actions/auth.ts";
import { ROUTES } from "../../../utils/constants/routes.ts";
import { isValidEmail } from "../../../utils/is-valid-email.ts";

interface InputChildrenProps {
    email: string;
    password: string;
    error: string;
    setEmail: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
    setError: Dispatch<SetStateAction<string>>;
}
function InputChildren({ email, password, error, setEmail, setPassword, setError}: InputChildrenProps) {
    useEffect(() => {
        if (error) setError('');
    }, [email]);

    return (
        <>
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
        <>
            <BaseTextLink
                text={LINK_TEXTS.register.text}
                linkName={LINK_TEXTS.register.link}
                linkUrl={LINK_TEXTS.register.url}
            />
            <BaseTextLink
                text={LINK_TEXTS.forgotPassword.text}
                linkName={LINK_TEXTS.forgotPassword.link}
                linkUrl={LINK_TEXTS.forgotPassword.url}
            />
        </>
    )
}

export function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useAppDispatch<AppThunkDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = useCallback(async (e: SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await dispatch(sendLogin({ email, password }));
            if (location?.state?.from) {
                navigate(location.state.from);
            } else {
                navigate(ROUTES.base);
            }
        } catch (err) {
            setError(err as string);
        } finally {
            setIsLoading(false);
        }
    }, [email, password]);

    return (
        <section className="auth-page">
            <BaseForm
                title={AUTH_TITLES.login}
                inputChildren={<InputChildren
                    email={email}
                    password={password}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    error={error}
                    setError={setError}
                />}
                buttonName={BUTTON_NAMES.login}
                linkChildren={<LinkChildren />}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                isDisabled={!isValidEmail(email)}
            />
        </section>
    )
}