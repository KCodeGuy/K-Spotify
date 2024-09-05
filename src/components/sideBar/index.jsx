import ViewListIcon from "@mui/icons-material/ViewList";
import AddIcon from "@mui/icons-material/Add";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

export default function SideBar() {
  return (
    <div className="w-full bg-dark-secondary rounded-lg py-4 px-4 h-full-screen overflow-y-scroll">
      <div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <ViewListIcon />
            <p className="font-bold text-color ml-2">Thư viện</p>
          </div>
          <button className="size-8 bg-primary rounded-full">
            <AddIcon />
          </button>
        </div>
        <ul>
          <div className="flex items-center mt-3 hover:bg-neutral-700 p-2 rounded-md cursor-pointer">
            <div className="bg-dark-third p-3 rounded-md">
              <LibraryMusicIcon />
            </div>
            <div className="ml-3">
              <h5>Danh sách phát của tôi #1</h5>
              <p className="text-sm text-color">Danh sách phát-Thiên Nhi</p>
            </div>
          </div>
          <div className="flex items-center mt-3 hover:bg-neutral-700 p-2 rounded-md cursor-pointer">
            <div className="bg-dark-third p-3 rounded-md">
              <LibraryMusicIcon />
            </div>
            <div className="ml-3">
              <h5>Danh sách phát của tôi #1</h5>
              <p className="text-sm text-color">Danh sách phát-Thiên Nhi</p>
            </div>
          </div>
          <div className="flex items-center mt-3 hover:bg-neutral-700 p-2 rounded-md cursor-pointer">
            <div className="bg-dark-third p-3 rounded-md">
              <LibraryMusicIcon />
            </div>
            <div className="ml-3">
              <h5>Danh sách phát của tôi #1</h5>
              <p className="text-sm text-color">Danh sách phát-Thiên Nhi</p>
            </div>
          </div>
          <div className="flex items-center mt-3 hover:bg-neutral-700 p-2 rounded-md cursor-pointer">
            <div className="bg-dark-third p-3 rounded-md">
              <LibraryMusicIcon />
            </div>
            <div className="ml-3">
              <h5>Danh sách phát của tôi #1</h5>
              <p className="text-sm text-color">Danh sách phát-Thiên Nhi</p>
            </div>
          </div>
          <div className="flex items-center mt-3 hover:bg-neutral-700 p-2 rounded-md cursor-pointer">
            <div className="bg-dark-third p-3 rounded-md">
              <LibraryMusicIcon />
            </div>
            <div className="ml-3">
              <h5>Danh sách phát của tôi #1</h5>
              <p className="text-sm text-color">Danh sách phát-Thiên Nhi</p>
            </div>
          </div>
          <div className="flex items-center mt-3 hover:bg-neutral-700 p-2 rounded-md cursor-pointer">
            <div className="bg-dark-third p-3 rounded-md">
              <LibraryMusicIcon />
            </div>
            <div className="ml-3">
              <h5>Danh sách phát của tôi #1</h5>
              <p className="text-sm text-color">Danh sách phát-Thiên Nhi</p>
            </div>
          </div>
          <div className="flex items-center mt-3 hover:bg-neutral-700 p-2 rounded-md cursor-pointer">
            <div className="bg-dark-third p-3 rounded-md">
              <LibraryMusicIcon />
            </div>
            <div className="ml-3">
              <h5>Danh sách phát của tôi #1</h5>
              <p className="text-sm text-color">Danh sách phát-Thiên Nhi</p>
            </div>
          </div>
          <div className="flex items-center mt-3 hover:bg-neutral-700 p-2 rounded-md cursor-pointer">
            <div className="bg-dark-third p-3 rounded-md">
              <LibraryMusicIcon />
            </div>
            <div className="ml-3">
              <h5>Danh sách phát của tôi #1</h5>
              <p className="text-sm text-color">Danh sách phát-Thiên Nhi</p>
            </div>
          </div>
        </ul>
      </div>
      <div className="bg-zinc-700"></div>
    </div>
  );
}
