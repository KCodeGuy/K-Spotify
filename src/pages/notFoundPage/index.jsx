import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { useNavigate } from "react-router-dom";

import ButtonComponent from "../../components/buttonComponent";

function Notfound() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="text-center">
        <div className="flex justify-center">
          <button className="size-8 bg-primary rounded-full mr-2">
            <GraphicEqIcon />
          </button>
          <h1 className="text-xl">K-Spotify</h1>
        </div>
        <ButtonComponent
          className="mt-4"
          onClick={() => {
            navigate("/");
          }}
        >
          Trang chủ
        </ButtonComponent>
        <p className="text-xl text-color mt-4 font-bold">
          Không tìm thấy trang!
        </p>
      </div>
    </div>
  );
}

export default Notfound;
