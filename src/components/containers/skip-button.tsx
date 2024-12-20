import {Button, ButtonProps} from "@/components/ui/button";
import Link from "next/link";

const SkipButton = ({asChild}: ButtonProps) => {
    return (
        <Button asChild={asChild} className="absolute top-4 left-1" variant="link">
            <Link href="/main">Пропустить</Link>
        </Button>
    )
}

export default SkipButton;