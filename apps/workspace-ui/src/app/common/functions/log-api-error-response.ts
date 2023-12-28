import { Injectable } from "@angular/core";
import ApiErrorResponse from "../../core/models/api-error-response";

@Injectable({
  providedIn: "root"
})
export default class LogApiErrorResponse {
  apply(response: ApiErrorResponse): string {
    return `${response.code} - ${response.message}`;
  }

  applyWithDetails(response: ApiErrorResponse): string {
    return `${response.code} - ${response.message} : ${response.cause}`;
  }
}