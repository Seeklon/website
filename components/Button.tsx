// Component: Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = "px-6 py-2 rounded-full font-medium transition-all duration-200"
  const variants = {
    primary: "bg-seeklon-blue text-white hover:bg-blue-700 hover:shadow-lg",
    secondary: "bg-seeklon-teal text-white hover:bg-teal-600",
    outline: "border-2 border-seeklon-blue text-seeklon-blue hover:bg-blue-50",
    white: "bg-white text-seeklon-blue hover:bg-blue-50 shadow-md"
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
