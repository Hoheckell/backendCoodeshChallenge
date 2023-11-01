import { ObjectId } from 'mongoose';

export class NamesListDto {
  _id: ObjectId;
  id: string;
  name: string;
  rocket: string;
}
