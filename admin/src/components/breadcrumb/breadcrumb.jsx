import React from "react";

const CommonBreadcrumb = ({ crumbs }) => {
  return (
    <nav aria-label="breadcrumb" className="custom-breadcrumb-nav">
      <ol className="custom-breadcrumb">
        {crumbs.map((crumb, index) => (
          <li
            key={index}
            className={`custom-breadcrumb-item ${index === crumbs.length - 1 ? "active" : ""}`}
            aria-current={index === crumbs.length - 1 ? "page" : undefined}
          >
            {index === crumbs.length - 1 ? (
              crumb.label
            ) : (
              <a href={crumb.link}>{crumb.label}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CommonBreadcrumb;
