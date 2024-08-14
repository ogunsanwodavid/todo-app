/* eslint-disable react/prop-types */

import iconCheck from "../assets/icon-check.svg";

function CheckedCircle({ onClick }) {
  return (
    <div
      className="min-h-5 min-w-5 flex items-center justify-center border-lightMode-darkGrayishBlue rounded-full bg-gradient-to-br from-bgGradient1 to-bgGradient2 dark:border-darkMode-veryDarkGrayishBlue"
      onClick={onClick}
    >
      <img src={iconCheck} className="h-2" alt="" />
    </div>
  );
}

export default CheckedCircle;
