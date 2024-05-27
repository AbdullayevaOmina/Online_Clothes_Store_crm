import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";

import { AddMedia, UpdateProduct } from "@modals";
import request from "../../service/config";
import { useProductStore } from "@store";
import { getDataFromCookie } from "@token-service";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";

function Index() {
  const { getProduct, deleteProduct } = useProductStore();
  const navigate = useNavigate();
  const id = getDataFromCookie("id");

  const [loader, setLoader] = useState(false);
  const [product, setProduct] = useState<any>({});
  const [imgList, setImgList] = useState([]);

  const dataEdit = { ...product, product_id: id };

  const fetchProductData = async () => {
    setLoader(true);
    try {
      const data = await getProduct(id);
      setProduct(data);
    } catch (err) {
      toast.error("Failed to fetch product data");
      console.log(err);
    }
    setLoader(false);
  };

  const fetchImages = async (productId: string) => {
    try {
      const response: any = await request.get(`v1/media/${productId}`);
      const imgs = response?.data?.images || [];
      const data = imgs.map((img: any) => img.image_url);
      const imgsDataProps = data.map((img: any) => ({
        original: img || "",
        thumbnail: img || "",
      }));

      setImgList(imgsDataProps);
    } catch (err) {
      toast.error("Failed to fetch images");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchImages(id);
    fetchProductData();

    return () => {
      setImgList([]);
      setProduct({});
    };
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
      navigate("/main/products");
    } catch (err) {
      toast.error("Failed to delete product");
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      {loader ? (
        "loading..."
      ) : (
        <div className="w-full h-[80vh] flex items-center justify-center">
          <div className="flex items-center justify-center gap-40">
            <div className="h-full">
              <ImageGallery items={imgList} additionalClass="w-[500px]" />
            </div>
            <div>
              <h2 className="text-[30px] font-semibold text-slate-500 text-center mb-8">
                {product.product_name}
              </h2>
              <p className="text-[20px] font-medium text-slate-600 py-1">
                Description:{" "}
                <span className="border-b pb-1 font-semibold">
                  {product.description}
                </span>{" "}
              </p>
              <p className="text-[20px] text-slate-600">
                Made in:{" "}
                <span className="text-[22px] font-semibold pb-1 border-b">
                  {product.made_in}
                </span>
              </p>
              <p className="text-[20px] font-medium text-slate-600">
                Color:
                <span
                  className="px-3 ml-3 rounded-full"
                  style={{ backgroundColor: product.color }}
                ></span>
                <span className="ml-3 border-b pb-1 text-[20px] font-semibold">
                  {product.color}
                </span>
              </p>
              <p className="text-[20px] font-medium text-slate-600">
                Size:
                <span className="ml-3 border-b pb-1 text-[20px] font-semibold">
                  {product.size}
                </span>
              </p>
              <p className="text-[20px] font-medium text-slate-600">
                Count:
                <span className="ml-3 border-b pb-1 text-[20px] font-semibold">
                  {product.count}
                </span>
              </p>
              <p className="text-[20px] font-medium text-slate-600">
                Cost:
                <span className="ml-3 border-b pb-1 text-[20px] font-semibold">
                  {product.cost}$
                </span>
              </p>
              <p className="text-[20px] font-medium text-slate-600">
                Discount:
                <span className="ml-3 border-b pb-1 text-[20px] font-semibold">
                  {product.discount}%
                </span>
              </p>
              <p className="text-[20px] font-medium text-slate-600">
                Age Range:
                <span className="ml-3 border-b pb-1 text-[20px] font-semibold">
                  {product.age_min} - {product.age_max}
                </span>
              </p>
              <p className="text-[20px] font-medium text-slate-600">
                For Gender:
                <span className="ml-3 border-b pb-1 text-[20px] font-semibold">
                  {product.for_gender}
                </span>
              </p>
              <div className="flex items-center gap-5 mt-5">
                <button className="text-rose-600" onClick={handleDelete}>
                  <DeleteIcon />
                </button>
                <AddMedia dataId={id} />
                <UpdateProduct dataEdit={dataEdit} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
