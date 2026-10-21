export default function Input({...rest}: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input 
        className="w-full border px-2 border-line rounded-lg h-9 focus:outline-none focus:ring-2 focus:ring-accent" {...rest}
        />
    )
}