import { IReview } from "./IReview";

export interface IProduct {
  _id: string;
  name: string;
  image?: string;
  brand: string;
  price: number;
  category: "dogs" | "cats" | "health";
  countInStock: number;
  description?: string;
  rating: number;
  numReviews: number;
  reviews: IReview[];
  createdAt?: string;
  updatedAt?: string;
}
