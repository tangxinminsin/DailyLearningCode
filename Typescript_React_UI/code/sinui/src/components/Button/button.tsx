/*
 * @Author: tangxinmin
 * @Date: 2021-09-26 15:24:35
 * @LastEditors: tangxinmin
 * @LastEditTime: 2021-10-08 10:39:15
 * @Description: file content
 */
import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

// export enum ButtonSize {
//   Lager = 'lg',
//   Small = 'sm'
// }

// export enum ButtonType {
//   Primary = 'primary',
//   Default = 'default',
//   Danger = 'danger',
//   Link = 'link'
// }
export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  className?: string,
  disabled?: boolean,
  size?: ButtonSize,
  btnType?: ButtonType,
  href?: string,
  children: React.ReactNode
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement> // 获得button上的所有属性
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: FC<ButtonProps> = (props) => {
  const {
    disabled,
    size,
    className,
    btnType,
    href,
    children,
    ...restProps// es6 剩余参数
  } = props

  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled
  })
  return (
    <>
      {
        btnType === 'link' && href ?
          <a
            className={classes}
            href={href}
            rel="noreferrer"
            {...restProps}
          >
            {children}
          </a> :
          <button
            className={classes}
            disabled={disabled}
            {...restProps}
          >
            {children}
          </button>
      }
    </>

  )


}
Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}
export default Button;