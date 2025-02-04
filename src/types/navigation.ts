import { FC } from 'react';
import type { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

export interface INavigationItem {
    name: string;
    id: string;
    icon: FC<TIconProps>;
    position: 'left' | 'right';
}