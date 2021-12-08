/*
 * @Author: tangxinmin
 * @Date: 2021-10-08 10:56:22
 * @LastEditors: tangxinmin
 * @LastEditTime: 2021-10-08 11:44:15
 * @Description: file content
 */
import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps {
  index?: string | number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props
  const context = useContext(MenuContext)

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })
  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'string' || typeof index === 'number')) {
      context.onSelect(index)
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'
export default MenuItem