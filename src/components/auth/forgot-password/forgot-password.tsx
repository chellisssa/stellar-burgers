import { BaseForm } from "../../common/base-form/base-form.tsx";
import { AUTH_TITLES, BUTTON_NAMES, LINK_TEXTS } from "../../../utils/constants/auth.ts";
import { Dispatch, SetStateAction, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { BaseTextLink } from "../../common/base-text-link/base-text-link.tsx";
import { useFetch } from "../../../hooks/useFetch.ts";
import { ENDPOINTS } from "../../../utils/constants.ts";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constants/routes.ts";
import { isValidEmail } from "../../../utils/is-valid-email.ts";
import { IBaseAuthRes } from "../../../types/auth.ys.ts";

function InputChildren({ value, setValue }: {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}) {

    function handleSetValue(e: SyntheticEvent<Element, Event>) {
        setValue((e.target as HTMLInputElement).value);
    }

    return (
        <EmailInput
            onChange={handleSetValue}
            value={value}
            name="email"
            isIcon={false}
        />
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

export function ForgotPassword() {
    const [email, setEmail] = useState<string>("");
    const { payload, loading, fetchData } = useFetch();
    const navigate = useNavigate();

    useEffect(() => {
        if ((payload as IBaseAuthRes)?.success) {
            navigate(ROUTES.resetPassword, { state: { from: location.pathname }});
        }
    }, [payload]);

    const handleSubmit = useCallback(async (e: SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        await fetchData(ENDPOINTS.passwordReset, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email }),
        });
    }, [fetchData]);

    return (
        <section className="auth-page">
            <BaseForm
                title={AUTH_TITLES.forgotPassword}
                inputChildren={<InputChildren
                    value={email}
                    setValue={setEmail}
                />}
                buttonName={BUTTON_NAMES.restore}
                linkChildren={<LinkChildren/>}
                onSubmit={handleSubmit}
                isLoading={loading}
                isDisabled={!isValidEmail(email)}
            />
        </section>
    )
}