import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full h-14 px-4 border-b shadow-sm bg-background flex items-center">
            <div className="flec items-center w-full justify-between">
                <div className="flec items-center gap-x-4">
                    <Link href="/">
                        <h1 className="font-semibold text-xl">Todo app</h1>
                    </Link>
                </div>
            </div>
        </nav>
    )
}