export interface ResponseMessage {
  data?: any | any[];
  success: boolean;
  message: string;
  statusCode: number;
}
