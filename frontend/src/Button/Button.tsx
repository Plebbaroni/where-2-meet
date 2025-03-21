import { PlusIcon } from '@heroicons/react/24/solid';
import classes from './Button.module.css';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ArrowTurnDownRightIcon
} from '@heroicons/react/24/outline';

export enum ButtonIcons {
    LeftChevrons = "leftchevrons",
    RightChevrons = "rightchevrons",
    Plus = "plus",
    EnterRight = "enterright"
}

type ButtonProps = {
  icon?: ButtonIcons;
  className?: string;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: () => void; //put this here so that I can pass an onclick function to the button
};

function Button(props: ButtonProps) {
  return (
    <button
      className={`${classes.button}
        ${props.className ? props.className : ''}
        ${props.icon === ButtonIcons.Plus ? classes.plusButton : ''}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.icon === ButtonIcons.RightChevrons && (
        <ChevronDoubleRightIcon className={classes.icon}></ChevronDoubleRightIcon>
      )}
      {props.icon === ButtonIcons.LeftChevrons && (
        <ChevronDoubleLeftIcon className={classes.icon}></ChevronDoubleLeftIcon>
      )}
      {props.icon === ButtonIcons.Plus && (
        <PlusIcon className={`${classes.icon} ${classes.plus}`}></PlusIcon>
      )}
      {
        props.icon === ButtonIcons.EnterRight && (
          <ArrowTurnDownRightIcon className={`${classes.icon} ${classes.plus}`}></ArrowTurnDownRightIcon>
        )
      }
    </button>
  );
}

export default Button;