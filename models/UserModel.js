import { db, firebase } from "~/plugins/firebase";

export function UserModel(dict, key) {
  return {
    id: key,
    slug: key,
    name: dict["name"]?.toString(),
    profileImageUrl: dict["profileImageUrl"]?.toString(),
    timestamp: dict["timestamp"] ? dict["timestamp"] : null,
    email: dict["email"]?.toString(),
    status: dict["status"] ? dict["status"] : null, //1 active, 2 delete
  };
}
