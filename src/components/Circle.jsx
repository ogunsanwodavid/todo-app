/* eslint-disable react/prop-types */

function Circle({ onClick }) {
  return (
    <div
      className="h-5 w-5 border-lightMode-darkGrayishBlue border-[1.5px] rounded-full dark:border-darkMode-veryDarkGrayishBlue hover:border-lightMode-veryDarkGrayishBlue dark:hover:border-darkMode-lightGrayishBlueHover md:h-6 md:w-6"
      onClick={onClick}
    ></div>
  );
}

export default Circle;
