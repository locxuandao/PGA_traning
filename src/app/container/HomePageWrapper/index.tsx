import classNames from "classnames/bind";

import styles from "./HomePageWrapper.module.scss";

const cx = classNames.bind(styles);

export const HomePageWrapper = () => {
  return <div className={cx("container")}>homepage</div>;
};
