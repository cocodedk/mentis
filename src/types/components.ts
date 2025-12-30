export type ButtonVariant = 'primary' | 'secondary' | 'text'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type CardVariant = 'default' | 'treatment' | 'staff' | 'pricing' | 'info'

export type AlertVariant = 'info' | 'warning'

export interface NavigationItem {
  label: string
  path: string
  children?: NavigationItem[]
}

export interface DropdownItem {
  label: string
  path: string
}
