import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

type Cn = (...inputs: ClassValue[]) => string
export const cn: Cn = (...inputs) => {
    return twMerge(clsx(...inputs))
}
