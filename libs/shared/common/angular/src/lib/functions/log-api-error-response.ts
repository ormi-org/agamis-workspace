import { Injectable } from "@angular/core";
import { ApiErrorResponse } from "@agamis/workspace/shared/common/types";

@Injectable({
  providedIn: "root"
})
export class LogApiErrorResponse {
  apply(response: ApiErrorResponse): string {
    return `${response.code} - ${response.message}`;
  }

  applyWithDetails(response: ApiErrorResponse): string {
    return `${response.code} - ${response.message} : ${response.cause}`;
  }
}