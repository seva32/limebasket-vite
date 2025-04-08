/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IProduct } from "../interfaces/IProduct";
import axios from "axios";
import authHeader from "../utils/misc/auth-header";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4939/lime-api"
    : "https://lime-api.sfantini.us/lime-api";

interface ProductsContextType {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

const fetchProducts = async ({
  category,
  searchKeyword,
  sortOrder,
}: {
  category: string;
  searchKeyword?: string;
  sortOrder?: string;
}): Promise<{ data: IProduct[] }> => {
  return axios.get(
    `${url}/shop/products?category=${
      category === "all" ? "" : category
    }&searchKeyword=${searchKeyword || ""}&sortOrder=${sortOrder || ""}`,
    {
      headers: authHeader(),
    }
  );
};

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const category = location.pathname.split("/")[2] || "all";
    setLoading(true);
    setError(null);

    fetchProducts({ category, searchKeyword, sortOrder })
      .then((resp) => {
        setProducts(resp.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, [location, searchKeyword, sortOrder]);

  const value = {
    products,
    loading,
    error,
    searchKeyword,
    setSearchKeyword,
    sortOrder,
    setSortOrder,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
