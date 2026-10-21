export default function Button({children, ...rest}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button 
        className="text-white font-medium text-sm rounded-lg h-9 px-3 disabled:opacity-50 bg-accent hover:bg-accent-hover " {...rest}>
            {children}
        </button>
    )
}