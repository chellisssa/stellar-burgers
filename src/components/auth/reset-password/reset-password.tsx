import { BaseForm } from "../../common/base-form/base-form.tsx";
import { AUTH_PLACEHOLDERS, AUTH_TITLES, BUTTON_NAMES, LINK_TEXTS } from "../../../utils/constants/auth.ts";
import { Dispatch, SetStateAction, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { BaseTextLink } from "../../common/base-text-link/base-text-link.tsx";
import { ROUTES } from "../../../utils/constants/routes.ts";
import { useFetch } from "../../../hooks/useFetch.ts";
import { ENDPOINTS } from "../../../utils/constants.ts";
import { useNavigate } from "react-router-dom";
import { IBaseRes } from "../../../types/common.ts";

interface Props {
    password: string;
    code: string;
    setPassword: Dispatch<SetStateAction<string>>;
    setCode: Dispatch<SetStateAction<string>>;
}
function InputChildren({ password, code, setPassword, setCode}: Props) {

    return (
        <>
            <Input
                type="password"
                placeholder={AUTH_PLACEHOLDERS.newPassword}
                onChange={e => setPassword(e.target.value)}
                icon="ShowIcon"
                value={password}
                name="password"
                error={false}
                size="default"
            />
            <Input
                type="text"
                placeholder={AUTH_PLACEHOLDERS.code}
                onChange={e => setCode(e.target.value)}
                value={code}
                name="code"
                error={false}
                size="default"
            />
        </>
    )
}

function LinkChildren() {
    return (
        <BaseTextLink
            text={LINK_TEXTS.rememberPassword.text}
            linkName={LINK_TEXTS.rememberPassword.link}
            linkUrl={LINK_TEXTS.rememberPassword.url}
        />
    )
}

export function ResetPassword() {
    const [password, setPassword] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const { payload, loading, fetchData } = useFetch();
    const navigate = useNavigate();


    useEffect(() => {
        if ((payload as IBaseRes)?.success) {
            navigate(ROUTES.login);
        }
    }, [payload]);

    const handleSubmit = useCallback(async (e: SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        await fetchData(ENDPOINTS.confirmPasswordReset, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password, token: code }),
        });
    }, [fetchData]);

    return (
        <section className="auth-page">
            <BaseForm
                title={AUTH_TITLES.forgotPassword}
                inputChildren={<InputChildren
                    password={password}
                    code={code}
                    setPassword={setPassword}
                    setCode={setCode}
                />}
                buttonName={BUTTON_NAMES.save}
                linkChildren={<LinkChildren/>}
                onSubmit={handleSubmit}
                isLoading={loading}
            />
        </section>
    )
}