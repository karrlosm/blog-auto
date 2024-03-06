import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface ActiveLinkProps extends LinkProps {
    activeClassName: string;
    nameLink: string;
}

export function ActiveLink({
    href, activeClassName, nameLink
}: ActiveLinkProps) {

    // verificando de a página é igual ao link que estamos acessando para inserir o className
    const { asPath } = useRouter()
    const className = asPath === href ? activeClassName : '';
    
    return (
        <Link className={className} href={href}>
            {nameLink}
        </Link>
    )
}