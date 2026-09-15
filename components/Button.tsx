interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white'
  children: React.ReactNode
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-electric text-white hover:bg-blue-700',
    secondary: 'bg-coral text-ink hover:bg-orange-300',
    outline: 'border border-ink/20 text-ink hover:border-electric hover:text-electric',
    white: 'bg-white text-ink hover:bg-blue-50',
  }

  return (
    <button className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] px-6 py-2.5 font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
