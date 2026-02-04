// Component: Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = "px-6 py-2 rounded-full font-medium transition-all duration-200"
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark hover:shadow-lg",
    secondary: "bg-primary-light text-white hover:bg-primary",
    outline: "border-2 border-primary text-primary hover:bg-primary/5",
    white: "bg-white text-primary hover:bg-primary/5 shadow-md"
  }
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
