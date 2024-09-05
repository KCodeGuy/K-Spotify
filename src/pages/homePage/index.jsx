import ButtonComponent from "../../components/buttonComponent";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Footer from "../../components/footer";

function HomePage() {
  return (
    <div className="bg-dark-secondary p-4 rounded-lg h-full-screen overflow-y-scroll">
      <div className="flex items-center">
        <ButtonComponent size="sm" className="bg-transparent">
          Tất cả
        </ButtonComponent>
        <ButtonComponent size="sm" type="light">
          Albums
        </ButtonComponent>
        <ButtonComponent size="sm" type="light">
          Nghệ sĩ
        </ButtonComponent>
        <ButtonComponent size="sm" type="light">
          Podcast
        </ButtonComponent>
      </div>
      <div className="mt-5">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold uppercase mb-2">
            Bảng xếp hạng nổi bật
          </p>
          <button className="text-sm font-medium text-color hover:underline">
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-md"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm font-bold mt-2 line-clamp-2">
              Hẹn gặp em dưới ánh trăng ánh trăng
            </p>
            <p className="text-sm text-color line-clamp-2">HURRYKNG</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-md"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm font-bold mt-2 line-clamp-2">
              Hẹn gặp em dưới ánh trăng ánh trăng
            </p>
            <p className="text-sm text-color line-clamp-2">HURRYKNG</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-md"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm font-bold mt-2 line-clamp-2">
              Hẹn gặp em dưới ánh trăng ánh trăng
            </p>
            <p className="text-sm text-color line-clamp-2">HURRYKNG</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-md"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm font-bold mt-2 line-clamp-2">
              Hẹn gặp em dưới ánh trăng ánh trăng
            </p>
            <p className="text-sm text-color line-clamp-2">HURRYKNG</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-md"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm font-bold mt-2 line-clamp-2">
              Hẹn gặp em dưới ánh trăng ánh trăng
            </p>
            <p className="text-sm text-color line-clamp-2">HURRYKNG</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-md"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm font-bold mt-2 line-clamp-2">
              Hẹn gặp em dưới ánh trăng ánh trăng
            </p>
            <p className="text-sm text-color line-clamp-2">HURRYKNG</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-5">
          <p className="text-xl font-bold uppercase mb-2">Nghệ sĩ nổi bật</p>
          <button className="text-sm font-medium text-color hover:underline">
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-full"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm mt-2 text-center line-clamp-2">HURRYKNG</p>
            <p className="text-sm mt-2 text-center text-color">Nghệ sĩ</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-full"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm mt-2 text-center line-clamp-2">HURRYKNG</p>
            <p className="text-sm mt-2 text-center text-color">Nghệ sĩ</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-full"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm mt-2 text-center line-clamp-2">HURRYKNG</p>
            <p className="text-sm mt-2 text-center text-color">Nghệ sĩ</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-full"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm mt-2 text-center line-clamp-2">HURRYKNG</p>
            <p className="text-sm mt-2 text-center text-color">Nghệ sĩ</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-full"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm mt-2 text-center line-clamp-2">HURRYKNG</p>
            <p className="text-sm mt-2 text-center text-color">Nghệ sĩ</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-full"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm mt-2 text-center line-clamp-2">HURRYKNG</p>
            <p className="text-sm mt-2 text-center text-color">Nghệ sĩ</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-5">
          <p className="text-xl font-bold uppercase mb-2">Album mới ra mắt</p>
          <button className="text-sm font-medium text-color hover:underline">
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-md"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm font-bold mt-2 line-clamp-2">
              Hẹn gặp em dưới ánh trăng ánh trăng
            </p>
            <p className="text-sm text-color line-clamp-2">HURRYKNG</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-md"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm font-bold mt-2 line-clamp-2">
              Hẹn gặp em dưới ánh trăng ánh trăng
            </p>
            <p className="text-sm text-color line-clamp-2">HURRYKNG</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-md"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm font-bold mt-2 line-clamp-2">
              Hẹn gặp em dưới ánh trăng ánh trăng
            </p>
            <p className="text-sm text-color line-clamp-2">HURRYKNG</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-md"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm font-bold mt-2 line-clamp-2">
              Hẹn gặp em dưới ánh trăng ánh trăng
            </p>
            <p className="text-sm text-color line-clamp-2">HURRYKNG</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-md"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm font-bold mt-2 line-clamp-2">
              Hẹn gặp em dưới ánh trăng ánh trăng
            </p>
            <p className="text-sm text-color line-clamp-2">HURRYKNG</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
          <div className="p-3 hover:bg-neutral-700 rounded-md cursor-pointer w-40 relative group">
            <img
              className="size-36 rounded-md"
              src="https://i.scdn.co/image/ab67616d00001e02c006b0181a3846c1c63e178f"
              alt="background"
            />
            <p className="text-sm font-bold mt-2 line-clamp-2">
              Hẹn gặp em dưới ánh trăng ánh trăng
            </p>
            <p className="text-sm text-color line-clamp-2">HURRYKNG</p>
            <button className="size-14 flex justify-center items-center rounded-full bg-primary absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayArrowIcon className="text-3xl" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
