import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import AddIcon from "@mui/icons-material/Add";

function ListSongs() {
  return (
    <div className="rounded-lg h-full-screen overflow-y-scroll bg-primary-gradient">
      <div className="p-4 flex items-end max-h-max mb-4">
        <img
          className="size-36 rounded-lg"
          src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
          alt="background"
        />
        <div className="ml-6">
          <h1 className="text-6xl font-bold">HURRYKNG</h1>
          <p className="text-sm mt-2 text-color">
            Viral, trending and taking off.
          </p>
          <div className="flex items-center mt-2">
            <button className="size-8 bg-primary rounded-full mr-2">
              <GraphicEqIcon />
            </button>
            <p className="text-sm ">
              <span className="font-bold">K-Spotify</span>
              <span className="mx-2">|</span>
              <span>50 bài hát, khoảng 2 giờ 30 phút</span>
            </p>
          </div>
        </div>
        <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayArrowIcon className="text-3xl" />
        </button>
      </div>
      <div className="w-full relative p-4">
        {/* Overlay */}
        <div className="bg-dark-secondary opacity-20 absolute inset-0 z-0"></div>

        {/* Buttons container */}
        <div className="relative z-20 flex justify-between items-center">
          <div className="flex">
            <button className="size-14 flex justify-center items-center rounded-full bg-primary cursor-pointer">
              <PlayArrowIcon className="text-3xl" />
            </button>
            <button className="text-3xl ml-6 cursor-pointer">
              <AddIcon />
            </button>
          </div>
          <div className="flex items-end text-color">
            <span className="text-sm mr-2">Sắp xếp:</span>
          </div>
        </div>

        <table className="text-sm text-color w-full mt-6 text-center">
          <thead className="border-b-2 ">
            <th className="py-3 w-14">STT.</th>
            <th>Bài hát</th>
            <th>Nghệ sĩ</th>
            <th>Album</th>
            <th>Thời lượng</th>
          </thead>
          <tbody>
            <tr className="cursor-pointer hover:bg-dark-secondary transition-all">
              <td className="p-2 w-14">1</td>
              <td>Ngủ một mình</td>
              <td>HIEU THU HAI</td>
              <td>MỚI RA</td>
              <td>2:10</td>
            </tr>
            <tr>
              <td className="p-2">1</td>
              <td>Ngủ một mình</td>
              <td>HIEU THU HAI</td>
              <td>MỚI RA</td>
              <td>2:10</td>
            </tr>
            <tr>
              <td className="p-2">1</td>
              <td>Ngủ một mình</td>
              <td>HIEU THU HAI</td>
              <td>MỚI RA</td>
              <td>2:10</td>
            </tr>
            <tr>
              <td className="p-2">1</td>
              <td>Ngủ một mình</td>
              <td>HIEU THU HAI</td>
              <td>MỚI RA</td>
              <td>2:10</td>
            </tr>
            <tr>
              <td className="p-2">1</td>
              <td>Ngủ một mình</td>
              <td>HIEU THU HAI</td>
              <td>MỚI RA</td>
              <td>2:10</td>
            </tr>
            <tr>
              <td className="p-2">1</td>
              <td>Ngủ một mình</td>
              <td>HIEU THU HAI</td>
              <td>MỚI RA</td>
              <td>2:10</td>
            </tr>
            <tr>
              <td className="p-2">1</td>
              <td>Ngủ một mình</td>
              <td>HIEU THU HAI</td>
              <td>MỚI RA</td>
              <td>2:10</td>
            </tr>
            <tr>
              <td className="p-2">1</td>
              <td>Ngủ một mình</td>
              <td>HIEU THU HAI</td>
              <td>MỚI RA</td>
              <td>2:10</td>
            </tr>
            <tr>
              <td className="p-2">1</td>
              <td>Ngủ một mình</td>
              <td>HIEU THU HAI</td>
              <td>MỚI RA</td>
              <td>2:10</td>
            </tr>
            <tr>
              <td className="p-2">1</td>
              <td>Ngủ một mình</td>
              <td>HIEU THU HAI</td>
              <td>MỚI RA</td>
              <td>2:10</td>
            </tr>
            <tr>
              <td className="p-2">1</td>
              <td>Ngủ một mình</td>
              <td>HIEU THU HAI</td>
              <td>MỚI RA</td>
              <td>2:10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListSongs;
