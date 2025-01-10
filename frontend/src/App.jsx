import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import "./App.css";
import ItemList from "./components/ItemList";
import PharmacyList from "./components/PharmacyList";
import SideMenu from "./components/SideMenu";

const App = () => {
  const URL = "http://58.151.228.42:6010";
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [pharmacys, setPharmacys] = useState([]); // 약국 정보 상태

  // 데이터베이스에서 예측 결과 가져오기
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(URL +"/api/prediction-out/");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  // 선택된 품목에 대한 사입 스케줄 데이터 가져오기
  useEffect(() => {
    const fetchPharmacys = async () => {
      if (selectedItem) {
        try {
          const response = await axios.get(
            URL + `/api/buying-schedules/${selectedItem.medi_no}/`
          );
          setPharmacys(response.data);
        } catch (error) {
          console.error("Error fetching buying schedules:", error);
          setPharmacys([]);
        }
      } else {
        setPharmacys([]);
      }
    };

    fetchPharmacys();
  }, [selectedItem]); // selectedItem이 변경될 때 실행

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const filteredItems = items.filter((item) =>
    item.medi_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <Header onSearch={(term) => setSearchTerm(term)} />
      
      <div className="horizontal-sections">
      <SideMenu />
        <ItemList
          items={filteredItems}
          selectedItem={selectedItem}
          onItemClick={handleItemClick}
        />
        <PharmacyList selectedItem={selectedItem} pharmacys={pharmacys} />
      </div>
    </div>
  );
};

export default App;
