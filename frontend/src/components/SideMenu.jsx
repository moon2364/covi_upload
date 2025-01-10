import React, { useState } from "react";
import "./SideMenu.css";

const SideMenu = () => {
  const [activeItem, setActiveItem] = useState("wholesale"); // 기본 활성화 메뉴 설정

  const menuItems = [
    { id: "order", label: "주문", description: "AI 오늘의 주문", icon: "/search-icon.png" },
    { id: "wholesale", label: "도매상 사입", description: "주문 예상 품목", icon: "/truck-icon.png" },
  ];

  const handleItemClick = (id) => {
    setActiveItem(id); // 클릭한 메뉴 항목을 활성화
  };

  return (
    <div className="side-menu">
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`menu-item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => handleItemClick(item.id)}
          >
            <img src={item.icon} alt={`${item.label} icon`} className="menu-icon" />
            <div className="menu-description">
              <strong>{item.label}</strong>
              <div>{item.description}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
