import Link from "next/link";

export default function PageInvalidLoging() {
    return (
        <main className="flex w-50px items-center rounded-lg bg-blue-100 px-4 text-sm font-medium text-gray-600">
            <h1 className="flex w-60px items-center rounded-lg bg-yellow-100 px-4 text-sm font-medium text-gray-600">Has introducido una clave erronea, por favor intentelo de nuevo</h1>
            <div className="w-10"></div>
            <Link
                href="/login"
                className="flex h-10 w-30 items-center rounded-lg bg-red-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-red-950"
            >
                Reintentar
            </Link>
        </main>
    );
}