import { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "../utils/constants/shared";

const LinksList = () => {
  const [currPage, setCurrPage] = useState(
    localStorage.getItem("curr-page") || "Home"
  );

  const updatePage = (title: string) => {
    setCurrPage(title);
    localStorage.setItem("curr-page", title);
  };
  
  return (
    <div>
      {links.map(({ path, Logo, title }) => {
        return (
          <Link to={path}>
            <div
              onClick={() => updatePage(title)}
              className={`side-nav-link-container hover:text-white rounded-xl ${
                title === currPage
                  ? "bg-purple-500 text-white"
                  : "text-purple-500 hover:rounded-none hover:border-r-2"
              }`}
            >
              <div className="side-nav-link">
                <Logo />
                <p className="text-white">{title}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default LinksList;
