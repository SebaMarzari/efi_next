interface TableLayoutProps {
  children: React.ReactNode
}

const TableLayout = ({ children, ...props }: TableLayoutProps) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default TableLayout