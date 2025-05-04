import { PropsWithChildren } from "react";

export default function ErrorMessage( {children} : PropsWithChildren ) {
    return (
        <div className="mt-10">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                {children}
            </div>
        </div>
    );
}
