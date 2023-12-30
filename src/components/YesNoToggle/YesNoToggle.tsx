import cx from 'classnames';
import styles from './style.module.scss';

type YesNoToggleProps = {
  className?: string;
  title: string;
  status: boolean;
  onChange: (status: boolean) => void;
};

export const YesNoToggle = ({
  status,
  onChange,
  title,
  className,
}: YesNoToggleProps) => {
  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.title}>{title}</div>
      <div className={styles.toggle}>
        <div
          className={cx(styles.yes, {
            [styles.active]: status,
          })}
          onClick={() => onChange(true)}
        >
          Evet
        </div>
        <div
          className={cx(styles.no, { [styles.active]: !status })}
          onClick={() => onChange(false)}
        >
          Hayir
        </div>
      </div>
    </div>
  );
};
