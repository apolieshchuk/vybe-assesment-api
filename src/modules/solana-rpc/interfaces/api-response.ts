import { Type } from "class-transformer";
import { ArrayNotEmpty } from "class-validator";

export interface ApiResponse<T> {
  data: T[] | T;
}